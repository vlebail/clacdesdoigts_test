Bonjour,

Les acces a la base de donnee MLab sont les suivants :
nom du compte : vlebail
mot de passe : Gargaz0re (c'est un zero pas un o majuscule)

Dans ce projet, j'ai utilise ngrok afin de pouvoir avoir une ip publique. Si je n'utilisais pas cette addresse, je ne pouvais pas communiquer avec
le serveur webhook.

afin de pouvoir lancer le projet il faut:

- installer les dependances necessaires (ouvrir une console, aller dans le dossier du projet, lancer un npm install).
- lancer la commande dans la console : node server.js.

Ensuite, le serveur s'occupe de se connecter aux serveurs et de donner l'adresse du serveur ngrok au webhook 
(pour voir ce code, c'est le fichier connexion.js dans le dossier librairies du projet).

Si quelque chose n'est pas clair, je suis disponible pour toute question.

Merci d'avance de l'interet que vous y porterez.

Victor Le Bail.

PS : je vous prie de m'excuser pour les fautes d'accents, je n'arrive pas  mettre le bloc note en UTF-8.