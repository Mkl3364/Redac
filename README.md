# Projet suivi de projet

## Présentation

Ce projet est un site d'e-commerce orienté sur l'achat à travers le jeu (gamification). Il a pour but l'achat de moyens de transport tel que des trotinettes éléctriques que l'on peut modifier/customiser à son image.

## Utilisation

L'équipe en charge du developpement du projet utilise Jira et le tableau Kaban afin de répartir les tâches et travailler à l'aide des méthodes agiles.

Afin de lancer le projet un exemple de fichier `.env.sample` est disponible dans le repo. Il suffit simplement d'utiliser `CREATE DATABASE <nom de la base>` et indiquer ensuite dans le fichier `.env` les informations de la base.

Une fois la base instancié, rendez-vous sur la route `localhost:3000/sync` afin de synchroniser les tables nécéssaires au projet.

Lancement du projet : `npm run dev`

## Technologies utilisées

### ORM Sequelize

Nous utilisons une base de données relationelle et un ORM (Sequelize) qui nous permet de communiquer avec la base de données de façon plus simple et orienté objet. 

une instance de la base de donnée est crée dans le dossier `db` et les modelès de données sont décrit dans le dossier Models.

NOTE : les méthodes sequelize sont des méthodes asynchrones et retournent des promesses.

Afin de retrouver toutes les méthodes utiles :
[Methodes Sequelize](https://dev.to/projectescape/the-comprehensive-sequelize-cheatsheet-3m1m)

Nous avons en base quatre tables reliées entre-elles grâce à des associations :
- Clients
- Colors
- Produits
- Transactions

## Firebase Auth

Pour gérer l'authentification nous utilisons la module d'authentification fourni par Firebase. Il est possible de se connecté à partir d'un e-mail et mot de passe mais aussi de son compte Google.

## PayPal API

PayPayAPI est utilisé afin de proposer une fonction de paiement à l'utilisateur. Le client est redirigé vers une page généré par Paypal.

## ThreeJS

Three Js est un module 3D qui nous permet de créer du contenu 3D dans une application web. Nous utilisons react-three-fiber qui permet d'intégrer threeJS dans une application React.

Enfin, nous utilisons le local Storage pour stocker et gerer le panier utilisateur afin qu'il persiste.

## Equipe de developpement 💻

BOZON Loïc - Bachelor 3 Developpement web 
NGUYEN Kenji - Bachelor 3 Developpement web
BRUNET Mickaël - Bachelor 3 Developpement web



