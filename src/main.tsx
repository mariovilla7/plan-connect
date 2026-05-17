import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// ─── PostHog — lightweight, deferred init ─────────────────────────────────────
// Loaded only after the page is interactive and the browser is idle.
// Session replay, surveys, heatmaps and most autocapture are disabled to keep
// third-party JS impact on Lighthouse to a minimum.
function initPostHogDeferred() {
  const token = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN as
    | string
    | undefined;
  const apiHost = (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as
    | string
    | undefined) || "https://us.i.posthog.com";
  if (!token) return;

  const load = () => {
    import("posthog-js")
      .then(({ default: posthog }) => {
        posthog.init(token, {
          api_host: apiHost,
          // Lightweight tracking only
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: false,
          disable_session_recording: true,
          disable_surveys: true,
          enable_heatmaps: false,
          rageclick: false,
          capture_performance: false,
          advanced_disable_decide: true,
          advanced_disable_feature_flags: true,
          advanced_disable_feature_flags_on_first_load: true,
          persistence: "localStorage+cookie",
        });
      })
      .catch(() => {
        /* ignore — analytics must never break the app */
      });
  };

  const schedule = () => {
    const ric = (window as unknown as {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
    }).requestIdleCallback;
    if (ric) ric(load, { timeout: 4000 });
    else setTimeout(load, 2500);
  };

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}

initPostHogDeferred();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
