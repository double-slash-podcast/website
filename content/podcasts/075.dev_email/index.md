---
publicationDate: 29 Nov 2023
status: published
author: Double Slash
categories:
  - Technology
duration: 3822
episodeNumber: 75
episodeType: full
explicit: false
season: 1
dsSlug: DS_075_dev_email
title: Coder des emails
subtitle: Méthodes et outils
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1701157471/ART_75_email_mytqlw.png
description: 
videoLink : uc6vJ7ujlLE
links: []
---
## Coder des emails

## La problématique concernant le templating des emails

- Problème avec la multitude des clients mail (web et app)
- Code spécifique (merci outlook, Gmail)
- Contrainte d’utiliser du HTML des années 2000 à base de table pour avoir un rendu homogène.

## 2 types d’emails

- emails transactionnels :
    - confirmation de commande
    - creation de compte
    - …
- emails promotions et communication
    - newsletters

## Une multitude d’outil très complet.

Quelques exemples :

- BREVO (ex:sendinblue)
- MailJet
- MailCHIMP

Avantages : Prise en main facile pour des non-techs. Editeur d’emails à nase de WISIWIG

Inconvénients : Difficile à piloter depuis le CMS ou le service développé.

Solution bien adaptée pour la gestion des newsletters mais pas forcément pour du transactionnel.
Parfois compliqué d’automatiser ou de variabiliser.

## Allez plus loin que les plateformes d’emailing

### 1 - Créer des templates en mode no-code

- Achat de templates https://unlayer.com/templates
- Service de création de template en ligne : [https://stripo.email/](https://stripo.email/?fpr=stripo-ppc&fp_sid=18286717430)

### 2 - Créer des templates en mode dev

- En mode React style : MJML https://mjml.io/
- Bojler https://bojler.slicejack.com/
- Foundation Email https://get.foundation/emails.html
- En mode tailwind CSS https://maizzle.com/
- En react : https://react.email/
- En Vue : https://www.vuemail.net/

### 3 - Tester les emails en terme marketing

- Tester le design avec https://www.litmus.com/email-personalization/ai-powered-email-marketing

### 4 - Envoyer les emails

Via son propre serveur :

- NodeJS https://nodemailer.com/
- PHP https://github.com/PHPMailer/PHPMailer
- Symfony Mailer, Laravel Mail, etc…

**Via des plateformes dédiées à l’envoi d’email :**

- [RESEND](https://resend.com/)
- https://mailpace.com/
- https://aws.amazon.com/ses/ Le moins cher !!!!

      US / EU réglementation 

**Envoyer par paquet :**

- Pourquoi :
    - pas passer pour un spammer
    - Charge serveur
- Solutions:
    - queue (Laravel Mail, nodemailer + kue,…)
    - Les services d’envois proposent toujours cette option

### 5- Faire en sorte que les emails arrivent

- Attacher son nom de domaine
- Réglages DNS :  **MX**  - **SPF  ( éviter les spam )**
- Réglages Sécurité : **DKIM et DMARC**

Outil pratique : [https://www.mail-tester.com](https://www.mail-tester.com/?lang=fr)

Bonne écoute !

::authors
::

::Sponsor
---
withList: false
---
::
