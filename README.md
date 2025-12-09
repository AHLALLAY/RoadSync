# 🚚 Application de suivi des trajets, carburant et maintenance pour flotte de camions

## 📋 Informations du projet

- **Assigné par :** 👤 Zakaria Ziane
- **Date de création :** 📅 08/12/25
- **Situation professionnelle :** 💼 Création d'une application MERN Fullstack
- **Contexte :** Application pour la gestion de flotte

![RoadSync.png](./RoadSync.png)

## 🎯 Objectif du projet
Application pour la gestion de flotte, permettant d’automatiser le suivi des véhicules, trajets, maintenance et chauffeurs afin d’améliorer la visibilité et l’efficacité globale.

**Ce brief vous a été assigné** : _Lisez attentivement votre brief avant de débuter votre travail !_

**Assignation individuelle** : _Vous travaillez individuellement sur ce brief_.

### 🎓 Problématique
Dans le contexte web actuel, on recherche des solutions pour développer des applications web performantes et intuitives. Celles-ci doivent être à la fois simples à administrer et à déployer. Comment peut-on allier efficacement le rendu côté serveur, propre à la logique traditionnelle, à la flexibilité et la réactivité offertes par JavaScript et Node.js? La stack MERN, combinant MongoDB, Express.js, React.js et Node.js, semble être une réponse prometteuse à ce défi.

## 🎯 Compétences visées
Ce projet vise à développer les compétences suivantes (toutes au **Niveau 2**) :

### 📊 Gestion et Organisation
- **C1.** Planifier le travail à effectuer individuellement
- **C2.** Contribuer au pilotage de l’organisation du travail individuel et collectif
- **C9.** Contribuer à la gestion d’un projet

### 🔍 Analyse et Conception
- **C3.** Rechercher de façon méthodique une ou des solutions au problème rencontré
- **C10.** Analyser les besoins et maquetter une application
- **C11.** Définir l’architecture logicielle d’une application
- **C12.** Concevoir et mettre en place une base de données

### 📚 Communication et Documentation
- **C4.** Partager la solution adoptée en utilisant les moyens de partage de connaissance ou de documentation disponibles
- **C5.** Présenter un travail réalisé en synthétisant ses résultats, sa démarche
- **C15.** Préparer et documenter le déploiement d’une application

### 💻 Développement Technique
- **C6.** Installer et configurer son environnement de travail en fonction du projet
- **C7.** Développer des interfaces utilisateur
- **C8.** Développer des composants métier
- **C13.** Développer des composants d’accès aux données
- **C14.** Préparer et exécuter les plans de tests
- **C16.** Contribuer à la mise en production dans une démarche DevOps

## 📋 Spécifications fonctionnelles

### 📖 Contexte du projet
Une entreprise de transport routier dispose d’une flotte de camions et de remorques utilisée pour le transport de marchandises entre différents sites (entrepôts, clients, fournisseurs, ports, etc.). Aujourd’hui, la gestion de cette flotte est réalisée de manière essentiellement manuelle (fichiers Excel, appels téléphoniques, documents papier), ce qui entraîne :

- Un manque de visibilité en temps réel sur les trajets en cours et les véhicules disponibles.
- Des difficultés à suivre le kilométrage des camions et remorques.
- Un suivi peu fiable de la consommation de gasoil et des coûts associés.
- Une gestion approximative des pneus (usure, remplacement) et des opérations de maintenance (vidange, révision, etc.).
- Une absence de centralisation des informations sur les chauffeurs, leurs trajets et leurs performances.

### ⚡ Les fonctionnalités générales
Mettre en place une application web de gestion de flotte permettant de :
- Suivre les ressources : camions, remorques, pneus, carburant.
- Gérer les trajets et leur assignation aux chauffeurs.
- Suivre le kilométrage, la consommation gasoil et l’état des pneus.
- Planifier et notifier la maintenance périodique (pneus, vidange, etc.).
- Permettre au chauffeur de télécharger son trajet en PDF et de mettre à jour le statut.

### 📝 User Stories par Module

#### 🚚 Module 1 : Gestion de la Flotte (Admin)

> #### Gestion des véhicules
> <mark style="background-color: #ffebee; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Admin</mark> **Je veux** créer, modifier et supprimer les fiches des camions et remorques **Afin de** maintenir un inventaire à jour des véhicules disponibles.

> #### Gestion des pneus
> <mark style="background-color: #ffebee; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Admin</mark> **Je veux** enregistrer et suivre l'état des pneus **Afin de** prévoir leur remplacement avant qu'ils ne deviennent dangereux.

> #### Configuration de la maintenance
> <mark style="background-color: #ffebee; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Admin</mark> **Je veux** configurer des règles de maintenance (périodicité vidange, révision) **Afin d'** être alerté automatiquement quand un véhicule nécessite un entretien.

#### 🗺️ Module 2 : Gestion des Trajets (Admin)

> #### Planification de trajet
> <mark style="background-color: #ffebee; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Admin</mark> **Je veux** créer un trajet et l'assigner à un chauffeur spécifique **Afin d'** organiser le planning de transport.

