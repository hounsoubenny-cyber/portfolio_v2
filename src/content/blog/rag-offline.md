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

La solution : faire tourner tout le système — recherche dans les documents ET génération de la réponse — directement sur la machine, sans aucun appel réseau externe. C'est ce que nous avons construit en équipe avec NEXUS, et voici comment ça marche.

### 1. Comment le système retrouve la bonne information

Le principe général s'appelle du RAG (Retrieval-Augmented Generation) : au lieu de demander à un modèle IA de deviner une réponse, on lui donne d'abord les passages pertinents à lire, puis on lui demande de répondre en se basant dessus.

Concrètement, en local, ça se passe en 3 temps :
1. **Découper et comprendre les documents** : chaque fichier (des PDF de cours, dans NEXUS) est découpé en blocs, et chaque bloc est transformé en une empreinte numérique qui capture son sens — un peu comme un résumé mathématique du texte. Tout ça tourne sur la machine, avec un petit modèle léger et rapide.
2. **Chercher par le sens** : une recherche vectorielle (avec FAISS) retrouve un passage même s'il n'utilise pas exactement les mêmes mots que la question. NEXUS s'appuie uniquement sur cette recherche. Une recherche par mots-clés classique (BM25), combinée à la recherche par sens, serait une amélioration utile pour ne pas rater un numéro de contrat ou un identifiant précis : c'est une piste, pas encore réalisée.
3. **Générer la réponse** : les passages les plus pertinents sont donnés à un modèle de langage qui tourne lui aussi en local, sur la machine — aucune donnée ne sort jamais.

### 2. Le compromis à gérer : rapidité vs précision

Faire tourner un modèle de langage sur un ordinateur classique (sans datacenter derrière) impose des limites matérielles réelles. Deux choix rendent cela possible :
* **Compresser le modèle** (une technique appelée quantification) pour qu'il tienne en mémoire : dans NEXUS, les modèles au format GGUF pèsent entre 0,7 et 2,4 Go.
* **Utiliser le processeur plutôt qu'une carte graphique**, grâce à llama.cpp, qui fait tourner ces modèles sur un ordinateur ordinaire, sans GPU.

Résultat : un assistant qui tourne sur du matériel grand public, sans qu'un seul octet de donnée ne quitte la machine. Le prix à payer : un modèle local de cette taille est moins puissant, et plus lent à répondre, qu'un grand modèle hébergé dans le cloud.

C'est l'approche que mon équipe et moi avons mise en place dans **NEXUS** (hackathon HackByIFRI 2026) : la preuve qu'un système privé et souverain est possible sans cloud, en acceptant un modèle plus modeste.

---

## en

### The problem: your documents should never leave your machine

Many teams want an AI to answer questions about their own documents (contracts, reports, source code...). The usual move is to wire those documents straight into a cloud API like OpenAI. But for a law firm, a security team, or any organization handling sensitive data, sending those documents to a third party is a real privacy issue — sometimes a regulatory one too.

The solution: run the entire system — searching the documents AND generating the answer — directly on the machine, with zero external network calls. That's what my team and I built with NEXUS, and here's how it works.

### 1. How the system finds the right information

The general approach is called RAG (Retrieval-Augmented Generation): instead of asking an AI model to guess an answer from memory, you first hand it the relevant passages to read, then ask it to answer based on those.

Concretely, running fully locally, it happens in 3 stages:
1. **Breaking down and understanding the documents**: each file (course PDFs, in NEXUS) is split into chunks, and each chunk is turned into a numeric fingerprint capturing its meaning — a kind of mathematical summary of the text. All of this runs on the machine, using a small, fast model.
2. **Searching by meaning**: a vector search (with FAISS) finds a passage even if it doesn't use the exact same words as the question. NEXUS relies on this search only. Adding a classic keyword search (BM25) on top of it would be a useful improvement, so you don't miss a contract number or a specific ID: it is an idea, not built yet.
3. **Generating the answer**: the most relevant passages are handed to a language model that also runs locally on the machine — no data ever leaves it.

### 2. The tradeoff to manage: speed vs. accuracy

Running a language model on regular hardware (no datacenter behind it) creates real physical constraints. Two choices make it possible:
* **Compressing the model** (a technique called quantization) so it fits in memory: in NEXUS, the GGUF models weigh between 0.7 and 2.4 GB.
* **Using the processor instead of a graphics card**, thanks to llama.cpp, which runs these models on an ordinary computer, with no GPU.

Result: an assistant that runs on consumer-grade hardware, without a single byte of data ever leaving the machine. The price to pay: a local model of this size is less powerful, and slower to answer, than a large model hosted in the cloud.

This is the approach my team and I used in **NEXUS** (HackByIFRI 2026 hackathon): proof that a private, sovereign system is possible without the cloud, by accepting a more modest model.
