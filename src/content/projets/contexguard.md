---
title: "ContexGuard"
description: "Plateforme de détection et protection en temps réel contre les injections de prompts, jailbreaks et exfiltrations dans les interactions LLM."
date_debut: "2026-01-01"
date_fin: null
status: "en cours"
tags: ["IA", "Cybersécurité", "LLM Security", "Deep Learning"]
image_cover: "/images/projets/contexguard/contexguard-cover.png"
lien_github: "https://github.com/hounsoubenny-cyber/contextguard"
lien_demo: null
featured: true
stack: ["Python", "FastAPI", "PyTorch", "React", "SQLite", "JWT", "ONNX"]
---

## fr

ContexGuard est une plateforme complète de sécurité pour les applications basées sur des LLM. Elle détecte et bloque en temps réel les tentatives d'injection de prompts, de jailbreak et d'exfiltration de données, avant qu'elles n'atteignent le modèle de langage.

### Fonctionnalités Principales
* **API REST sécurisée** : authentification JWT, chiffrement Fernet de l'historique utilisateur, rate limiting.
* **Détection hybride** : un moteur de règles statiques (regex) filtre instantanément les patterns connus, complété par un Transformer entraîné from scratch pour l'analyse sémantique fine.
* **4 catégories de classification** : safe, injection, jailbreak, exfiltration.
* **SDK Python** asynchrone et synchrone, avec rafraîchissement automatique du token, pour une intégration en une ligne de code (`guard.check(prompt)`).
* **Dashboard React** avec analyse interactive, statistiques et thème clair/sombre.

### Architecture technique
Le prompt traverse d'abord un analyseur statique basé sur des règles regex. S'il ne matche aucun pattern connu, il est envoyé à un modèle Transformer maison (encodage positionnel sinusoïdal, multi-head self-attention, tokenizer BERT, export ONNX possible) qui effectue une classification sémantique en 4 classes. Le dataset d'entraînement combine plusieurs sources publiques (Neuralchemy, DeepSet, corpus jailbreak, Dolly), enrichies par un pipeline d'augmentation offline générant des variantes bilingues FR/EN.

![Architecture du pipeline de détection ContexGuard](/images/projets/contexguard/contexguard-architecture.png)

## en

ContexGuard is a complete security platform for LLM-based applications. It detects and blocks prompt injection, jailbreak, and data exfiltration attempts in real time, before they reach the language model.

### Key Features
* **Secure REST API**: JWT authentication, Fernet encryption of user history, rate limiting.
* **Hybrid detection**: a static rule engine (regex) instantly filters known patterns, backed by a Transformer trained from scratch for fine-grained semantic analysis.
* **4 classification categories**: safe, injection, jailbreak, exfiltration.
* **Python SDK**, async and sync, with automatic token refresh, for one-line integration (`guard.check(prompt)`).
* **React dashboard** with interactive analysis, statistics, and light/dark theme.

### Technical Architecture
A prompt first passes through a static regex-based analyzer. If it doesn't match a known pattern, it's sent to a custom Transformer model (sinusoidal positional encoding, multi-head self-attention, BERT tokenizer, optional ONNX export) that performs fine-grained 4-class semantic classification. The training dataset combines several public sources (Neuralchemy, DeepSet, jailbreak corpus, Dolly), enriched by an offline augmentation pipeline generating bilingual FR/EN variants.

![ContexGuard detection pipeline architecture](/images/projets/contexguard/contexguard-architecture.png)
