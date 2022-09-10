# Créez un réseau social d’entreprise.
Vous trouverez dans ce repo les fichiers rendus pour la soutenace du projet 07 \" Groupomania \" réalisé dans le cadre du parcours développeur web proposée sur la plateforme Openclassrooms: [https://openclassrooms.com/fr/paths/185-developpeur-web](https://openclassrooms.com/fr/paths/185-developpeur-web).

***

## Frontend
NodeJS, React, React-router, Axios.

***

Pour démarrer la partie frontend du projet, vous devrez ouvrir un second terminal (afin de laisser tourner le backend dans le premier.)

Pour la suite, assurez-vous d'être placé dans le dossier /frontend

```
cd /frontend
```

Dans le fichier .env, il sera necessaire de vérifier l'adresse de l'API :
```
REACT_APP_API_ADRESS=https://localhost:3001
```
Si le backend n'utilise pas le port par défaut (3000) a changé de port, il faudra modifier ici en conséquences.

Finalement, pour lancer le frontend de l'application, depuis de dossier /frontend, taper la commande :
```
npm start
```