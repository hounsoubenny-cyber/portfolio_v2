---
title: "Path traversal : comment un simple os.path.join peut lire /etc/passwd sur votre serveur"
date: "2026-10-16"
tags: ["Cybersécurité", "Python", "FastAPI", "Application Security"]
image_cover: "/images/blog/path-traversal-os-path-join.png"
resume: "Une route qui sert le frontend, une ligne os.path.join, et n'importe qui peut lire le code source ou /etc/passwd. La faille que j'ai reproduite sur mon propre projet, pourquoi elle est si courante, et la correction en cinq lignes."
temps_lecture: 9
---

## fr

> *Cet article est né d'une revue de sécurité de Workbench menée avec Claude, un assistant IA d'Anthropic. Les expériences et les tests cités ont été exécutés pendant cette revue.*

### Le contexte

Mediakit sert son interface (un frontend React compilé) depuis la même application FastAPI que son API. Pour que la navigation côté client fonctionne, il faut une route « fourre-tout » : si le chemin demandé correspond à un fichier du dossier `dist/`, on le renvoie ; sinon on renvoie `index.html`.

C'est un motif très répandu, et voici à peu près ce que j'avais écrit :

```python
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    candidate = os.path.join(DIST_DIR, full_path)
    if full_path and os.path.isfile(candidate):
        return FileResponse(candidate)
    return FileResponse(os.path.join(DIST_DIR, "index.html"))
```

Rien d'exotique, et ça marche. Seulement voilà : `full_path` vient du client.

### L'attaque


Je démarre le vrai serveur et j'envoie une requête avec des `..` dans le chemin. L'option `--path-as-is` de `curl` empêche l'outil de nettoyer l'URL :

```
$ curl -s --path-as-is "http://127.0.0.1:8766/../../api/env.py" | head -4
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Sep  4 14:51:30 2026

$ curl -s --path-as-is "http://127.0.0.1:8766/../../../../../../../../../etc/passwd" | head -1
root:x:0:0:root:/root:/bin/bash
```

Le serveur renvoie son propre code source, puis un fichier système. Le même principe permet de lire des clés SSH, des fichiers `.env`, des bases de données : tout ce que le compte qui lance l'application a le droit de lire.

**Pourquoi un navigateur ne peut pas le faire directement ?** Parce qu'il normalise l'URL avant de l'envoyer : `/../..` est réécrit en `/`. Mais ce n'est pas une protection, seulement un obstacle pour le visiteur ordinaire. `curl`, un script ou n'importe quel client HTTP envoie ce qu'on lui dit. Et comme ce serveur écoutait en plus sur `0.0.0.0` (voir [l'article sur les adresses d'écoute](/blog/0-0-0-0-vs-127-0-0-1)), il suffisait d'être sur le même réseau.

### Pourquoi os.path.join est un piège

`os.path.join` assemble des chemins. Il ne vérifie rien. Deux comportements à connaître, que j'ai testés :

```python
>>> os.path.join("/srv/app/dist", "../../etc/passwd")
'/srv/app/dist/../../etc/passwd'      # le .. n'est pas résolu : le système le fera à l'ouverture

>>> os.path.join("/srv/app/dist", "/etc/passwd")
'/etc/passwd'                        # un chemin absolu REMPLACE la racine !
```

Le deuxième cas est le plus vicieux. Il n'a même pas besoin de `..` : si le client envoie un chemin qui commence par `/`, la « racine » de confiance disparaît. `pathlib` se comporte pareil : `Path("/srv/app/dist") / "/etc/passwd"` donne `/etc/passwd`.

### Les variantes à connaître

* **`..`** : remonter dans l'arborescence.
* **Chemin absolu** : remplacer la racine, comme ci-dessus.
* **Lien symbolique** : un fichier *dans* le dossier autorisé qui pointe *vers l'extérieur*. Le nom de chemin est propre, la cible ne l'est pas.
* **Octet nul (`\x00`)** : en C, il termine la chaîne. Un code de haut niveau qui valide `"../../etc/passwd\x00.png"` (il se termine bien par `.png`) peut passer au système un chemin que celui-ci lit comme `../../etc/passwd`. Python moderne refuse (`ValueError: embedded null byte`), mais ne comptez pas sur ce que fait chaque couche : rejetez-le dès l'entrée.
* **Encodages** (`%2e%2e`, `..%2f`) : selon le serveur et le framework, ils peuvent être décodés avant ou après votre contrôle.

### La correction : normaliser d'abord, vérifier ensuite

Le principe : calculer le chemin **final réel**, puis vérifier qu'il se trouve bien sous la racine autorisée.

```python
from pathlib import Path

def resolve_static_file(root, relative):
    if not relative or "\x00" in relative:
        return None
    root = Path(root).resolve()
    candidate = (root / relative).resolve()      # applique les .. et suit les liens symboliques
    if not candidate.is_relative_to(root):       # Python 3.9+
        return None
    return candidate if candidate.is_file() else None
```

