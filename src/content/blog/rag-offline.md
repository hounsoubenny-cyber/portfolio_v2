---
title: "Faire tourner un assistant IA 100% hors ligne, sans envoyer ses données à personne"
date: "2026-06-12"
tags: ["IA", "RAG", "Souveraineté"]
image_cover: "/images/blog/rag-offline.png"
resume: "Un cabinet juridique ou une équipe cyber ne peut pas juste brancher ses documents internes sur ChatGPT. Voici comment concevoir un assistant IA qui répond sur tes documents sans que rien ne sorte de la machine."
temps_lecture: 6
---

## fr

### Le problème : tes documents ne devraient jamais quitter ta machine

Beaucoup d'équipes veulent qu'une IA réponde à des questions sur leurs propres documents (contrats, rapports, code source...). Le réflexe courant, c'est de brancher ces documents sur une API cloud comme OpenAI. Mais pour un cabinet juridique, une équipe cybersécurité ou toute organisation qui manipule des données sensibles, envoyer ces documents à un tiers pose un vrai problème de confidentialité — parfois même un problème réglementaire.

La solution : faire tourner tout le système — recherche dans les documents ET génération de la réponse — directement sur la machine, sans aucun appel réseau externe. C'est ce que j'ai construit avec NEXUS, et voici comment ça marche.

### 1. Comment le système retrouve la bonne information

Le principe général s'appelle du RAG (Retrieval-Augmented Generation) : au lieu de demander à un modèle IA de deviner une réponse, on lui donne d'abord les passages pertinents à lire, puis on lui demande de répondre en se basant dessus.

Concrètement, en local, ça se passe en 3 temps :
1. **Découper et comprendre les documents** : chaque fichier (PDF, texte, Markdown) est découpé en blocs, et chaque bloc est transformé en une empreinte numérique qui capture son sens — un peu comme un résumé mathématique du texte. Tout ça tourne sur la machine, avec un petit modèle léger et rapide.
2. **Chercher de deux façons différentes** : une recherche "par sens" (elle retrouve un passage même s'il n'utilise pas exactement les mêmes mots que la question) et une recherche "par mots-clés" classique (utile pour ne pas rater un numéro de contrat ou un identifiant précis qu'une recherche sémantique pourrait ignorer). Les deux résultats sont ensuite combinés intelligemment.
3. **Générer la réponse** : les passages les plus pertinents sont donnés à un modèle de langage qui tourne lui aussi en local, sur la machine — aucune donnée ne sort jamais.

### 2. Le compromis à gérer : rapidité vs précision

Faire tourner un modèle de langage sur un ordinateur classique (sans datacenter derrière) impose des limites matérielles réelles. Deux choix ont fait la différence :
* **Compresser le modèle** intelligemment (une technique appelée quantification) pour qu'il tienne en mémoire sans perdre en qualité de réponse — le modèle passe d'environ 16 Go à moins de 5 Go.
* **Combiner les deux recherches efficacement**, pour ne garder que les passages vraiment utiles sans avoir besoin d'une étape de vérification supplémentaire coûteuse en temps.

Résultat : une réponse en moins de 500 millisecondes, sur du matériel grand public, sans qu'un seul octet de donnée ne quitte la machine.

C'est l'approche que j'ai mise en place dans **NEXUS**, la preuve qu'un système souverain et privé peut être aussi rapide qu'une solution cloud.

---

## en

### The problem: your documents should never leave your machine

Many teams want an AI to answer questions about their own documents (contracts, reports, source code...). The usual move is to wire those documents straight into a cloud API like OpenAI. But for a law firm, a security team, or any organization handling sensitive data, sending those documents to a third party is a real privacy issue — sometimes a regulatory one too.

The solution: run the entire system — searching the documents AND generating the answer — directly on the machine, with zero external network calls. That's what I built with NEXUS, and here's how it works.

### 1. How the system finds the right information

The general approach is called RAG (Retrieval-Augmented Generation): instead of asking an AI model to guess an answer from memory, you first hand it the relevant passages to read, then ask it to answer based on those.

Concretely, running fully locally, it happens in 3 stages:
1. **Breaking down and understanding the documents**: each file (PDF, text, Markdown) is split into chunks, and each chunk is turned into a numeric fingerprint capturing its meaning — a kind of mathematical summary of the text. All of this runs on the machine, using a small, fast model.
2. **Searching two different ways**: a "meaning-based" search (it finds a passage even if it doesn't use the exact same words as the question) and a classic "keyword" search (useful so you don't miss a contract number or a specific ID that a meaning-based search might skip). The two results are then merged intelligently.
3. **Generating the answer**: the most relevant passages are handed to a language model that also runs locally on the machine — no data ever leaves it.

### 2. The tradeoff to manage: speed vs. accuracy

Running a language model on regular hardware (no datacenter behind it) creates real physical constraints. Two choices made the difference:
* **Compressing the model** intelligently (a technique called quantization) so it fits in memory without losing answer quality — the model shrinks from about 16GB down to under 5GB.
* **Merging both searches efficiently**, keeping only the genuinely useful passages without needing an extra, time-costly verification step.

Result: an answer in under 500 milliseconds, on consumer-grade hardware, without a single byte of data ever leaving the machine.

This is the approach behind **NEXUS**, proof that a private, sovereign system can be just as fast as a cloud solution.
