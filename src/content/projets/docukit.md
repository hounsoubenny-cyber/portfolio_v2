---
title: "Docukit"
description: "Une boîte à outils PDF et documents (fusion, OCR, mot de passe, conversion Word) construite sur Workbench : sans terminal, et sans envoyer un seul document sur Internet."
date_debut: "2026-10-14"
date_fin: "2026-10-16"
status: "terminé"
tags: ["Python", "Workbench", "PDF", "OCR", "Cybersécurité", "Developer Tools"]
image_cover: "/images/projets/docukit/docukit-ocr.png"
lien_github: "https://github.com/hounsoubenny-cyber/workbench"
lien_demo: null
featured: false
stack: ["Python", "FastAPI", "Pydantic", "qpdf", "Poppler", "Tesseract", "pandoc", "JavaScript", "WebSocket"]
---

## fr

# Docukit

**Docukit** est le **deuxième produit construit sur [Workbench](/projets/workbench-mediakit)**. Il rend `qpdf`, `poppler`, `tesseract` et `pandoc` utilisables sans terminal : fusionner des PDF, extraire ou supprimer des pages, protéger un document par mot de passe, lire le texte d'un scan, convertir du Markdown en Word…

Tout se passe **sur l'ordinateur de l'utilisateur**. Aucun document n'est envoyé sur Internet : c'est un argument décisif pour des factures, des contrats ou des pièces d'identité.

### En situation

![Docukit : workflow OCR sur une facture scannée](/images/projets/docukit/docukit-ocr.png)

Ci-dessus, une page de facture scannée passe par le workflow **OCR** (rendu de la page en image haute définition, puis reconnaissance de caractères). Le texte récupéré, accents et montants compris, apparaît directement dans l'interface.