Trois détails comptent :

* **`resolve()` avant la vérification**, jamais après. Il applique les `..` et suit les liens symboliques : on compare la destination réelle.
* **`is_relative_to`, pas `startswith`.** Avec une racine `/srv/app/dist`, le chemin `/srv/app/dist-evil/secret.txt` commence bien par cette chaîne :

```python
>>> "/srv/app/dist-evil/secret.txt".startswith("/srv/app/dist")
True                                  # passe le test... alors que c'est un autre dossier !
>>> Path("/srv/app/dist-evil/secret.txt").is_relative_to(Path("/srv/app/dist"))
False
```

* **Un seul endroit** pour cette logique. Je l'ai placée dans un utilitaire du framework, avec ses tests, pour que chaque produit l'utilise au lieu de la réécrire.

Après correction, les mêmes requêtes renvoient simplement `index.html` (le comportement de repli), tandis que les vrais fichiers statiques sont toujours servis.

### Les tests qui verrouillent la correction

Une correction sans test finit par disparaître au prochain refactoring. J'ai écrit un test paramétré avec les attaques connues :

```python
@pytest.mark.parametrize("bad", [
    "../secret.txt", "assets/../../secret.txt", "../../../../../../etc/passwd",
    "/etc/passwd", "index.html\x00.png", "", "assets", "absent.html",
])
def test_refuses_escapes_and_non_files(tree, bad):
    assert resolve_static_file(tree, bad) is None
```

Plus un cas pour le lien symbolique sortant. Un test ne prouve pas l'absence de faille, mais il garantit que **celle-ci** ne reviendra pas.

### Et en Node.js ?

Le même principe, avec `path.resolve` :

```js
const full = path.resolve(root, userPath);
if (!full.startsWith(root + path.sep)) throw new Error("forbidden");
```

Ici `startsWith` est correct parce qu'on ajoute le séparateur `path.sep` à la racine, ce qui règle le problème de `dist-evil`. Mieux encore : évitez d'écrire ça vous-même.

### Ne pas réécrire ce qui existe

Pour servir des fichiers statiques, utilisez les briques qui font déjà ce contrôle : `StaticFiles` (Starlette/FastAPI), `express.static` ou `res.sendFile` avec l'option `root`, `send_from_directory` (Flask). Elles ont été relues et attaquées par des milliers de gens.

Ma route fourre-tout est le cas typique où on contourne le composant sûr « juste pour ajouter un repli vers `index.html` ». Dans ce cas, gardez le composant sûr pour les fichiers, et ne faites à la main que le repli.

### Retrouver le motif dans vos projets

```bash
grep -rnE "os\.path\.join|FileResponse|send_file|send_from_directory|open\(" .
```

Pour chaque résultat, une seule question : **une partie de ce chemin vient-elle du client ?** (URL, paramètre, nom de fichier téléversé, champ JSON.) Si oui, validez-la.

### Ce qu'il faut retenir

* Un chemin qui vient du client n'est **jamais** de confiance.
* `os.path.join` n'est pas un contrôle d'accès.
* **Normalisez, puis comparez** la destination réelle à la racine autorisée, avec `is_relative_to`.
* Écrivez le test d'attaque en même temps que la correction.

Cette faille tient en une ligne, et elle se corrige en cinq. Ce qui prend du temps, c'est de penser à la chercher.

---

## en

> *This article grew out of a security review of Workbench carried out with Claude, an AI assistant from Anthropic. The experiments and tests quoted here were run during that review.*

### Context

Mediakit serves its interface (a compiled React frontend) from the same FastAPI application as its API. For client-side navigation to work, you need a "catch-all" route: if the requested path matches a file in the `dist/` folder, return it; otherwise return `index.html`.

It is a very common pattern, and here is roughly what I had written:

```python
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    candidate = os.path.join(DIST_DIR, full_path)
    if full_path and os.path.isfile(candidate):
        return FileResponse(candidate)
    return FileResponse(os.path.join(DIST_DIR, "index.html"))
```

Nothing exotic, and it works. But `full_path` comes from the client.

### The attack


I start the real server and send a request with `..` in the path. `curl`'s `--path-as-is` option stops the tool from cleaning up the URL:

```
$ curl -s --path-as-is "http://127.0.0.1:8766/../../api/env.py" | head -4
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Sep  4 14:51:30 2026

$ curl -s --path-as-is "http://127.0.0.1:8766/../../../../../../../../../etc/passwd" | head -1
root:x:0:0:root:/root:/bin/bash
```

The server returns its own source code, then a system file. The same principle can read SSH keys, `.env` files, databases: anything the account running the application is allowed to read.

