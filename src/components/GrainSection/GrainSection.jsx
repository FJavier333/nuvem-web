// src/components/GrainSection/GrainSection.jsx
import { createElement, useCallback } from "react";
import "./GrainSection.css";

const PAUSED_ATTRIBUTE = "data-grain-effects-paused";
const PAUSE_DELAY_MS = 500;
const VIEWPORT_MARGIN_MULTIPLIER = 2;

const sections = new Set();
const pauseTimers = new Map();

let sharedObserver = null;
let resizeFrame = null;
let listenersAttached = false;

function supportsIntersectionObserver() {
  return (
    typeof window !== "undefined" &&
    typeof window.IntersectionObserver === "function"
  );
}

function cancelPause(section) {
  const timer = pauseTimers.get(section);

  if (timer !== undefined) {
    window.clearTimeout(timer);
    pauseTimers.delete(section);
  }
}

function activateEffects(section) {
  cancelPause(section);
  section.removeAttribute(PAUSED_ATTRIBUTE);
}

function pauseEffectsLater(section) {
  if (pauseTimers.has(section)) return;

  const timer = window.setTimeout(() => {
    pauseTimers.delete(section);

    if (sections.has(section)) {
      section.setAttribute(PAUSED_ATTRIBUTE, "");
    }
  }, PAUSE_DELAY_MS);

  pauseTimers.set(section, timer);
}

function syncSection(section, margin) {
  const bounds = section.getBoundingClientRect();
  const isNearViewport =
    bounds.bottom >= -margin && bounds.top <= window.innerHeight + margin;

  if (isNearViewport) {
    activateEffects(section);
  } else {
    pauseEffectsLater(section);
  }
}

function rebuildObserver() {
  if (!supportsIntersectionObserver()) return;

  const margin = Math.ceil(
    window.innerHeight * VIEWPORT_MARGIN_MULTIPLIER
  );

  sharedObserver?.disconnect();
  sharedObserver = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateEffects(entry.target);
        } else {
          pauseEffectsLater(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: `${margin}px 0px ${margin}px 0px`,
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    syncSection(section, margin);
    sharedObserver.observe(section);
  });
}

function handleResize() {
  if (resizeFrame !== null) return;

  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = null;
    rebuildObserver();
  });
}

function handleVisibilityChange() {
  if (document.visibilityState === "visible") {
    rebuildObserver();
  }
}

function handleAnchorClick(event) {
  const anchor = event.target.closest?.("a[href]");

  if (!anchor) return;

  const url = new window.URL(anchor.href);

  if (
    url.origin !== window.location.origin ||
    url.pathname !== window.location.pathname ||
    !url.hash
  ) {
    return;
  }

  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  const section = target?.closest(".grainSection");

  if (section && sections.has(section)) {
    activateEffects(section);
  }
}

function attachGlobalListeners() {
  if (listenersAttached) return;

  window.addEventListener("resize", handleResize, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  document.addEventListener("click", handleAnchorClick, true);
  listenersAttached = true;
}

function detachGlobalListeners() {
  if (!listenersAttached) return;

  window.removeEventListener("resize", handleResize);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  document.removeEventListener("click", handleAnchorClick, true);
  listenersAttached = false;

  if (resizeFrame !== null) {
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = null;
  }
}

function registerSection(section) {
  if (!section) return undefined;

  sections.add(section);
  activateEffects(section);

  if (supportsIntersectionObserver()) {
    attachGlobalListeners();

    if (sharedObserver) {
      const margin = Math.ceil(
        window.innerHeight * VIEWPORT_MARGIN_MULTIPLIER
      );

      syncSection(section, margin);
      sharedObserver.observe(section);
    } else {
      rebuildObserver();
    }
  }

  return () => {
    cancelPause(section);
    sharedObserver?.unobserve(section);
    sections.delete(section);
    section.removeAttribute(PAUSED_ATTRIBUTE);

    if (sections.size === 0) {
      sharedObserver?.disconnect();
      sharedObserver = null;
      detachGlobalListeners();
    }
  };
}

export default function GrainSection({
  ambient,
  as: Component = "div",
  className = "",
  children,
  variant = "light",
}) {
  const sectionRef = useCallback((section) => registerSection(section), []);
  const ambientClass = ambient ? ` grainSection--ambient-${ambient}` : "";

  return createElement(
    Component,
    {
      ref: sectionRef,
      className: `grainSection grainSection--${variant}${ambientClass} ${className}`,
    },
    children
  );
}
