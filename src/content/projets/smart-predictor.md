---
title: "SmartPredictor AutoML Framework"
description: "Une bibliothèque Python zéro-config qui détecte le type de problème de données et entraîne des modèles d'ensemble optimisés."
date_debut: "2025-09-01"
date_fin: "2025-09-30"
status: "terminé"
tags: ["AutoML", "Bibliothèque", "Python"]
image_cover: "/images/projets/smart-predictor.png"
lien_github: "https://github.com/hounsoubenny-cyber/smart-predictor"
lien_demo: "https://huggingface.co/spaces/hounsoubenny/smart-predictor"
featured: false
stack: ["XGBoost", "CatBoost", "LightGBM", "Optuna", "scikit-learn"]
---

## fr

SmartPredictor est un outil pour développeur qui automatise la transition complexe entre un dataset tabulaire brut et un modèle d'ensemble entraîné et prêt à être déployé en production.

### Force du Framework
* **Autodiagnostic Intelligent** : Détecte automatiquement la nature du problème (classification binaire ou multi-classe, régression, apprentissage multi-label).
* **Feature Engineering Automatique** : Encode les variables catégorielles, impute les valeurs manquantes, équilibre les classes (SMOTE) et génère des caractéristiques sémantiques.
* **Stacking Ensemble Optimisé** : Assemble les prédictions d'XGBoost, CatBoost et LightGBM, puis optimise les hyperparamètres globaux via Optuna pour en tirer le meilleur score.

---

## en

SmartPredictor is a developer-focused Python library that bridges the gap between raw, messy datasets and highly-tuned machine learning models ready for production.

### Key Strengths
* **Self-Diagnosis Engine** : Auto-detects target labels and problem types (binary/multiclass classification, multi-label tasks, or regression).
* **Automatic Feature Pipeline** : Seamlessly handles missing values, categorical encoding, class imbalances, and semantic column creation.
* **Bayesian Stacking** : Combines predictions from XGBoost, CatBoost, and LightGBM using Bayesian optimization via Optuna inside a Scikit-Learn wrapper.
