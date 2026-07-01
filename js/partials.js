/* =============================================================
   PATRISCOPE — Partials partagés (navbar, méga-menus, footer)
   Injectés sur chaque page → un seul endroit à modifier.
   ============================================================= */
(function () {
  "use strict";

  // Préfixe relatif : les pages /fonctionnalites/ remontent d'un cran.
  var BASE = location.pathname.includes("/fonctionnalites/") ? "../" : "";

  /* ---------- Bibliothèque d'icônes (style Lucide, 24x24) ---------- */
  var P = {
    box:'<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    layers:'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    building:'<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    truck:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    wrench:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/>',
    shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/>',
    chart:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    qr:'<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
    bell:'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
    factory:'<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
    landmark:'<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    network:'<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    cpu:'<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    hat:'<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
    pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    home:'<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
    book:'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    cap:'<path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.84l8.57 3.9a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    video:'<path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.41V7.87a.5.5 0 0 0-.75-.43L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    buoy:'<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
    arrow:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    check:'<path d="M20 6 9 17l-5-5"/>',
    lock:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    twitter:'<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>'
  };

  function ico(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || "") + "</svg>";
  }
  window.PATRI_ICON = ico; // réutilisable dans les pages

  /* ---------- Données de navigation ---------- */
  var FEATURES = [
    ["box", "Gestion des équipements", "Inventaire centralisé et cycle de vie complet", "fonctionnalites/gestion-equipements.html"],
    ["layers", "Gestion des actifs", "Référentiel unique de tous vos actifs physiques", "fonctionnalites/gestion-actifs.html"],
    ["building", "Gestion des bâtiments", "Patrimoine bâti, occupation et maintenance", "fonctionnalites/gestion-batiments.html"],
    ["truck", "Gestion de flotte", "Véhicules, kilométrage, entretien et coûts", "fonctionnalites/gestion-flotte.html"],
    ["file", "Gestion des contrats", "Échéances, garanties et SLA sous contrôle", "fonctionnalites/gestion-contrats.html"],
    ["wrench", "Maintenance préventive", "Planifiez et anticipez chaque intervention", "fonctionnalites/maintenance-preventive.html"],
    ["shield", "Conformité réglementaire", "Contrôles, alertes et stockage des PV", "fonctionnalites/conformite-reglementaire.html"],
    ["chart", "Reporting & analyses", "Tableaux de bord et pilotage par la donnée", "fonctionnalites/reporting-analyses.html"],
    ["qr", "QR Code terrain", "Identifiez vos actifs en un scan", "fonctionnalites/qr-code-terrain.html"],
    ["bell", "Alertes & notifications", "Ne manquez plus aucune échéance critique", "fonctionnalites/alertes-notifications.html"]
  ];
  var SOLUTIONS = [
    ["factory", "Entreprises industrielles", "Lignes de production et engins critiques", "solutions.html#industrie"],
    ["landmark", "Collectivités", "Patrimoine public et conformité", "solutions.html#collectivites"],
    ["box", "ETI", "Croissance maîtrisée et multi-implantations", "solutions.html#eti"],
    ["network", "Organisations multi-sites", "Vision consolidée de tous vos sites", "solutions.html#multi-sites"],
    ["cpu", "Directions techniques", "Pilotage opérationnel centralisé", "solutions.html#directions-techniques"],
    ["hat", "Facility management", "Services généraux et interventions terrain", "solutions.html#facility"],
    ["pin", "Gestionnaires d'infrastructures", "Réseaux et équipements répartis", "solutions.html#infrastructures"],
    ["home", "Immobilier / patrimoine bâti", "Valorisation et suivi des bâtiments", "solutions.html#immobilier"]
  ];
  var RESOURCES = [
    ["book", "Blog", "Stratégies et bonnes pratiques", "ressources.html#blog"],
    ["file", "Études de cas", "Résultats clients concrets", "ressources.html#etudes"],
    ["layers", "Livres blancs", "Guides de référence approfondis", "ressources.html#livres-blancs"],
    ["video", "Webinaires", "Démonstrations et retours d'expérience", "ressources.html#webinaires"],
    ["cap", "Guides pratiques", "Méthodes pas à pas", "ressources.html#guides"],
    ["buoy", "Centre d'aide", "Documentation et support", "ressources.html#aide"]
  ];

  function megaItem(it) {
    return '<a class="mega__link" href="' + BASE + it[3] + '"><span class="mega__ico">' + ico(it[0]) +
      '</span><span class="mega__txt"><strong>' + it[1] + "</strong><span>" + it[2] + "</span></span></a>";
  }
  function megaFoot(title, sub, href, label) {
    return '<div class="mega__foot"><div><strong>' + title + "</strong><br><span>" + sub +
      '</span></div><a class="btn btn--primary btn--sm" href="' + BASE + href + '">' + label + ico("arrow") + "</a></div>";
  }

  /* ---------- Construction navbar ---------- */
  // Logo officiel PATRISCOPE : squircle rouge/bleu + capsule diagonale bleu profond.
  // uid = identifiant unique du clipPath (évite les doublons d'ID navbar/footer).
  function mkLogo(uid) {
    return '<a class="logo" href="' + BASE + 'index.html" aria-label="PATRISCOPE – accueil">' +
        '<img src="' + BASE + 'assets/img/logo.svg" alt="PATRISCOPE" class="logo-img">' +
        '</a>';
  }

  var navHTML =
    '<nav class="nav" id="nav" aria-label="Navigation principale"><div class="nav__inner">' +
      '<div class="nav__left">' + mkLogo('n') +
        '<ul class="nav__menu">' +
          '<li class="nav__item has-mega" data-mega="features"><button class="nav__link" aria-expanded="false" aria-haspopup="true">Fonctionnalités <span class="chev">' + ico("chevron") + '</span></button>' +
            '<div class="mega"><div class="mega__grid mega--2col">' + FEATURES.map(megaItem).join("") + "</div>" +
            megaFoot("Une plateforme, dix modules", "Tout votre écosystème opérationnel unifié.", "fonctionnalites/gestion-equipements.html", "Explorer") + "</div></li>" +
          '<li class="nav__item has-mega" data-mega="solutions"><button class="nav__link" aria-expanded="false" aria-haspopup="true">Solutions <span class="chev">' + ico("chevron") + '</span></button>' +
            '<div class="mega"><div class="mega__grid mega--2col">' + SOLUTIONS.map(megaItem).join("") + "</div>" +
            megaFoot("Adapté à votre organisation", "De la municipalité au groupe multi-sites.", "solutions.html", "Voir les solutions") + "</div></li>" +
          '<li class="nav__item has-mega" data-mega="resources"><button class="nav__link" aria-expanded="false" aria-haspopup="true">Ressources <span class="chev">' + ico("chevron") + '</span></button>' +
            '<div class="mega"><div class="mega__grid mega--1col">' + RESOURCES.map(megaItem).join("") + "</div></div></li>" +
          '<li class="nav__item"><a class="nav__link" href="' + BASE + 'tarifs.html">Tarifs</a></li>' +
          '<li class="nav__item"><a class="nav__link" href="' + BASE + 'faq.html">FAQ</a></li>' +
          '<li class="nav__item"><a class="nav__link" href="' + BASE + 'a-propos.html">À propos</a></li>' +
        "</ul></div>" +
      '<div class="nav__right">' +
        '<a class="btn btn--primary nav__cta" href="' + BASE + 'contact.html">Demander une démo' + ico("arrow") + "</a>" +
        '<button class="nav__burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mnav"><span></span><span></span><span></span></button>' +
      "</div>" +
    "</div></nav>";

  /* ---------- Drawer mobile ---------- */
  function mItems(arr) { return arr.map(function (it) {
    return '<a class="mnav__sub" href="' + BASE + it[3] + '"><span class="mega__ico">' + ico(it[0]) + "</span>" + it[1] + "</a>";
  }).join(""); }

  var mnavHTML =
    '<div class="mnav" id="mnav" aria-label="Menu mobile">' +
      '<div class="mnav__group"><button class="mnav__top" aria-expanded="false">Fonctionnalités <span class="chev">' + ico("chevron") + '</span></button><div class="mnav__panel">' + mItems(FEATURES) + "</div></div>" +
      '<div class="mnav__group"><button class="mnav__top" aria-expanded="false">Solutions <span class="chev">' + ico("chevron") + '</span></button><div class="mnav__panel">' + mItems(SOLUTIONS) + "</div></div>" +
      '<div class="mnav__group"><button class="mnav__top" aria-expanded="false">Ressources <span class="chev">' + ico("chevron") + '</span></button><div class="mnav__panel">' + mItems(RESOURCES) + "</div></div>" +
      '<div class="mnav__group"><a class="mnav__top" href="' + BASE + 'tarifs.html">Tarifs</a></div>' +
      '<div class="mnav__group"><a class="mnav__top" href="' + BASE + 'faq.html">FAQ</a></div>' +
      '<div class="mnav__group"><a class="mnav__top" href="' + BASE + 'a-propos.html">À propos</a></div>' +
      '<a class="btn btn--primary btn--lg btn--block mnav__cta" href="' + BASE + 'contact.html">Demander une démo' + ico("arrow") + "</a>" +
      '<div class="mnav__meta"><span>Déploiement rapide</span><span>Accompagnement expert</span><span>Données sécurisées</span></div>' +
    "</div>";

  /* ---------- Footer ---------- */
  function fcol(title, links) {
    return '<div class="footer__col"><h5>' + title + "</h5>" + links.map(function (l) {
      return '<a href="' + BASE + l[1] + '">' + l[0] + "</a>";
    }).join("") + "</div>";
  }
  var footHTML =
    '<footer class="footer"><div class="container">' +
      '<div class="footer__grid">' +
        '<div class="footer__brand">' + mkLogo('f') +
          "<p>La plateforme unifiée pour centraliser, surveiller et contrôler tous vos équipements et obligations.</p>" +
          '<div class="footer__social"><a href="#" aria-label="LinkedIn">' + ico("linkedin") + '</a><a href="#" aria-label="X / Twitter">' + ico("twitter") + "</a></div>" +
        "</div>" +
        fcol("Produit", [["Fonctionnalités", "fonctionnalites/gestion-equipements.html"], ["Modules", "fonctionnalites/gestion-actifs.html"], ["Sécurité", "fonctionnalites/conformite-reglementaire.html"], ["Mises à jour", "ressources.html#blog"]]) +
        fcol("Ressources", [["Blog", "ressources.html#blog"], ["Études de cas", "ressources.html#etudes"], ["Livres blancs", "ressources.html#livres-blancs"], ["Webinaires", "ressources.html#webinaires"]]) +
        fcol("Société", [["À propos", "a-propos.html"], ["Carrières", "a-propos.html#carrieres"], ["Contact", "contact.html"], ["Partenaires", "a-propos.html#partenaires"]]) +
        fcol("Légal", [["Politique de confidentialité", "contact.html#rgpd"], ["Conditions d'utilisation", "contact.html#rgpd"], ["Cookies", "contact.html#rgpd"], ["Paramètres des cookies", "contact.html#rgpd"]]) +
      "</div>" +
      '<div class="footer__bottom"><p>© 2026 PATRISCOPE. Tous droits réservés.</p>' +
        '<div class="footer__lang"><button>English</button><button class="active">Français</button></div>' +
      "</div>" +
    "</div></footer>";

  /* ---------- Injection ---------- */
  function inject() {
    var h = document.getElementById("site-header");
    if (h) h.outerHTML = navHTML;
    var f = document.getElementById("site-footer");
    if (f) f.outerHTML = footHTML;
    document.body.insertAdjacentHTML("beforeend", mnavHTML);

    // Sticky CTA mobile (sauf page contact)
    if (!location.pathname.includes("contact")) {
      document.body.insertAdjacentHTML("beforeend",
        '<div class="sticky-cta"><a class="btn btn--primary" href="' + BASE + 'contact.html">Demander une démo' + ico("arrow") + "</a></div>");
    }

    // Lien actif
    var path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__link").forEach(function (a) {
      if (a.getAttribute("href") && a.getAttribute("href").endsWith(path) && path !== "index.html") {
        a.style.color = "var(--blue)";
      }
    });

    document.dispatchEvent(new CustomEvent("partials:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else { inject(); }
})();