**Why can't a browser do this directly?** Because it normalizes the URL before sending it: `/../..` is rewritten to `/`. But that is not a defence, just an obstacle for the ordinary visitor. `curl`, a script or any HTTP client sends exactly what it is told. And since this server also listened on `0.0.0.0` (see [the article on listening addresses](/blog/0-0-0-0-vs-127-0-0-1)), being on the same network was enough.

### Why os.path.join is a trap

`os.path.join` assembles paths. It checks nothing. Two behaviours to know, both tested:

```python
>>> os.path.join("/srv/app/dist", "../../etc/passwd")
'/srv/app/dist/../../etc/passwd'      # the .. is not resolved: the OS will do it on open

>>> os.path.join("/srv/app/dist", "/etc/passwd")
'/etc/passwd'                        # an absolute path REPLACES the root!
```

The second case is the nastiest. It does not even need `..`: if the client sends a path starting with `/`, the trusted "root" vanishes. `pathlib` behaves the same way: `Path("/srv/app/dist") / "/etc/passwd"` gives `/etc/passwd`.

### Variants to know

* **`..`**: climbing up the directory tree.
* **Absolute path**: replacing the root, as above.
* **Symbolic link**: a file *inside* the allowed folder that points *outside*. The path name is clean, the target is not.
* **Null byte (`\x00`)**: in C it ends the string. High-level code that validates `"../../etc/passwd\x00.png"` (it does end in `.png`) may hand the OS a path that the OS reads as `../../etc/passwd`. Modern Python refuses (`ValueError: embedded null byte`), but do not count on what every layer does: reject it at the entrance.
* **Encodings** (`%2e%2e`, `..%2f`): depending on the server and framework, they may be decoded before or after your check.

### The fix: normalize first, check second

The principle: compute the **real final path**, then verify it sits under the allowed root.

```python
from pathlib import Path

def resolve_static_file(root, relative):
    if not relative or "\x00" in relative:
        return None
    root = Path(root).resolve()
    candidate = (root / relative).resolve()      # applies .. and follows symlinks
    if not candidate.is_relative_to(root):       # Python 3.9+
        return None
    return candidate if candidate.is_file() else None
```

Three details matter:

* **`resolve()` before the check**, never after. It applies the `..` and follows symlinks: you compare the real destination.
* **`is_relative_to`, not `startswith`.** With a root of `/srv/app/dist`, the path `/srv/app/dist-evil/secret.txt` does start with that string:

```python
>>> "/srv/app/dist-evil/secret.txt".startswith("/srv/app/dist")
True                                  # passes the test... yet it is another folder!
>>> Path("/srv/app/dist-evil/secret.txt").is_relative_to(Path("/srv/app/dist"))
False
```

* **One single place** for this logic. I put it in a framework utility, with its tests, so every product uses it instead of rewriting it.

After the fix, the same requests simply return `index.html` (the fallback behaviour), while real static files are still served.

### The tests that lock the fix in

A fix without a test disappears at the next refactoring. I wrote a parameterized test with the known attacks:

```python
@pytest.mark.parametrize("bad", [
    "../secret.txt", "assets/../../secret.txt", "../../../../../../etc/passwd",
    "/etc/passwd", "index.html\x00.png", "", "assets", "absent.html",
])
def test_refuses_escapes_and_non_files(tree, bad):
    assert resolve_static_file(tree, bad) is None
```

Plus a case for a symlink pointing outside. A test does not prove the absence of flaws, but it guarantees that **this one** will not come back.

### And in Node.js?

Same principle, with `path.resolve`:

```js
const full = path.resolve(root, userPath);
if (!full.startsWith(root + path.sep)) throw new Error("forbidden");
```

Here `startsWith` is correct because the `path.sep` separator is appended to the root, which solves the `dist-evil` problem. Better still: avoid writing this yourself.

### Don't rewrite what already exists

To serve static files, use the components that already do this check: `StaticFiles` (Starlette/FastAPI), `express.static` or `res.sendFile` with the `root` option, `send_from_directory` (Flask). They have been read and attacked by thousands of people.

My catch-all route is the typical case where the safe component gets bypassed "just to add a fallback to `index.html`". In that case, keep the safe component for the files, and hand-write only the fallback.

### Finding the pattern in your projects

```bash
grep -rnE "os\.path\.join|FileResponse|send_file|send_from_directory|open\(" .
```

For each result, ask one question: **does any part of this path come from the client?** (URL, parameter, uploaded filename, JSON field.) If so, validate it.

### What to remember

* A path coming from the client is **never** trusted.
* `os.path.join` is not an access control.
* **Normalize, then compare** the real destination to the allowed root, with `is_relative_to`.
* Write the attack test at the same time as the fix.

This flaw fits in one line, and it is fixed in five. What takes time is remembering to look for it.
