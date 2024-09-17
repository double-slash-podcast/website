---
publicationDate: 18 Sep 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 2912
episodeNumber: 95
episodeType: full
explicit: false
season: 1
dsSlug: DS_095_secret
title: Gestion des Secrets et .Env
subtitle: Astuces et bonnes pratiques
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1726588579/episode/ART_95_dwvg6v.png
description: Les variables d'environnement sont essentielles pour la sécurité et la flexibilité des applications web. Bien que le fichier .ENV soit couramment utilisé, il présente des risques de partage d'informations sensibles. Des solutions alternatives comme les gestionnaires de mots de passe et les "secrets managers" offrent une meilleure sécurité pour le stockage et le partage d'informations confidentielles, particulièrement dans les environnements de développement collaboratifs et les déploiements cloud.
videoLink : CH_il0Zh6nM

---
## Pourquoi utiliser des variables d’environnement ?

Les variables d'environnement sont utilisées dans les programmes de sites web pour plusieurs raisons importantes :

- **Sécurité :** Elles permettent de stocker des informations sensibles (comme des clés API ou des mots de passe) en dehors du code source, réduisant ainsi les risques de fuites de données.
- **Flexibilité :** Elles facilitent la configuration du site pour différents environnements (développement, test, production) sans modifier le code.
- **Déploiement simplifié :** Elles permettent de déployer la même base de code dans différents environnements en changeant simplement les variables d'environnement.

Le système de gestion qui est devenu le plus utilisé dans le développement web est le fichier .ENV

## Sécurité de l’application et maintenabilité

- On ne doit pas mettre de token, password, etc.. dans le code en dur.
    - Pour la sécurité
    - pour la maintenance et la centralisation

*Exemple récent avec le rabbit boîtier IA et son leak de token en dur qui se trouvait dans la code base.* https://www.theverge.com/2024/6/26/24186614/rabbit-r1-security-flaw-api-key-codebase

### Attention à GIT

Dans le cas où un token (pour test) se retrouve dans le code envoyé sur GIT, attention à l’historique https://algerwrites.medium.com/how-to-remove-env-from-git-commit-history-1d594917b376

## Les inconvénients du .ENV

On partage en équipe les éléments confidentiels et ça se retrouve sur la machine du dev.

C’est aussi une bonne pratique pour le reste : accès ftp, hébergement, etc…

- Gestionnaire de password ( Dashlane / Bitwarden / ProtonPass / 1Password )
    - https://www.dashlane.com/fr
    - https://bitwarden.com/fr-fr/
    - https://proton.me/fr/pass
    - https://1password.com/

### Les externes

Il n’est pas rare d’avoir des personnes externes dans des équipes : stage, freelance, etc..

On se retrouve à partager des accès et tokens avec ces personnes.

Heureusement, c’est souvent des éléments de dev. Mais parfois il y a des licences spécifiques payées par l’entreprise.

### Les frameworks Hybrides :

Pour un framework back, pas de problème. Les variables par défaut ne son jamais affiché en front.

Par contre pour les FW comme NextJS, NuxtJS, etc.. Le code est partagé entre le SSR et le Front.

NextJS impose `NEXT_PUBLIC_` pour rendre une variable disponible en "public"

NuxtJS donne la possibilité d’utiliser `NUXT_PUBLIC_` pour placer une variable dans `runtimeConfig.public`

### Bonne pratique pour les accès SSH

- clé SSH
- PassKey
- YubiKey → https://blog.maxds.fr/ssh-with-yubikey/


## Les secrets managers

### Les solutions pour stocker à part les variables d’environnements

- [https://www.doppler.com](https://www.doppler.com/pricing) $
- https://www.hashicorp.com/products/vault $$$$$
- https://infisical.com/ $ + OS ❤️❤️❤️
- https://www.dotenv.org/ VSCode  ❤️
- https://getsops.io/ OS
- [https://github.com/envault/envault](https://github.com/envault/envault?tab=readme-ov-file) self-hosted

### Natif dans les fournisseurs de cloud

- AWS Secret Manager
- GCP Secret Manager
- Azure Key Vault

### Article et vidéo  :

- https://medium.com/@tony.infisical/its-time-to-deprecate-the-env-file-for-a-better-stack-a519ac89bab0
- Yoann Dev sur Infisical https://youtu.be/EyDWgo2eXuU?feature=shared

Bonne écoute !

::authors
::

::Sponsor
---
withList: false
---
::
