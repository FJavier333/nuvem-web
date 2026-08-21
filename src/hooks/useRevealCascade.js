import { useLayoutEffect, useRef } from "react";

const DEFAULT_SELECTOR = "[data-reveal]";

export default function useRevealCascade({
  selector = DEFAULT_SELECTOR,
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
} = {}) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const targets = Array.from(root.querySelectorAll(selector));
    if (!targets.length) return undefined;

    const showAll = () => {
      targets.forEach((target) => target.classList.add("is-visible"));
    };

    root.classList.add("reveal-cascade--ready");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      showAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin, threshold }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [rootMargin, selector, threshold]);

  return rootRef;
}
