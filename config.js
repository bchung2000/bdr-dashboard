/**
 * config.js — one setting controls the whole site.
 *
 * DEMO MODE (works today, no backend needed):
 *   Leave API as "" — accounts live in each visitor's browser, checkout is
 *   simulated, and the dashboard unlocks after sign-up. Perfect for sharing
 *   the experience and testing the flow.
 *
 * LIVE MODE (real subscriptions):
 *   After deploying server.js to Render (see SETUP-GUIDE.md), put your
 *   backend URL here, e.g. "https://bdr-api-xxxx.onrender.com"
 *   Accounts, payments, and the paywall then run through Stripe for real.
 */
const BDR_CONFIG = {
  API: ""  // ← empty = demo mode. Paste your Render URL here to go live.
};