![Docukit : écran d'accueil](/images/projets/docukit/docukit-accueil.png)

![Docukit : fusion de deux PDF](/images/projets/docukit/docukit-fusion.png)

### Fonctionnalités

**21 outils** organisés par tâche plutôt que par programme :

| Catégorie | Outils |
| :--- | :--- |
| Organiser | Fusionner · Extraire des pages · Supprimer des pages · Inverser l'ordre |
| Éditer | Pivoter des pages · Tampon ou filigrane |
| Sécuriser | Protéger par mot de passe (AES-256) · Retirer le mot de passe |
| Lire et extraire | Texte du PDF · Page en image · Informations · Liste des images |
| OCR | Image en texte · Image en PDF recherchable |
| Convertir | Markdown, HTML, Word, OpenDocument, EPUB, reStructuredText, LaTeX |
| Réparer et optimiser | Vérifier · Réparer · Optimiser sans perte |
| Workflows | Fusionner puis optimiser · Lire une page scannée · Extrait protégé par mot de passe |

### Architecture technique

Chaque outil est une **action déclarative** : un modèle Pydantic décrit les entrées, une fonction construit les arguments typés de la commande.

```python
extract_pages_spec = QpdfSpec[ExtractPagesInput](
    id="qpdf_extract_pages",
    label="Extraire des pages",
    input_cls=ExtractPagesInput,
    output_filename_template=Out.EXTRACTED,
    build_args=lambda u: [*pages_group(u.input_file, u.pages), PathArg(value=Out.EXTRACTED)],
)
```

Le **formulaire de l'interface est généré automatiquement** à partir de ce modèle : ajouter une action côté Python crée l'écran correspondant, sans écrire une ligne de JavaScript. L'interface elle-même est en JavaScript pur, sans build ni dépendance.

### Sécurité

Docukit ouvre des documents qui ne sont pas fiables. Chaque entrée est donc traitée comme hostile :

* **Aucun shell**, des arguments typés, et une validation stricte (pages, mots de passe) avant tout lancement.
* Le **type réel** d'un fichier est contrôlé par sa signature, pas par son extension.
* **pandoc tourne toujours en `--sandbox`** : sans lui, un `![x](/etc/passwd)` dans un document pourrait faire embarquer un fichier local ou déclencher une requête réseau.
* Un serveur local protégé contre les requêtes venues d'**autres sites web** (contrôle des en-têtes `Host` et `Origin`).
* Une politique de sécurité de contenu stricte, aucun script ni style inline dans l'interface, et un plafond de taille pour les envois.

### Tests

**199 tests Python** (dont une grande partie lancent les vrais binaires et vérifient le fichier produit avec un outil indépendant) et **31 vérifications d'interface** exécutées contre le vrai serveur.

### Comment il a été construit

Docukit a été développé **avec Claude (l'assistant IA d'Anthropic), de façon autonome**, à partir du code de Workbench. C'était un test volontaire : *un tiers peut-il construire un produit complet sur le framework, sans en connaître les secrets ?* Oui. En chemin, cette revue a aussi fait remonter **huit bugs du socle** (dont une traversée de chemin et une écoute sur `0.0.0.0` dans Mediakit), corrigés avec des tests de non-régression. J'en ai tiré deux articles : [0.0.0.0 contre 127.0.0.1](/blog/0-0-0-0-vs-127-0-0-1) et [le path traversal](/blog/path-traversal-os-path-join).

### Repository

[Voir le code source sur GitHub](https://github.com/hounsoubenny-cyber/workbench)

---

## en

# Docukit

**Docukit** is the **second product built on [Workbench](/projets/workbench-mediakit)**. It makes `qpdf`, `poppler`, `tesseract` and `pandoc` usable without a terminal: merge PDFs, extract or delete pages, password-protect a document, read the text of a scan, convert Markdown to Word…

Everything runs **on the user's own computer**. No document is ever sent over the Internet, which matters for invoices, contracts or ID documents.

### In action

![Docukit: OCR workflow on a scanned invoice](/images/projets/docukit/docukit-ocr.png)

Above, a scanned invoice page goes through the **OCR** workflow (the page is rendered as a high-resolution image, then run through character recognition). The recovered text, accents and amounts included, shows up right in the interface.

![Docukit: home screen](/images/projets/docukit/docukit-accueil.png)

![Docukit: merging two PDFs](/images/projets/docukit/docukit-fusion.png)

### Key Features

**21 tools** organised by task rather than by program:

| Category | Tools |
| :--- | :--- |
| Organize | Merge · Extract pages · Delete pages · Reverse order |
| Edit | Rotate pages · Stamp or watermark |
| Secure | Password-protect (AES-256) · Remove the password |
| Read and extract | PDF text · Page to image · Document info · List images |
| OCR | Image to text · Image to searchable PDF |
| Convert | Markdown, HTML, Word, OpenDocument, EPUB, reStructuredText, LaTeX |
| Repair and optimize | Check · Repair · Lossless optimization |
| Workflows | Merge then optimize · Read a scanned page · Password-protected excerpt |

### Technical Architecture

Each tool is a **declarative action**: a Pydantic model describes the inputs, and a function builds the command's typed arguments.

```python
extract_pages_spec = QpdfSpec[ExtractPagesInput](
    id="qpdf_extract_pages",
    label="Extract pages",
    input_cls=ExtractPagesInput,
    output_filename_template=Out.EXTRACTED,
    build_args=lambda u: [*pages_group(u.input_file, u.pages), PathArg(value=Out.EXTRACTED)],
)
```

The **interface form is generated automatically** from that model: adding an action in Python creates the matching screen without writing a line of JavaScript. The UI itself is plain JavaScript, with no build step and no dependency.

### Security

Docukit opens untrusted documents, so every input is treated as hostile:

* **No shell**, typed arguments, and strict validation (pages, passwords) before anything runs.
* A file's **real type** is checked from its signature, not its extension.
* **pandoc always runs with `--sandbox`**: without it, a `![x](/etc/passwd)` inside a document could pull in a local file or trigger a network request.
* A local server protected against requests coming from **other websites** (`Host` and `Origin` header checks).
* A strict content security policy, no inline script or style in the UI, and an upload size cap.

### Tests

**199 Python tests** (many of them run the real binaries and check the produced file with an independent tool) and **31 UI checks** run against the real server.

### How it was built

Docukit was developed **with Claude (Anthropic's AI assistant), autonomously**, starting from the Workbench code. It was a deliberate experiment: *can a third party build a complete product on the framework without knowing its secrets?* Yes. Along the way, that review also surfaced **eight bugs in the core** (including a path traversal and a `0.0.0.0` listener in Mediakit), fixed with regression tests. It led to two articles: [0.0.0.0 vs 127.0.0.1](/blog/0-0-0-0-vs-127-0-0-1) and [path traversal](/blog/path-traversal-os-path-join).

### Repository

[View the source code on GitHub](https://github.com/hounsoubenny-cyber/workbench)
