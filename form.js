// Laad & Opslag — aanvraagformulier
// Vervang XXXXXXXX door je eigen Formspree-code (formspree.io → New form)
var FORMSPREE_URL = "https://formspree.io/f/xrpedyel";

document.querySelectorAll("form.leadform").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var box = form.closest(".card");
    var err = form.querySelector(".formerror");
    var btn = form.querySelector("button");
    err.hidden = true;
    btn.disabled = true;
    btn.textContent = "Bezig met versturen…";
    fetch(FORMSPREE_URL, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    }).then(function (r) {
      if (!r.ok) throw new Error();
      box.querySelector(".formbox").hidden = true;
      box.querySelector(".done").hidden = false;
      if (window.gtag) gtag("event", "generate_lead");
    }).catch(function () {
      err.hidden = false;
      btn.disabled = false;
      btn.textContent = "Offerte aanvragen";
    });
  });
});
