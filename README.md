# BusDirect
BusDirect est une application web de gestion des trajets et des réservations de bus.
## Fonctionnalités
     - Afficher les 20 trajets sous forme de cartes.
     - Rechercher un trajet par ville.
     - Filtrer les trajets par statut :tout statut ou Disponible ou Complet.
     - Parcourir les trajets avec une pagination de 6 cartes.
     - Afficher le nombre total de passagers et la recette totale.
     - afficher le trajet choisi dans le cabine 
     - afficher les details de trajets et un liste attente 
     - supprimer /ajoutet/modiffier les passages de trajets
     - un liste attente si le trajet complet 

## Technologies utilisées
``text
     * HTML5
     * CSS3
     * Tailwind CSS
     * JavaScript (ES Modules)
     * Fetch API
     * LocalStorage
     * Git & GitHub
  ```
## Structure du projet

busdirect-partie2/ 
├── index.html 
├── cabine.html 
├── data/ 
│ └── trips.json 
├── js/ 
│ ├── store.js (chargement, lecture et sauvegarde des données) 
│ ├── validators.js (validations et regex) 
│ ├── render.js (fonctions d'affichage) 
│ ├── reservations.js (réservations et liste d'attente) 
│ ├── main-trajets.js (point d'entrée de index.html) 
│ └── main-cabine.js (point d'entrée de cabine.html) 
└── README.md

## les pages
 -page trajets : [voir_page](index.html)
 -page cabine  : [voir_page](cabine.html)
 -page tickets : [voir_page](tickets.html)
