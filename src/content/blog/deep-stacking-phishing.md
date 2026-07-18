---
title: "Comment j'ai atteint 99,3% de précision pour détecter le phishing"
date: "2026-04-20"
tags: ["Machine Learning", "Cybersécurité", "Optuna"]
image_cover: "/images/blog/deep-stacking-phishing.png"
resume: "Un lien un peu louche dans un email : à quoi ça ressemble pour une machine ? Voici comment j'ai entraîné un classifieur capable de repérer 99,3% des URLs de phishing."
temps_lecture: 5
---

## fr

### Pourquoi un simple "mot interdit" ne suffit pas

Un lien de phishing bien conçu ne contient presque jamais de mot suspect évident. Les attaquants masquent l'URL, imitent des caractères d'un vrai nom de domaine, ou redirigent vers un vrai site le temps de l'analyse automatique. Une simple liste de mots-clés interdits ("banque", "connexion"...) est contournée en quelques minutes.

Pour vraiment détecter ces liens, j'ai entraîné un modèle sur 247 000 URLs réelles (légitimes et malveillantes), et voici comment il fonctionne, étape par étape.

### 1. Apprendre à "lire" une URL comme un enquêteur

Avant même de parler de modèle, il faut décider ce qu'on va lui montrer. Pour chaque URL, j'extrais 34 indices, répartis en trois familles :
* **La forme du texte** : la longueur du lien, le nombre de sous-domaines, si l'adresse ressemble à une suite de caractères aléatoires plutôt qu'à un vrai nom.
* **Des signaux d'alerte connus** : présence de mots comme "connexion" ou "sécurisé", caractères bizarres (@, -, _), dossiers imbriqués à l'excès.
* **Le passé du domaine** : depuis quand il existe, s'il a un certificat de sécurité valide, sa popularité sur le web.

Un exemple concret : un domaine créé il y a 3 jours, avec un certificat auto-signé et le mot "secure-login" planté dans l'URL — pris séparément, chaque signal est faible ; combinés, ils deviennent un signal fort.

### 2. Pourquoi utiliser plusieurs modèles plutôt qu'un seul

Un seul algorithme a toujours des angles morts. J'ai donc combiné trois modèles complémentaires, un peu comme trois enquêteurs avec des méthodes différentes qui comparent leurs conclusions :
1. **XGBoost** — rapide à repérer des combinaisons de signaux inhabituelles.
2. **Random Forest** — plus prudent, moins sensible au bruit dans les données.
3. **HistGradientBoosting** — tolère bien les informations manquantes (ex : un domaine sans historique WHOIS).

Un quatrième modèle, plus simple, prend ensuite les trois avis et rend le verdict final. Cette approche s'appelle du "stacking" : empiler des modèles pour que leurs forces se complètent.

### 3. Régler la précision sans y passer des semaines

Chaque modèle a des dizaines de réglages possibles (profondeur des arbres, vitesse d'apprentissage...). Les tester à la main serait interminable. J'ai utilisé **Optuna**, un outil qui teste intelligemment une centaine de combinaisons — en apprenant des essais précédents plutôt qu'en testant au hasard — pour converger vers les meilleurs réglages.

Résultat : **99,3% de précision**, avec un vrai focus sur les faux positifs (ne jamais bloquer un site légitime par erreur, ce qui casse la confiance des utilisateurs plus vite que n'importe quoi).

---

## en

### Why a simple blocklist isn't enough

A well-crafted phishing link almost never contains an obviously suspicious word. Attackers obfuscate the URL, mimic characters from a real domain name, or redirect to a legitimate site while automated scanners are looking. A simple list of banned keywords ("bank", "login"...) gets bypassed in minutes.

To actually catch these links, I trained a model on 247,000 real URLs (both legitimate and malicious). Here's how it works, step by step.

### 1. Learning to "read" a URL like an investigator

Before even talking about the model, you have to decide what to show it. For each URL, I extract 34 signals across three families:
* **Text shape**: link length, number of subdomains, whether the address looks more like a random string than a real name.
* **Known warning signs**: words like "login" or "secure", odd characters (@, -, _), excessively nested folders.
* **Domain history**: how long it's existed, whether it has a valid security certificate, its popularity across the web.

A concrete example: a domain registered 3 days ago, with a self-signed certificate and the word "secure-login" stuffed into the URL — each signal alone is weak, but combined they become a strong one.

### 2. Why use several models instead of one

A single algorithm always has blind spots. So I combined three complementary models — a bit like three investigators with different methods comparing notes:
1. **XGBoost** — quick to spot unusual combinations of signals.
2. **Random Forest** — more cautious, less sensitive to noise in the data.
3. **HistGradientBoosting** — handles missing information well (e.g. a domain with no WHOIS history).

A fourth, simpler model then takes all three opinions and produces the final verdict. This approach is called "stacking": layering models so their strengths cover each other's weaknesses.

### 3. Tuning accuracy without spending weeks on it

Each model has dozens of possible settings (tree depth, learning rate...). Testing them by hand would take forever. I used **Optuna**, a tool that intelligently tries about a hundred combinations — learning from previous attempts instead of guessing randomly — to converge on the best settings.

Result: **99.3% accuracy**, with a real focus on false positives (never blocking a legitimate site by mistake, which breaks user trust faster than anything else).
