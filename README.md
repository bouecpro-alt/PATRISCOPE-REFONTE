# PATRISCOPE — Site SaaS B2B (statique, premium)

Site vitrine orienté conversion pour PATRISCOPE, plateforme de gestion centralisée
des équipements, actifs, bâtiments, flotte, contrats, maintenances et conformité.

100 % statique : **aucune installation, aucun build**. HTML + CSS + JavaScript natif.

## Lancer le site

**Le plus simple :** double-cliquez sur `index.html` → il s'ouvre dans votre navigateur.

**Recommandé (mini-serveur local, rendu identique au web)** depuis ce dossier :

```bash
python3 -m http.server 4321
```

Puis ouvrez http://localhost:4321

> Astuce : après avoir modifié `css/styles.css` ou `js/*.js`, faites un
> rechargement forcé (Cmd + Maj + R) pour ignorer le cache du navigateur.

## Mettre en ligne (gratuit)

- **Netlify** : glissez-déposez ce dossier sur https://app.netlify.com/drop
- **GitHub Pages** : poussez le dossier dans un dépôt, activez Pages.
- **Vercel** : importez le dossier (preset « Other »).

## Structure

```
PATRISCOPE/
├── index.html                      Accueil (hero + dashboard, modules, pricing, FAQ…)
├── solutions.html                  8 solutions + enjeux
├── tarifs.html                     3 offres + toggle mensuel/annuel + comparatif
├── ressources.html                 Blog/études/guides (filtres + recherche)
├── faq.html                        8 questions (+ schema FAQPage)
├── a-propos.html                   Mission, histoire, valeurs, équipe
├── contact.html                    Formulaire de démo complet (RGPD)
├── fonctionnalites/                10 pages détaillées (1 par module)
│   ├── gestion-equipements.html    (page modèle, onglets cas d'usage)
│   └── …
├── css/styles.css                  Design system complet (charte PATRISCOPE)
├── js/partials.js                  Navbar + méga-menus + menu mobile + footer (1 seul endroit !)
├── js/main.js                      Animations, compteurs, FAQ, onglets, pricing, formulaires
└── assets/logo.svg                 Logo / favicon
```

## Où modifier quoi

- **Couleurs, typo, ombres, arrondis** → variables en haut de `css/styles.css` (`:root`).
- **Liens du menu et du footer** → tableaux `FEATURES`, `SOLUTIONS`, `RESOURCES` dans `js/partials.js`.
- **Articles ressources / cartes solutions** → tableaux `RES` / `SOL` en bas de `ressources.html` / `solutions.html`.
- **Textes des pages** → directement dans le `.html` concerné.

## Bon à savoir

- Les formulaires sont **simulés** (état succès factice). Pour recevoir réellement
  les demandes, branchez un service comme Formspree, Netlify Forms ou une API.
- Les visuels « secteurs » sont des dégradés (aucune image externe = site rapide).
  Pour utiliser de vraies photos, déposez-les dans `assets/img/` et remplacez les
  classes `media-*` par une image de fond.
- Polices : **Inter** via Google Fonts. Accessibilité et `prefers-reduced-motion` respectés.
