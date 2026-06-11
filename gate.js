/**
 * gate.js — protects app.html
 * Demo mode (config.js API == ""): checks the browser-stored session.
 * Live mode: verifies the JWT + subscription with the backend.
 */

(function gate() {
  const live = typeof BDR_CONFIG !== "undefined" && BDR_CONFIG.API;

  if (!live) {
    // ----- DEMO MODE -----
    const session = localStorage.getItem("bdr_demo_session");
    const subs = JSON.parse(localStorage.getItem("bdr_demo_subs") || "{}");
    if (!session) { window.location.replace("auth.html"); return; }
    if (subs[session] !== "active") { window.location.replace("index.html#pricing"); return; }
    window.BDR_USER = { email: session, subscription: "active", demo: true };
    document.dispatchEvent(new CustomEvent("bdr-user-ready"));
    return;
  }

  // ----- LIVE MODE -----
  const token = localStorage.getItem("bdr_token");
  if (!token) { window.location.replace("auth.html"); return; }
  fetch(BDR_CONFIG.API + "/api/me", { headers: { Authorization: "Bearer " + token } })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((me) => {
      if (me.subscription !== "active") { window.location.replace("index.html#pricing"); return; }
      window.BDR_USER = me;
      document.dispatchEvent(new CustomEvent("bdr-user-ready"));
    })
    .catch(() => {
      localStorage.removeItem("bdr_token");
      window.location.replace("auth.html");
    });
})();

function openBillingPortal() {
  const live = typeof BDR_CONFIG !== "undefined" && BDR_CONFIG.API;
  if (!live) { alert("Demo mode — in the live version this opens your Stripe billing portal."); return; }
  fetch(BDR_CONFIG.API + "/api/create-portal-session", {
    method: "POST",
    headers: { Authorization: "Bearer " + localStorage.getItem("bdr_token") },
  })
    .then((r) => r.json())
    .then((d) => { if (d.url) window.location.href = d.url; });
}

function bdrSignOut() {
  localStorage.removeItem("bdr_token");
  localStorage.removeItem("bdr_demo_session");
  window.location.href = "index.html";
}
