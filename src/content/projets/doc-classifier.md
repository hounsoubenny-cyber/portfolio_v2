---
title: "DocClassifier AI Portal"
description: "Portail fullstack de classification de documents : extraction de texte (PDF et images), classifieur ML en stacking, authentification JWT, chiffrement Fernet et limitation de débit."
date_debut: "2025-11-01"
date_fin: "2025-11-30"
status: "terminé"
tags: ["Fullstack", "OCR", "Cryptographie"]
image_cover: "/images/projets/doc-classifier.png"
lien_github: "https://github.com/hounsoubenny-cyber/doc-classifier"
lien_demo: "https://huggingface.co/spaces/hounsoubenny/doc-classifier"
featured: false
stack: ["FastAPI", "React", "EasyOCR", "XGBoost", "scikit-learn", "Cryptography", "JWT"]
---

## fr

DocClassifier reçoit un document (PDF, image ou texte) et prédit sa catégorie avec un score de confiance, derrière une API pensée pour la sécurité et la confidentialité des fichiers.

### Points Clés
* **Extraction et classification** : le texte est extrait des PDF (pdfplumber) et des images (EasyOCR), puis classé par un modèle entraîné : un stacking TF-IDF + XGBoost + Random Forest + HistGradientBoosting.
* **Chiffrement symétrique Fernet** : les documents sont chiffrés avec des clés symétriques.
* **API sécurisée** : authentification JWT, mots de passe hachés avec bcrypt, limitation du débit (rate limiting), CORS restreint, traitement asynchrone des fichiers.
* **Interface React** : dépôt par glisser-déposer, résultats en direct et thème clair/sombre. L'interface est buildée puis servie avec l'API.
* **Modèles d'images** : deux CNN distincts entraînés séparément (détection du paludisme, chats/chiens).

---

## en

DocClassifier takes a document (PDF, image or text) and predicts its category with a confidence score, behind an API designed for file security and privacy.

### Key Points
* **Extraction and classification** : text is extracted from PDFs (pdfplumber) and images (EasyOCR), then classified by a trained model: a TF-IDF + XGBoost + Random Forest + HistGradientBoosting stacking.
* **Fernet symmetric encryption** : documents are encrypted with symmetric keys.
* **Secure API** : JWT authentication, bcrypt-hashed passwords, rate limiting, restricted CORS, asynchronous file processing.
* **React interface** : drag-and-drop upload, live results and light/dark theme. The interface is built, then served with the API.
* **Image models** : two separate, independently trained CNNs (malaria detection, cats vs dogs).
