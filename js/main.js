/* ===========================================================
   FADFADA — site behaviour
   =========================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     NEWSLETTER
     By default the signup opens a pre-filled email to the band
     so it works with zero setup. To connect a real list
     (Mailchimp, Buttondown, MailerLite…), paste your form's
     POST endpoint URL below and the form will submit to it.
     --------------------------------------------------------- */
  var NEWSLETTER_ENDPOINT = ""; // e.g. "https://buttondown.email/api/emails/embed-subscribe/…"
  var BAND_EMAIL = "contact@hansbilger.com";

  /* ---------------- Language ---------------- */
  var STRINGS = {
    signupOk: { en: "Thanks — check your email to confirm.", de: "Danke — bitte bestätige die E-Mail." },
    signupMail: { en: "Opening your email app to confirm…", de: "E-Mail-App wird geöffnet…" },
    signupBad: { en: "Please enter a valid email.", de: "Bitte eine gültige E-Mail eingeben." }
  };

  function currentLang() {
    return document.documentElement.getAttribute("lang") || "en";
  }

  function setLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    try { localStorage.setItem("fadfada-lang", lang); } catch (e) {}
    document.querySelectorAll(".langtoggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    // swap elements carrying data-en / data-de text attributes
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val !== null) el.textContent = val;
    });
    // placeholders
    document.querySelectorAll("[data-ph-en]").forEach(function (el) {
      var val = el.getAttribute("data-ph-" + lang);
      if (val !== null) el.setAttribute("placeholder", val);
    });
  }

  function initLang() {
    var saved;
    try { saved = localStorage.getItem("fadfada-lang"); } catch (e) {}
    var initial = saved || ((navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en");
    setLang(initial);
    document.querySelectorAll(".langtoggle button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.dataset.lang); });
    });
  }

  /* ---------------- Mobile drawer ---------------- */
  function initMenu() {
    var btn = document.querySelector(".menu-btn");
    var drawer = document.querySelector(".drawer");
    if (!btn || !drawer) return;
    function close() { drawer.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
    function toggle() {
      var open = drawer.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }
    btn.addEventListener("click", toggle);
    drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 900) close(); });
  }

  /* ---------------- Nav shadow on scroll ---------------- */
  function initNavShadow() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    function upd() { nav.classList.toggle("scrolled", window.scrollY > 8); }
    upd();
    window.addEventListener("scroll", upd, { passive: true });
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Newsletter ---------------- */
  function initSignup() {
    document.querySelectorAll("form.signup-form").forEach(function (form) {
      var input = form.querySelector('input[type="email"]');
      var msg = form.querySelector(".msg");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var email = (input.value || "").trim();
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        var lang = currentLang();
        if (!ok) { msg.textContent = STRINGS.signupBad[lang]; return; }
        if (NEWSLETTER_ENDPOINT) {
          // Real provider: submit in the background via a hidden iframe-less fetch (no-cors)
          fetch(NEWSLETTER_ENDPOINT, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "email=" + encodeURIComponent(email)
          }).finally(function () { msg.textContent = STRINGS.signupOk[lang]; form.reset(); });
        } else {
          // Zero-setup fallback: open a pre-filled mail to the band
          var subject = encodeURIComponent("Newsletter signup — Fadfada");
          var body = encodeURIComponent("Please add me to the Fadfada mailing list: " + email);
          window.location.href = "mailto:" + BAND_EMAIL + "?subject=" + subject + "&body=" + body;
          msg.textContent = STRINGS.signupMail[lang];
          form.reset();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLang();
    initMenu();
    initNavShadow();
    initReveal();
    initSignup();
  });
})();
