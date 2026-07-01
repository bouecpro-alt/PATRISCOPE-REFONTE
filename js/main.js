/* =============================================================
   PATRISCOPE — Interactions
   ============================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Révélation au scroll + compteurs ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = prefix + format(target, dec) + suffix; return; }
    var start = performance.now(), dur = 1400;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + format(target * eased, dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + format(target, dec) + suffix;
    }
    requestAnimationFrame(tick);
  }
  function format(n, dec) {
    var v = dec ? n.toFixed(dec) : Math.round(n);
    return Number(v).toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }

  var _io, _cio;
  function initObserver() {
    var items = document.querySelectorAll(".reveal:not(.in)");
    var counters = document.querySelectorAll("[data-count]:not([data-counted])");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      counters.forEach(function (el) { el.setAttribute("data-counted", "1"); animateCount(el); });
      return;
    }
    if (!_io) _io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); _io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { _io.observe(el); });

    if (!_cio) _cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); _cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { el.setAttribute("data-counted", "1"); _cio.observe(el); });
  }
  // Permet de réobserver des éléments .reveal injectés dynamiquement.
  window.PATRI_REVEAL = initObserver;

  /* ---------- FAQ ---------- */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        var parent = item.closest(".faq");
        if (parent) parent.querySelectorAll(".faq-item.open").forEach(function (o) {
          if (o !== item) { o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = null; o.querySelector(".faq-q").setAttribute("aria-expanded", "false"); }
        });
        item.classList.toggle("open", !open);
        q.setAttribute("aria-expanded", String(!open));
        a.style.maxHeight = open ? null : a.scrollHeight + "px";
      });
    });
  }

  /* ---------- Onglets ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (group) {
      var tabs = group.querySelectorAll(".tab");
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var target = tab.getAttribute("data-tab");
          tabs.forEach(function (t) { t.classList.toggle("active", t === tab); t.setAttribute("aria-selected", String(t === tab)); });
          group.querySelectorAll(".tab-panel").forEach(function (p) {
            p.classList.toggle("active", p.getAttribute("data-panel") === target);
          });
        });
      });
    });
  }

  /* ---------- Pricing toggle ---------- */
  function initPricing() {
    var t = document.querySelector(".price-toggle");
    if (!t) return;
    function apply() {
      var annual = t.classList.contains("annual");
      t.querySelectorAll("span").forEach(function (s) {
        s.classList.toggle("on", (s.dataset.period === "annual") === annual);
      });
      document.querySelectorAll(".pc-price .amt").forEach(function (a) {
        var val = annual ? a.getAttribute("data-annual") : a.getAttribute("data-monthly");
        if (val) a.textContent = val;
      });
    }
    t.addEventListener("click", function () { t.classList.toggle("annual"); apply(); });
    t.setAttribute("role", "button"); t.setAttribute("tabindex", "0");
    t.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t.classList.toggle("annual"); apply(); } });
    apply();
  }

  /* ---------- Formulaires ---------- */
  function initForms() {
    document.querySelectorAll("form[data-demo]").forEach(function (form) {
      var fields = form.querySelectorAll("[data-validate]");
      function validateField(input) {
        var wrap = input.closest(".field");
        var type = input.getAttribute("data-validate");
        var val = input.value.trim();
        var ok = true;
        if (input.hasAttribute("required") && !val) ok = false;
        if (ok && type === "email" && val) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (ok && type === "tel" && val) ok = /^[+0-9 ().-]{8,}$/.test(val);
        if (wrap) { wrap.classList.toggle("invalid", !ok && (input.hasAttribute("required") || val)); wrap.classList.toggle("valid", ok && !!val); }
        return ok;
      }
      fields.forEach(function (input) {
        input.addEventListener("blur", function () { validateField(input); });
        input.addEventListener("input", function () { if (input.closest(".field").classList.contains("invalid")) validateField(input); });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var hp = form.querySelector(".honeypot input");
        if (hp && hp.value) return; // bot
        var allOk = true;
        fields.forEach(function (input) { if (!validateField(input)) allOk = false; });
        var consent = form.querySelector('input[type="checkbox"][required]');
        if (consent && !consent.checked) { allOk = false; consent.closest(".checkbox").style.color = "var(--red)"; }
        // .form-alert / .form-success / .form-body sont hors du <form> : on cible le conteneur.
        var card = form.closest(".form-card") || form.parentNode;
        var alert = card.querySelector(".form-alert");
        if (!allOk) { if (alert) alert.classList.add("show"); return; }
        if (alert) alert.classList.remove("show");

        var btn = form.querySelector('button[type="submit"]');
        btn.classList.add("loading"); btn.disabled = true;
        setTimeout(function () {
          btn.classList.remove("loading"); btn.disabled = false;
          var success = card.querySelector(".form-success");
          var body = card.querySelector(".form-body");
          if (success && body) { body.style.display = "none"; success.classList.add("show"); }
          else { btn.querySelector(".btn-label").textContent = "Demande envoyée ✓"; }
        }, 1400);
      });
    });
  }

  /* ---------- Navbar + méga-menus + mobile (après injection) ---------- */
  function initNav() {
    var nav = document.getElementById("nav");
    function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 24); }
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    // Méga-menus
    var items = document.querySelectorAll(".nav__item.has-mega");
    var closeTimer;
    function closeAll(except) {
      items.forEach(function (it) {
        if (it !== except) { it.classList.remove("open"); var b = it.querySelector(".nav__link"); if (b) b.setAttribute("aria-expanded", "false"); }
      });
    }
    items.forEach(function (it) {
      var btn = it.querySelector(".nav__link");
      it.addEventListener("mouseenter", function () { clearTimeout(closeTimer); closeAll(it); it.classList.add("open"); btn.setAttribute("aria-expanded", "true"); });
      it.addEventListener("mouseleave", function () { closeTimer = setTimeout(function () { it.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }, 140); });
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var open = it.classList.contains("open");
        closeAll(); it.classList.toggle("open", !open); btn.setAttribute("aria-expanded", String(!open));
      });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".nav__item.has-mega")) closeAll(); });

    // Burger mobile
    var burger = document.getElementById("burger");
    var mnav = document.getElementById("mnav");
    if (burger && mnav) {
      burger.addEventListener("click", function () {
        var open = document.body.classList.toggle("menu-open");
        document.body.classList.toggle("no-scroll", open);
        burger.setAttribute("aria-expanded", String(open));
        burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      });
      mnav.querySelectorAll(".mnav__group > button.mnav__top").forEach(function (top) {
        top.addEventListener("click", function () {
          var g = top.parentElement;
          var open = g.classList.toggle("open");
          top.setAttribute("aria-expanded", String(open));
        });
      });
      mnav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { document.body.classList.remove("menu-open", "no-scroll"); burger.setAttribute("aria-expanded", "false"); });
      });
    }
  }

  /* ---------- Boot ---------- */
  function boot() { initObserver(); initFaq(); initTabs(); initPricing(); initForms(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  document.addEventListener("partials:ready", initNav);
})();
