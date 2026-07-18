---
title: "DocClassifier AI Portal"
description: "Portail d'intelligence documentaire fullstack combinant pipelines OCR, catégorisation automatique, authentification JWT et chiffrement Fernet."
date_debut: "2025-11-01"
date_fin: "2025-11-30"
status: "terminé"
tags: ["Fullstack", "OCR", "Cryptographie"]
image_cover: "/images/projets/doc-classifier.png"
lien_github: "https://github.com/hounsoubenny-cyber/doc-classifier"
lien_demo: "https://huggingface.co/spaces/hounsoubenny/doc-classifier"
featured: false
stack: ["FastAPI", "React", "Tesseract OCR", "Docker", "SQLModel", "Cryptography"]
---

## fr

DocClassifier automatise le traitement, l'analyse et le tri des documents administratifs (factures, reçus, pièces d'identité) avec un focus absolu sur la sécurité et la confidentialité des fichiers.

### Innovations Clés
* **Pipeline OCR & Classification** : Extraction de texte brut avec Tesseract OCR local couplé à des classifieurs NLP pour attribuer automatiquement des étiquettes thématiques.
* **Chiffrement Symétrique Fernet** : Tous les documents utilisateur stockés sont chiffrés à la volée avec des clés symétriques gérées de façon isolée (les clés ne touchent jamais la base de données).
* **Robustesse d'Infrastructure** : APIs asynchrones FastAPI avec file d'attente Celery, limitation stricte du débit (rate limiting) et isolation Docker.

---

## en

DocClassifier automates the processing, parsing, and categorization of administrative documents (invoices, receipts, government IDs) with an absolute focus on data privacy.

### Core Architecture
* **OCR & Classification Pipeline** : Raw text extraction using local Tesseract OCR, feeding into NLP classifiers that route documents automatically.
* **Fernet Symmetric Cryptography** : Encrypts documents at rest; encryption keys are isolated dynamically so that database compromise cannot reveal documents.
* **Hardened Infrastructure** : FastAPI backends with asynchronous task queues, strict rate-limiting, secure JWT authentication, and isolated Docker runtimes.
