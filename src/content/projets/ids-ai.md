---
title: "AI-Powered IDS/IPS System"
description: "Système de détection d'intrusions réseau combinant CNN 1D, auto-encodeur LSTM et Isolation Forest sur du trafic capturé en direct. Version publique simplifiée d'un projet plus complet."
date_debut: "2026-01-02"
date_fin: "2026-01-14"
status: "terminé"
tags: ["Deep Learning", "Cybersécurité", "Temps Réel"]
image_cover: "/images/projets/ids-ai.png"
lien_github: "https://github.com/hounsoubenny-cyber/ids-ai"
lien_demo: null
featured: false
stack: ["Python", "TensorFlow", "scikit-learn", "Optuna", "dpkt", "pypcap"]
---

## fr

Ce système capture le trafic réseau en direct sur plusieurs interfaces et le soumet à plusieurs modèles de Machine Learning pour repérer les attaques connues et les comportements inhabituels.

> **Version publique simplifiée.** Ce dépôt montre le cœur de la détection. Dans une version plus complète, développée dans un projet privé plus large et pas encore publié, le système agit aussi : il dialogue avec Suricata et déclenche des blocages iptables sur les adresses malveillantes.

### Architecture Technique
* **Détection hybride** : un CNN 1D classe les signatures d'attaques connues, un auto-encodeur LSTM repère les anomalies sur les flux non identifiés, et une Isolation Forest apporte une détection d'anomalies complémentaire.
* **Capture réseau** : paquets capturés avec pypcap et analysés avec dpkt, via des threads, sur plusieurs interfaces réseau.
* **Objectif de latence** : moins de 100 ms par analyse de paquet (objectif annoncé dans le README du dépôt).

---

## en

This system captures live network traffic across multiple interfaces and passes it through several Machine Learning models to spot known attacks and unusual behavior.

> **Simplified public version.** This repository shows the core of the detection. In a more complete version, developed inside a larger private project that is not published yet, the system also takes action: it talks to Suricata and triggers iptables blocks on malicious addresses.

### Technical Deep-dive
* **Hybrid detection** : a 1D-CNN classifies known attack signatures, an LSTM autoencoder flags anomalies in unidentified flows, and an Isolation Forest adds complementary anomaly detection.
* **Network capture** : packets captured with pypcap and parsed with dpkt, using threads, across multiple network interfaces.
* **Latency target** : under 100 ms per packet analysis (target stated in the repository README).
