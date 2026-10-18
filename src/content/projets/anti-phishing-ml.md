---
title: "Anti-Phishing ML Engine"
description: "Détecteur de phishing par URL entraîné sur 247 000 entrées, basé sur un stacking XGBoost / HistGradientBoosting / Random Forest. Précision de 99.3 %. Version publique allégée d'un système plus complet."
date_debut: "2026-01-08"
date_fin: "2026-05-11"
status: "terminé"
tags: ["Machine Learning", "Cybersécurité", "Stacking"]
image_cover: "/images/projets/anti-phishing.png"
lien_github: "https://github.com/hounsoubenny-cyber/anti-phishing-ml"
lien_demo: "https://huggingface.co/spaces/hounsoubenny/anti_phishing_ml"
featured: true
stack: ["Python", "XGBoost", "scikit-learn", "HuggingFace"]
---

## fr

Un classifieur qui analyse des URLs brutes, en extrait des caractéristiques lexicales et structurelles, et prédit les tentatives d'hameçonnage.

> **Version publique allégée.** Ce dépôt est une version simplifiée du projet, pensée pour être lisible et reproductible. Une version plus complète (caractéristiques réseau WHOIS et SSL, optimisation bayésienne des hyperparamètres avec Optuna) existe dans un projet privé plus large, pas encore publié.

### Approche Technique
* **19 caractéristiques par URL** : lexicales et structurelles (longueur, entropie de Shannon, mots-clés à risque, extensions de domaine suspectes, adresse IP dans l'URL).
* **Stacking d'ensemble** : XGBoost, Random Forest et HistGradientBoosting, combinés par un méta-classifieur de régression logistique.
* **Résultats** : précision de 99.30 % et score F1 de 0.99 sur les deux classes.
* **Cache local** : les prédictions sont mises en cache (expiration à 24 h) pour ne pas recalculer les URLs déjà vues.

---

## en

A classifier that parses raw URLs into lexical and structural features and predicts phishing attempts.

> **Lightweight public version.** This repository is a simplified version of the project, designed to be readable and reproducible. A more complete version (WHOIS and SSL network features, Bayesian hyperparameter optimization with Optuna) lives in a larger private project that is not published yet.

### Technical Design
* **19 features per URL** : lexical and structural (length, Shannon entropy, risky keywords, suspicious top-level domains, IP address in the URL).
* **Stacking ensemble** : XGBoost, Random Forest and HistGradientBoosting, combined by a logistic regression meta-model.
* **Results** : 99.30 % accuracy and 0.99 F1-score on both classes.
* **Local cache** : predictions are cached (24-hour expiry) so URLs already seen are not recomputed.
