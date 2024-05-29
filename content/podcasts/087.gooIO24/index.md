---
publicationDate: 29 May 2024
status: published
author: Double Slash
categories:
  - Technology
duration: 4562
episodeNumber: 87
episodeType: full
explicit: false
season: 1
dsSlug: DS_087_gooIO24
title: Google I/O coté web développement
subtitle: Le nouveau CSS / HTML  dans les navigateurs
episodeArtwork: https://res.cloudinary.com/doubleslash/image/upload/v1716974875/episode/ART_87_emwadf.png
description: Un épisode spécial pour parler de la Google IO 2024 coté Web développement. Nous vous faisons un résumé des vidéos et nous faisons le point sur les nouveautés et le niveau d'implémentation dans les navigateurs Web. Avec nous, tenez vous à jour sur les nouvelles feature pour coder toujours mieux et propre !
videoLink : SZo8EnAEM4k
links: []
---
# Retour sur la Google IO coté web développement :

**Version des navigateurs au moment de l'enregistrement:**

- Chrome 125 was released on May 24, 2024
- Firefox 126 was released on May 14, 2024
- Safari 17.5 (released on May 13, 2024)


## Vidéo principalement sur le CSS

Lien de la vidéo : https://www.youtube.com/watch?v=_-6LgEjEyzE

## Animations

Implementation de plusieurs choses concernants les animations. Le souci c’est que pour le moment cela fonctionne principalement que dans chrome !

### Scroll driven animation :

Prise en charge : chrome 115, edge 115, firefox flag, safari No

- Devtools inspect scroll driven animation

Vidéo pour apprendre : https://www.youtube.com/playlist?list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn

### Self Document View transitions

Animation entre les routes

Prise en charge : chrome 111, edge 111, firefox No, safari STP

### View transitions classes 

Pour les micro interactions

Prise en charge :  chrome 125, edge 125, firefox No, safari No


### Cross Document View transitions

Prise en charge : chrome 126, edge 126, firefox No, safari No

## UI components

### Popover API

https://codepen.io/goodmotion/pen/jOoMYBN 

Prise en charge : chrome 114, edge 114, firefox 125, safari 17

### Anchor-positioned

[https://developer.chrome.com/blog/anchor-positioning-api](https://developer.chrome.com/blog/anchor-positioning-api#:~:text=An%20anchor%20is%20an%20element,Anchor%20elements%20and%20positioned%20elements)

https://anchor-tool.com/

Position par rapport à un élément (anchor-name, position-anchor)

Prise en charge :  chrome 125, edge 125, firefox No, safari No

### Stylable select

https://open-ui.org/components/selectlist/

Permet de styliser complètement un element ```<select>```

Prise en charge :  chrome flag, edge flag, firefox No, safari No

**Attention Experimental**

### Exclusive Accordion

Prise en charge :  chrome 120, edge 120, firefox No, safari 17.2

https://developer.chrome.com/docs/css-ui/exclusive-accordion

Groupe d’accordion avec affichage un à la fois

### field-sizing: content

Prise en charge :  chrome 123, edge 123, firefox No, safari No

TextArea qui prend la taille du contenu

### HR in select

Prise en charge :  chrome 119, edge 119, firefox 122, safari 17

### Align-content for block

Prise en charge :  chrome 120, edge 120, firefox 117, safari 17.2

### Light-dark()

Prise en charge :  chrome 123, edge 123, firefox 120, safari 17.5

## Vidéo sur le niveau d'implémentation dans les navigateurs web

Lien de la vidéo : https://www.youtube.com/watch?v=W8bokbLn1G8

### Container Query

Prise en charge :  chrome 105, edge 105, firefox 110, safari 16

### :has

Prise en charge :  chrome 105, edge 105, firefox 121, safari 15.4

### Subgrid

Prise en charge : chrome 117, edge 117, firefox 71, safari 16

### CSS nesting

Prise en charge : chrome 120, edge 120, firefox 117, safari 17.2

### Search element

```
<search>
  <label for="site-search">Search Site:</label>
  <input type="search" id="site-search" name="q">
  <button type="submit">Search</button>
</search>
```

Prise en charge : chrome 118, edge 118, firefox 118, safari 17

### Responsive vidéo

Prise en charge : chrome 120, edge 120, firefox 120, safari 3.1

### inert attribut

Prise en charge : chrome 102, edge 102, firefox 112, safari 15.5

### color-mix()

Prise en charge : chrome 111, edge 111, firefox 113, safari 16.2

# State of HTML

Lien des résultats : https://2023.stateofhtml.com/en-US/features/

1. Landmark : main, header, aside, …
2. tabindex : passer un élément focusable
3. Lazy loading attribut
4. src set et size attribut
5. Custom element https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
6. Dialog element **22% jamais entendu parler**
7. autocomplete attribut
8. Detail et summary **27% jamais entendu parler**
9. Resource Hints (preload, etc..) **29% jamais entendu parler**
10. FormData **32% jamais entendu parler**
11. Datalist **41% jamais entendu parler** https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
12. Popover API **53% jamais entendu parler** 
13. Search input attribut **60% jamais entendu parler**
14. File System API **62% jamais entendu parler**
15. Fetch priority attribut **64% jamais entendu parler**
16. controlslist attribut **66% jamais entendu parler**
17. Web Share API **67% jamais entendu parler**
18. Inert attribut **79% jamais entendu parler**
19. Badging API **87% jamais entendu parler**




Bonne écoute !

::authors
::

::Sponsor
---
withList: false
---
::
