---
title: "NEXUS — Offline RAG Assistant"
description: "Assistant RAG 100% offline avec trois modes de recherche : sémantique, mots-clés et hybride. Latence < 500ms."
date_debut: "2026-03-01"
date_fin: "2026-03-25"
status: "terminé"
tags: ["IA", "RAG", "Offline", "Docker"]
image_cover: "/images/projets/nexus.png"
lien_github: "https://github.com/hounsoubenny-cyber/nexus-four"
lien_demo: null
featured: true
stack: ["FastAPI", "React", "FAISS", "Sentence-BERT", "Docker", "SQLModel"]
---

## fr

NEXUS a été développé pour répondre aux enjeux de souveraineté des données confidentielles. Il crée un index vectoriel robuste sur des documentations complexes locales sans aucune connexion internet requise.

### Fonctionnalités Clés
* **Indexation Hybride** : Recherche sémantique dense (FAISS) combinée à la recherche lexicale creuse (BM25) via Reciprocal Rank Fusion (RRF).
* **Modèles d'Embeddings Locaux** : Modèle Sentence-BERT léger exécuté en local sous ONNX pour une latence minimale.
* **Inférence Sécurisée** : Intégration directe avec un LLM local quantifié au format GGUF via llama.cpp.
* **Déploiement Isolé** : Conteneurisation complète avec Docker pour un fonctionnement hermétique sans fuite de données.

---

## en

NEXUS is a fully offline Retrieval-Augmented Generation (RAG) assistant designed to solve private data sovereignty concerns. It builds a robust vector index over complex local document sets without requiring any internet connection.

### Key Capabilities
* **Hybrid Search** : Dense semantic retrieval (FAISS) combined with sparse keyword scoring (BM25) using Reciprocal Rank Fusion (RRF).
* **Local Embeddings** : High-efficiency Sentence-BERT embedding models running locally in Python with ONNX.
* **Secure Local LLM** : Feeds relevant local context straight to quantized local LLMs using llama.cpp.
* **Hermetic Orchestration** : Packaged completely in Docker for simple, zero-config, isolated deployments.
