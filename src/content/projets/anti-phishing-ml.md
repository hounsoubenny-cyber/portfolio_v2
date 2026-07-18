---
title: "Anti-Phishing ML Engine"
description: "Détecteur de phishing par URL entraîné sur 247 000 entrées avec stacking d'ensemble et optimisation Bayésienne. Précision de 99.3%."
date_debut: "2026-02-01"
date_fin: "2026-02-28"
status: "terminé"
tags: ["Machine Learning", "Cybersécurité", "Optuna"]
image_cover: "/images/projets/anti-phishing.png"
lien_github: "https://github.com/hounsoubenny-cyber/anti-phishing-ml"
lien_demo: "https://huggingface.co/spaces/hounsoubenny/anti_phishing_ml"
featured: true
stack: ["Python", "XGBoost", "scikit-learn", "Optuna", "HuggingFace"]
---

## fr

Un classifieur de sécurité de pointe qui analyse les URLs web brutes pour en extraire des caractéristiques lexicales, structurelles et réseau profondes, et prédire les tentatives d'hameçonnage avec une fiabilité exceptionnelle.

### Approche Technique
* **Extraction de 34 Caractéristiques** : Analyse lexicale (longueur, entropie de Shannon, sous-domaines), structurelle (mots-clés à risque, répertoires) et données réseau (WHOIS, SSL, Alexa).
* **Architecture de Stacking d'Ensemble** : Combine XGBoost, Random Forests et HistGradientBoosting sous un méta-classifieur de Régression Logistique.
* **Optimisation Bayésienne** : Utilisation d'Optuna pour maximiser le score F1 (0.99) et réduire à près de zéro les faux positifs.
* **Vitesse d'Exécution** : Intégration d'un cache local pour des temps de vérification extrêmement courts (< 10ms).

---

## en

A state-of-the-art security classifier that parses raw web URLs into deep lexical, structural, and network-related features to accurately predict phishing attempts.

### Technical Design
* **34 engineered features** : Lexical statistics (entropy, domain length), structural analysis, and network metrics (WHOIS, SSL certificate validity).
* **Stacking Ensemble Architecture** : Pipes predictions from XGBoost, Random Forest, and HistGradientBoosting to a final Logistic Regression meta-model.
* **Hyperparameter Search** : Uses Optuna for Bayesian hyperparameter space tuning, reaching 99.3% accuracy and 0.99 F1-score.
* **Ultra-low latency** : Combined with an optimized local whitelist cache to evaluate targets in milliseconds.
