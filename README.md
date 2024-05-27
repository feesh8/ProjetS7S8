# Projet S7 - S8

Application web dont les buts finaux sont :
- la consultation des données existantes sur les accidents de vélo à Rennes, présentées sous la forme d'une carte interactive et de statistiques.
- la possibilité d'ajouter des données en tant qu'utilisateur en signalant des accidents, des dangers potentiels ou des suggestions d'aménagements.


Membres :

- Théo Laminie
- Antoine Rault
- Fanny Shehabi

## Lancer le projet en mode Développeur

Il y a des modifications à apporter sur le code.

- Dans `backend/src/controllers/accidentMetropoleController.ts` :

`const apiUrl = "http://nginx:80";` :

- Dans `data_engineering/app.py` :

```python
if __name__ == '__main__':
    # Debug/Development
    app.run(host='0.0.0.0', port=5001)
    # Production
    # http_server = WSGIServer(('', 5001), app)
    # http_server.serve_forever()
```

- Dans `data_engineering/Dockerfile` :

```
FROM python:latest as build
WORKDIR /data_engineering

COPY . .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .

CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=5001"]
```

- Dans `frontend/src/config.ts` : 

`const apiUrl: string = "http://localhost:8080";`

- Dans `nginx.conf` :

```
events {
  worker_connections  4096;  ## Default: 1024
}

http {
  server {
    listen 80;
    listen [::]:80;

    server_name localhost;
    # server_name projets7s8.esir.univ-rennes1.fr; # Pour la VM

    location / {
      proxy_pass http://frontend:3000/;
      proxy_set_header Host $host;
    }

    location /api/ {
      proxy_pass http://backend:3001/;
      proxy_set_header Host $host;
    }

    location /de/ {
      proxy_pass http://data-engineering:5001/;
      proxy_set_header Host $host;
    }
  }
}

```

Ensuite, on peut lancer la commande pour créer et exécuter les containers Docker : 

`sudo docker-compose -f docker-compose.dev.yaml up -d`

On peut maintenant accéder à l’application via : `http://localhost:8080/`

## Comment avons-nous déployé sur une VM de l'ISTIC ?

Nous avons fait une demande VM. Nous avons ensuite reçu par mail les étapes à suivre pour la configuration de la VM. Nous avons installé les outils nécessaires (docker, docker-compose, …).

Il y a des mdifications à apporter sur le code du dépôt GitHub.

- Dans `backend/src/controllers/accidentMetropoleController.ts` :

`const apiUrl = "http://projets7s8.esir.univ-rennes1.fr:8080/";`

- Dans `data_engineering/app.py` :

```python
if __name__ == '__main__':
   # Debug/Development
   # app.run(host='0.0.0.0', port=5001)
   # Production
   http_server = WSGIServer(('', 5001), app)
   http_server.serve_forever()
```

- Dans `data_engineering/Dockerfile` :

```
FROM python:latest as build
WORKDIR /data_engineering


COPY . .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .


CMD ["python3", "app.py"]
```

- Dans `frontend/src/config.ts` : 

```
const apiUrl: string = "http://projets7s8.esir.univ-rennes1.fr:8080/";

Dans nginx.conf : 

events {
 worker_connections  4096;  ## Default: 1024
}


http {
 server {
   listen 80;
   listen [::]:80;


   # server_name localhost;
   server_name projets7s8.esir.univ-rennes1.fr; # Pour la VM


   location / {
     proxy_pass http://frontend:3000/;
     proxy_set_header Host $host;
   }


   location /api/ {
     proxy_pass http://backend:3001/;
     proxy_set_header Host $host;
   }


   location /de/ {
     proxy_pass http://data-engineering:5001/;
     proxy_set_header Host $host;
   }
 }
}
```

Puis lancer la commande pour créer et exécuter les containers Docker : 

`sudo docker-compose -f docker-compose.prod.yaml up -d`

On peut maintenant accéder à l’application via : `http://projets7s8.esir.univ-rennes1.fr:8080/`

/!\ Cela fonctionne uniquement en étant connecté à Eduroam













