# Application (mini blog) avec Adonis.js

Ce dépôt contient le code source de l'app développée avec Adonis.js. Il accompagne la série de vidéos disponible sur YouTube qui détaille le processus de développement de cette application.

## Présentation

L'application est construite avec Adonis.js, un framework Node.js robuste et extensible, idéal pour développer des applications web et des API. Elle utilise une architecture MVC (Modèle-Vue-Contrôleur) pour une organisation claire et efficace du code.

## Installation

1. Clonez ce dépôt sur votre machine locale. ``` git clone https://github.com/Houssam-OUATMANI/mon-adonis-blog.git mon-blog ```
2. Accédez au répertoire de l'application : ``` cd mon-blog```
3. Installez les dépendances: ``` npm i ```
4. Configurez l'application en créant un fichier .env basé sur .env.example et en le personnalisant selon vos besoins ``` cp .env.example .env ```
5. Générez une clé secrète pour l'application. ``` node ace generate:key ```
6. Migrez la base de données. ``` node ace migration:run ```
7. Lancez l'application en mode développement :``` npm run dev ```
