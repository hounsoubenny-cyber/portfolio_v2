---

title: "Workbench & Mediakit"
description: "Un framework Python pour construire des interfaces autour d'outils CLI puissants, avec Mediakit comme premier produit multimédia."
date_debut: "2026-08-20"
date_fin: "2026-09-06"
status: "terminé"
tags: ["Python", "Framework", "Developer Tools", "CLI", "Multimédia"]
image_cover: "/images/projets/workbench/workbench-mediakit.jpg"
lien_github: "https://github.com/hounsoubenny-cyber/workbench"
lien_demo: null
featured: true
stack: ["Python", "FastAPI", "Pydantic", "React", "TypeScript", "Vite", "WebSocket", "PyInstaller"]
---------------------------------------------------------------------------------------------------

## fr

# Workbench & Mediakit

**Workbench** est un framework Python que je développe pour faciliter la création d'applications autour d'outils en ligne de commande puissants.

L'idée est née d'un constat rencontré en développant différents projets : beaucoup d'outils CLI sont extrêmement capables, mais leur syntaxe et leur nombre d'options peuvent rendre leur utilisation difficile, surtout lorsqu'on souhaite les intégrer dans une application avec une interface graphique.

Plutôt que de recréer cette infrastructure pour chaque nouvel outil, j'ai choisi de construire un moteur réutilisable.

**Mediakit est le premier produit construit sur Workbench.**

Il réunit **FFmpeg, ImageMagick et SoX** dans une interface graphique et propose actuellement **plus de 100 actions prédéfinies** pour le traitement vidéo, audio et image.

Le projet dispose également d'un mode avancé permettant de définir des actions personnalisées au-delà du catalogue prédéfini.

### Mediakit

![Interface Mediakit](/images/projets/mediakit/mediakit-interface.png)

### Fonctionnalités principales

* **Framework d'orchestration CLI** : base réutilisable pour construire des applications autour d'outils en ligne de commande.
* **Arguments typés** : `PathArg`, `IntArg`, `FloatArg`, `BoolArg`, `EnumArg`, `PatternArg`, `MultiPathArg`.
* **Actions déclaratives** : définition des fonctionnalités avec `ActionSpec`.
* **Pipelines** : possibilité de chaîner plusieurs opérations via `PipelineSpec`.
* **Gestion des jobs** : exécution, suivi, annulation et contrôle des tâches.
* **Streaming des logs** : remontée des sorties des processus en temps réel via WebSocket.
* **Exécution contrôlée** : processus exécutés directement avec `shell=False`, validation des arguments et contrôle des chemins.
* **Mode avancé Mediakit** : création dynamique d'actions personnalisées à partir d'arguments structurés.
* **Traitement multimédia** : intégration de FFmpeg, ImageMagick et SoX.
* **Distribution multiplateforme** : génération automatisée des exécutables Mediakit pour Linux, Windows et macOS.

### Architecture technique

Workbench fournit le socle commun tandis que Mediakit apporte les fonctionnalités métier.

![Architecture de Workbench](/images/projets/workbench/workbench-architecture.jpg)

L'architecture repose notamment sur **FastAPI** pour l'API, **Pydantic** pour la validation et la modélisation des entrées, **React + TypeScript + Vite** pour le frontend et les **WebSockets** pour le suivi des jobs.

Le backend de Mediakit peut également être compilé avec **PyInstaller**. Un workflow GitHub Actions automatise la génération des binaires pour Linux, Windows et macOS et leur publication dans les GitHub Releases.

### Pourquoi ce projet ?

Je ne voulais pas construire uniquement une interface pour FFmpeg.

Je voulais construire une base permettant de créer **d'autres produits autour d'autres outils** sans repartir de zéro.

Mediakit est donc le premier cas concret de cette idée.

**Le moteur reste. Le produit change.**

### Repository

[Voir le code source sur GitHub](https://github.com/hounsoubenny-cyber/workbench)

---

## en

# Workbench & Mediakit

**Workbench** is a Python framework I am building to make it easier to create applications around powerful command-line tools.

The idea came from a simple observation while working on different projects: many CLI tools are extremely capable, but their syntax and large number of options can make them difficult to use, especially when integrating them into a graphical application.

Instead of rebuilding the same infrastructure for every new tool, I decided to build a reusable engine.

**Mediakit is the first product built on top of Workbench.**

It combines **FFmpeg, ImageMagick and SoX** into a graphical interface and currently provides **100+ predefined actions** for video, audio and image processing.

The project also includes an advanced mode that allows users to define custom actions beyond the predefined catalog.

### Mediakit

![Mediakit Interface](/images/projets/mediakit/mediakit-interface.png)

### Key Features

* **CLI orchestration framework**: reusable foundation for applications built around command-line tools.
* **Typed arguments**: `PathArg`, `IntArg`, `FloatArg`, `BoolArg`, `EnumArg`, `PatternArg`, `MultiPathArg`.
* **Declarative actions**: features are defined through `ActionSpec`.
* **Pipelines**: multiple operations can be chained through `PipelineSpec`.
* **Job management**: execution, monitoring, cancellation and task control.
* **Real-time logs**: process output streamed through WebSockets.
* **Controlled execution**: processes executed directly with `shell=False`, with argument validation and path controls.
* **Mediakit advanced mode**: dynamically defined custom actions using structured arguments.
* **Multimedia processing**: FFmpeg, ImageMagick and SoX integration.
* **Cross-platform distribution**: automated Mediakit builds for Linux, Windows and macOS.

### Technical Architecture

Workbench provides the reusable infrastructure while Mediakit provides the product-specific functionality.

![Workbench Architecture](/images/projets/workbench/workbench-architecture.jpg)

The architecture uses **FastAPI** for the API, **Pydantic** for input validation and data modeling, **React + TypeScript + Vite** for the frontend, and **WebSockets** for job monitoring.

Mediakit's backend can also be packaged with **PyInstaller**. A GitHub Actions workflow automates binary builds for Linux, Windows and macOS and publishes them through GitHub Releases.

### Why this project?

I didn't want to build just another interface for FFmpeg.

I wanted to create a foundation that could be reused to build **other products around other command-line tools** without starting from scratch every time.

Mediakit is the first concrete example of that idea.

**The engine stays. The product changes.**

### Repository

[View the source code on GitHub](https://github.com/hounsoubenny-cyber/workbench)
