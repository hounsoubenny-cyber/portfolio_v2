---
title: "NEXUS-FOUR — Assistant IA hors ligne pour étudiants IFRI"
description: "Plateforme tout-en-un 100 % hors ligne pour les étudiants de l'IFRI, créée en équipe pour le hackathon HackByIFRI 2026 : un assistant IA qui répond à partir des cours (RAG), un espace bien-être, un portfolio, une messagerie et une marketplace."
date_debut: "2026-02-23"
date_fin: "2026-02-25"
status: "terminé"
tags: ["IA", "RAG", "Offline", "Hackathon", "Docker"]
image_cover: "/images/projets/nexus.png"
lien_github: "https://github.com/hounsoubenny-cyber/nexus-four"
lien_demo: null
featured: true
stack: ["FastAPI", "React", "FAISS", "Sentence-Transformers", "llama.cpp", "Docker", "WebSocket"]
---

## fr

NEXUS-FOUR est un **projet d'équipe** (Team FOUR, 4 membres) réalisé pour le hackathon **HackByIFRI 2026**. Il part d'un constat simple : les étudiants de l'IFRI manquent d'une aide disponible à toute heure, souvent sans connexion internet. Tout fonctionne donc **hors ligne**, sur l'ordinateur de l'étudiant.

### Cinq modules
* **Brain** : un assistant qui répond à partir des cours (PDF indexés) et cite le PDF et la page d'où vient la réponse.
* **Care** : un espace bien-être avec un chatbot empathique et un suivi d'humeur, dont les données restent en local.
* **Hub Skills** : un portfolio professionnel partageable par un lien unique.
* **Messages** : une messagerie en temps réel (WebSocket) entre étudiants.
* **Marketplace** : achat et vente de matériel informatique entre étudiants.

### Comment fonctionne Brain (le RAG)
RAG signifie *Retrieval-Augmented Generation* : au lieu de laisser le modèle répondre de mémoire, on lui fournit d'abord les bons passages. Brain cherche les passages pertinents dans les cours (recherche vectorielle avec FAISS et des embeddings Sentence-Transformers), puis les donne à un modèle de langage local qui rédige la réponse en citant ses sources. Les modèles (Gemma, Qwen 2.5, Phi-3.5, au format GGUF) tournent sur CPU grâce à llama.cpp.

### Architecture
React 18 pour l'interface, FastAPI pour le backend, authentification JWT + bcrypt, et un déploiement Docker multi-stage avec volumes persistants.

---

## en

NEXUS-FOUR is a **team project** (Team FOUR, 4 members) built for the **HackByIFRI 2026** hackathon. It starts from a simple observation: IFRI students lack help available at any hour, often without an internet connection. So everything runs **offline**, on the student's own computer.

### Five modules
* **Brain** : an assistant that answers from the course material (indexed PDFs) and cites the PDF and page behind each answer.
* **Care** : a well-being space with an empathetic chatbot and a mood tracker, with data kept local.
* **Hub Skills** : a professional portfolio shareable through a unique link.
* **Messages** : real-time messaging (WebSocket) between students.
* **Marketplace** : buying and selling computer equipment between students.

### How Brain works (RAG)
RAG stands for *Retrieval-Augmented Generation*: instead of letting the model answer from memory, it is first given the right passages. Brain looks up relevant passages in the courses (vector search with FAISS and Sentence-Transformers embeddings), then hands them to a local language model that writes the answer and cites its sources. The models (Gemma, Qwen 2.5, Phi-3.5, in GGUF format) run on CPU thanks to llama.cpp.

### Architecture
React 18 for the interface, FastAPI for the backend, JWT + bcrypt authentication, and a multi-stage Docker deployment with persistent volumes.
