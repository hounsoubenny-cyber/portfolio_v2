---
title: "Kwiko — Assistant WhatsApp Intelligent pour PME"
description: "Un assistant IA qui répond automatiquement aux clients d'une PME sur WhatsApp, en s'appuyant uniquement sur sa propre base de connaissance. RAG + LLM + intégration WhatsApp Cloud API réelle."
date_debut: "2026-07-19"
date_fin: "2026-07-23"
status: "terminé"
tags: ["IA", "RAG", "WhatsApp Business", "FastAPI"]
image_cover: "/images/projets/kwiko/kwiko_cover.png"
lien_github: "https://github.com/hounsoubenny-cyber/kwiko"
lien_demo: null
featured: true
stack: ["FastAPI", "React", "FAISS", "Groq", "SQLModel", "WhatsApp Cloud API"]
---

## fr

Kwiko est né d'un constat simple : beaucoup de PME, notamment en Afrique francophone, vivent entièrement sur WhatsApp au quotidien — mais répondre à "vous êtes ouverts jusqu'à quelle heure ?" ou "vous livrez à Cotonou ?" cinquante fois par jour n'a rien de valorisant pour personne. Kwiko permet à une entreprise de renseigner sa propre base de connaissance (horaires, tarifs, zones de livraison...) et de laisser une IA répondre à sa place, sans jamais inventer une information qui n'y figure pas.

Construit en un sprint de 4 jours, de bout en bout : backend, frontend, intégration WhatsApp réelle, et tests de bout en bout avec un vrai message reçu sur un vrai téléphone.

![Connexion et inscription en deux étapes](/images/projets/kwiko/kwiko_start.png)

![Tableau de bord Kwiko](/images/projets/kwiko/kwiko_dashboard.png)

### Fonctionnalités Clés

* **Recherche sémantique (RAG)** : chaque FAQ fournie par l'entreprise est vectorisée et indexée dans un index FAISS dédié (Sentence-Transformers). À chaque question, Kwiko retrouve le contexte le plus pertinent avant de générer une réponse.

![Gestion de la base de FAQ](/images/projets/kwiko/kwiko_faq.png)

* **Génération via Groq** : réponse naturelle construite strictement à partir du contexte retrouvé, avec cascade de modèles et rotation de plusieurs clés API pour encaisser les limites de débit sans interruption de service.
* **Intégration WhatsApp Cloud API réelle** : réception des messages entrants via webhook Meta, recherche RAG, génération LLM, puis envoi de la réponse — testé de bout en bout avec de vrais messages WhatsApp.

![Conversation WhatsApp automatisée](/images/projets/kwiko/kwiko_chat.png)

* **Authentification robuste** : JWT avec rafraîchissement automatique côté frontend (file d'attente unique en cas de requêtes concurrentes), sans jamais dupliquer d'appel de rafraîchissement.
* **Dashboard complet** : inscription guidée en deux étapes (informations entreprise puis FAQ, au choix formulaire ou import de fichier validé côté client avant envoi), mode démo entièrement simulé côté navigateur, statistiques interactives, export CSV des FAQ et des conversations.

![Gestion des contacts WhatsApp](/images/projets/kwiko/kwiko_contact.png)

* **Backend asynchrone** : FastAPI + SQLModel (SQLite async, migrable vers Postgres), rate limiting par IP, gestion propre des signaux d'arrêt.

### Le détail qui a coûté le plus de temps

Contrairement à ce qu'on pourrait croire, la partie la plus coriace du projet n'était ni le RAG ni le LLM : c'était la configuration de l'API WhatsApp elle-même, à cause d'un bug de Meta lié au nouveau plan de numérotation béninois. Le détail complet (inspection réseau, requête corrigée à la main) fait l'objet d'un [article de blog séparé](/blog/kwiko-meta-bug).

<video controls width="100%" style="border-radius: 12px; margin-top: 1rem;">
  <source src="/videos/projets/kwiko/kwiko_demo.mp4" type="video/mp4" />
  Votre navigateur ne supporte pas la lecture de vidéos.
</video>

### Architecture technique

Le backend expose une API REST classique consommée par le dashboard React, ainsi qu'un webhook dédié consommé par Meta. Les deux surfaces partagent la même couche de persistance (SQLModel) et le même moteur RAG/LLM, initialisés une seule fois au démarrage du serveur pour éviter de recharger le modèle d'embedding à chaque requête.

---

## en

Kwiko started from a simple observation: many small businesses, especially across French-speaking Africa, run their entire customer relationship through WhatsApp — but answering "what time do you close?" or "do you deliver to Cotonou?" fifty times a day isn't a good use of anyone's time. Kwiko lets a business define its own knowledge base (hours, prices, delivery zones...) and have an AI answer on its behalf, without ever inventing information that isn't there.

Built end-to-end in a 4-day sprint: backend, frontend, real WhatsApp integration, and end-to-end testing with a genuine message received on a real phone.

![Login and two-step signup wizard](/images/projets/kwiko/kwiko_start.png)

![Kwiko dashboard](/images/projets/kwiko/kwiko_dashboard.png)

### Key Features

* **Semantic Search (RAG)**: every FAQ provided by the business is embedded and indexed in a dedicated FAISS index (Sentence-Transformers). For each incoming question, Kwiko retrieves the most relevant context before generating a reply.

![FAQ knowledge base management](/images/projets/kwiko/kwiko_faq.png)

* **Groq-powered generation**: natural-language answers built strictly from the retrieved context, with a model cascade and API key rotation to absorb rate limits without service interruption.
* **Real WhatsApp Cloud API integration**: incoming messages received via Meta webhook, RAG retrieval, LLM generation, then reply delivery — tested end-to-end with genuine WhatsApp messages.

![Automated WhatsApp conversation](/images/projets/kwiko/kwiko_chat.png)

* **Robust authentication**: JWT with automatic token refresh on the frontend (single in-flight refresh queue for concurrent requests, no duplicate refresh calls).
* **Full dashboard**: two-step guided signup (company info, then FAQ import via form or client-validated file upload), a fully simulated demo mode running entirely in the browser, interactive stats, CSV export for FAQs and conversations.

![WhatsApp contacts management](/images/projets/kwiko/kwiko_contact.png)

* **Async backend**: FastAPI + SQLModel (async SQLite, Postgres-ready), per-IP rate limiting, clean shutdown signal handling.

### The part that actually took the longest

Contrary to what you'd expect, the hardest part of this project wasn't the RAG pipeline or the LLM — it was configuring the WhatsApp API itself, because of a Meta bug related to Benin's new phone numbering plan. The full story (network inspection, manually replaying a corrected request) is covered in a [separate blog post](/blog/kwiko-meta-bug).

<video controls width="100%" style="border-radius: 12px; margin-top: 1rem;">
  <source src="/videos/projets/kwiko/kwiko_demo.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>

### Technical Architecture

The backend exposes a standard REST API consumed by the React dashboard, alongside a dedicated webhook consumed by Meta. Both surfaces share the same persistence layer (SQLModel) and the same RAG/LLM engine, initialized once at server startup to avoid reloading the embedding model on every request.
