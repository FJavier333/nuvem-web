import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Evita que el browser restaure scroll en navegación SPA
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Si viene con #ancla, respétala
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }

    // Asegura el scroll arriba después del render
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [pathname, hash]);

  return null;
}