> #### Suivi global
> <mark style="background-color: #ffebee; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Admin</mark> **Je veux** visualiser l'ensemble des trajets en cours **Afin d'** avoir une visibilité en temps réel sur l'activité de la flotte.

#### 🚛 Module 3 : Espace Chauffeur

> #### Consultation des missions
> <mark style="background-color: #e3f2fd; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Chauffeur</mark> **Je veux** consulter la liste de mes trajets assignés **Afin de** connaître mon emploi du temps et mes destinations.

> #### Ordre de mission
> <mark style="background-color: #e3f2fd; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Chauffeur</mark> **Je veux** télécharger les détails de mon trajet en format PDF **Afin de** disposer d'un ordre de mission officiel (même hors ligne).

> #### Mise à jour du statut
> <mark style="background-color: #e3f2fd; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Chauffeur</mark> **Je veux** changer le statut du trajet (« À faire », « En cours », « Terminé ») **Afin d'** informer l'administrateur de ma progression.

> #### Rapport de fin de trajet
> <mark style="background-color: #e3f2fd; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Chauffeur</mark> **Je veux** saisir le kilométrage (départ/arrivée), le volume de gasoil ajouté et des remarques éventuelles **Afin de** permettre le calcul précis de la consommation et des frais.

#### 📊 Module 4 : Rapports et Analyses (Admin)

> #### Analyse de la consommation
> <mark style="background-color: #ffebee; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Admin</mark> **Je veux** consulter des rapports sur la consommation de gasoil et le kilométrage par véhicule **Afin d'** identifier les coûts excessifs ou les anomalies.

> #### Suivi de maintenance
> <mark style="background-color: #ffebee; padding: 2px 6px; border-radius: 3px;">**👤 Acteur :** Admin</mark> **Je veux** voir l'historique et les prévisions de maintenance **Afin d'** assurer la longévité et la conformité de la flotte.

## 📊 Priorisation des Fonctionnalités (MoSCoW)

### 🔴 Must Have (Critique - MVP)
- Authentification et gestion des rôles (Admin/Chauffeur)
- CRUD Camions et Remorques
- Création et assignation de trajets
- Consultation des trajets (Chauffeur)
- Mise à jour du statut de trajet

### 🟡 Should Have (Important)
- Suivi kilométrage et gasoil
- Téléchargement PDF de l'ordre de mission
- Gestion des pneus

### 🟢 Could Have (Souhaitable)
- Rapports graphiques de consommation
- Système de notification automatique pour la maintenance

## 🛠️ Spécifications Techniques

### 🔧 Partie Back-end
- Réaliser votre application avec **Node.js (Express.js)** et **MongoDB**.
- Utiliser **Mongoose** comme ODM pour gérer la connexion et les interactions avec la base de données.
- Implémenter des **tests unitaires** pour chaque controller du back-end (obligatoire).
- Créer un middleware pour la **gestion des erreurs (Error Handling)**.
- Programmer un middleware pour la vérification et la sécurité d’authentification avec **JWT ou HttpBasic**.
- Protéger les routes sensibles de l’application avec un système d'autorisation.

### ⚛️ Partie Front-end (React.js)
- Utiliser les **hooks React** (useState, useEffect) pour la gestion des états et des effets secondaires.
- Définir les routes de l’application en utilisant **Nested Routes**.
- **Protéger les routes** pour empêcher l'accès non autorisé. (selon rôle Admin/Chauffeur.)
- Implémenter la gestion des états globaux avec **Redux ou Context API**.

### 🐳 Partie Déploiement
- Générer des **images Docker** (Back-end et Front-end) et créer un réseau pour connecter les deux.

## 📚 Modalités pédagogiques
- **Travail individuel.**
- **Date de lancement :** 08/12/2025
- **Deadline :** 12/12/2025.
- **Durée :** 5 jours

## ⏱️ Modalités d'évaluation
Une durée de **45 minutes**, organisée comme suit :
- **Présentation rapide (10 minutes)** : Démonstration du contenu et des fonctionnalités principales de l’application.
- **Analyse du code (10 minutes)** : Montrez et expliquez le code source, en soulignant vos choix techniques.
- **Mise en situation (20 minutes)** : L’examinateur propose des cas d’usage pour tester votre application.
- **Code Review et questions techniques (5 minutes)**.

## 📦 Livrables
- **Code Source**
- **Lien GitHub de l'application.**
- Code clair, modulaire et bien commenté.

### 📖 Documentation technique
- Description de l’architecture de l’application.
- Guide d’installation et de configuration.
- Liste des dépendances externes utilisées et leur rôle.

## ✅ Critères de performance
- Structure et organisation du projet.
- Nommage cohérent des dossiers et fichiers.
- Clarté et lisibilité du code.
- Respect des principes DRY (éviter les répétitions).
- Respect du SRP (Single Responsibility Principle).
- Nommage explicite des fonctions et variables.
- Validation efficace des entrées (données utilisateur).
- Gestion robuste des erreurs (Error Handling).
- Capacité à lire et intégrer la documentation.