---
title: "AI-Powered IDS/IPS System"
description: "Système hybride de détection d'intrusions réseau mariant auto-encodeurs LSTM, CNN et Isolation Forests pour une inspection sous 100ms."
date_debut: "2026-01-01"
date_fin: null
status: "terminé"
tags: ["Deep Learning", "Cybersécurité", "Temps Réel"]
image_cover: "/images/projets/ids-ai.png"
lien_github: "https://github.com/hounsoubenny-cyber/ids-ai"
lien_demo: null
featured: true
stack: ["TensorFlow", "PyTorch", "pcap", "Suricata", "Python", "Sockets"]
---

## fr

Ce système de détection et de prévention d'intrusions capture le trafic réseau en temps réel sur plusieurs interfaces réseau et le soumet à des architectures de Machine Learning pour identifier les menaces connues et inconnues.

### Architecture Technique
* **Détection Signature & Comportementale** : Un CNN 1D classifie les signatures connues avec un haut débit, tandis qu'un auto-encodeur LSTM évalue les anomalies sur les flux de paquets non identifiés.
* **Intégration Bas Niveau (PCAP)** : Capture brute et dissection de paquets réseaux via des sockets multithreadés en C/Python pour réduire la latence.
* **Sursaut Actif (IPS)** : S'interface directement avec Suricata et iptables pour bannir dynamiquement les adresses IP malveillantes en cours d'attaque (< 100ms de réaction).

---

## en

This intelligent Intrusion Detection and Prevention system captures real-time network traffic across multiple interfaces and pipes packets through dual ML architectures to identify attacks.

### Technical Deep-dive
* **Dual-Path ML Models** : A high-throughput 1D-CNN handles known attack signatures, while a deep LSTM Autoencoder performs reconstruction-based anomaly detection for zero-day exploits.
* **Low-Level Inspections (PCAP)** : Performs raw socket capture and processing using multi-threaded Python/C bindings to avoid packet drops.
* **Active Countermeasures (IPS)** : Communicates with Suricata alert sockets to automatically trigger iptables firewall drops on malicious IPs within 100ms.
