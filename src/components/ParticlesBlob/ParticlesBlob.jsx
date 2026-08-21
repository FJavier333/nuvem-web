import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./ParticlesBlob.css";

const PRELOAD_MARGIN_MULTIPLIER = 0.5;
const MOUNT_THRESHOLD = 0.05;
const ACTIVE_THRESHOLD = 0.001;
const SCROLL_INTENT_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
]);

let particlesBlobScenePromise;

const loadParticlesBlobScene = () => {
  particlesBlobScenePromise ??= import("./ParticlesBlobScene");
  return particlesBlobScenePromise;
};

const LazyParticlesBlobScene = lazy(loadParticlesBlobScene);

export default function ParticlesBlob({
  className = "",
  variant = "light",
}) {
  const supportsIntersectionObserver =
    typeof window !== "undefined" && "IntersectionObserver" in window;
  const containerRef = useRef(null);
  const removeIntentListenersRef = useRef(null);
  const [isInViewport, setIsInViewport] = useState(
    !supportsIntersectionObserver
  );
  const [documentIsVisible, setDocumentIsVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible"
  );
  const [shouldMountScene, setShouldMountScene] = useState(
    !supportsIntersectionObserver
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !supportsIntersectionObserver) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInViewport(
          Boolean(
            entry?.isIntersecting &&
            entry.intersectionRatio >= ACTIVE_THRESHOLD
          )
        );
      },
      { threshold: [0, ACTIVE_THRESHOLD] }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [supportsIntersectionObserver]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const handleVisibilityChange = () => {
      setDocumentIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !supportsIntersectionObserver) return undefined;

    let preloadObserver;
    let hashFrame;
    let hashFrameAfterLayout;
    let intentArmed = false;
    const initialScrollY = window.scrollY;

    const removeIntentListeners = () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);

      if (removeIntentListenersRef.current === removeIntentListeners) {
        removeIntentListenersRef.current = null;
      }
    };

    removeIntentListenersRef.current = removeIntentListeners;

    const requestPreloadWhenNear = () => {
      const preloadMargin = Math.round(
        window.innerHeight * PRELOAD_MARGIN_MULTIPLIER
      );
      const bounds = container.getBoundingClientRect();
      const isNearViewport =
        bounds.bottom >= -preloadMargin &&
        bounds.top <= window.innerHeight + preloadMargin;

      if (isNearViewport) {
        loadParticlesBlobScene();
        return;
      }

      preloadObserver = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting) return;

          loadParticlesBlobScene();
          preloadObserver?.disconnect();
          preloadObserver = undefined;
        },
        {
          rootMargin: `${preloadMargin}px 0px`,
          threshold: 0,
        }
      );

      preloadObserver.observe(container);
    };

    function armPreload() {
      if (intentArmed) return;

      intentArmed = true;
      removeIntentListeners();
      requestPreloadWhenNear();
    }

    function handleWheel(event) {
      if (event.deltaX === 0 && event.deltaY === 0) return;
      armPreload();
    }

    function handleTouchStart() {
      armPreload();
    }

    function handleKeyDown(event) {
      const target = event.target;
      const targetIsEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target.tagName));

      if (
        targetIsEditable ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        !SCROLL_INTENT_KEYS.has(event.key)
      ) {
        return;
      }

      armPreload();
    }

    function handleScroll() {
      if (window.scrollY === initialScrollY) return;
      armPreload();
    }

    function handleHashChange() {
      armPreload();
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      hashFrame = window.requestAnimationFrame(() => {
        hashFrameAfterLayout = window.requestAnimationFrame(armPreload);
      });
    }

    return () => {
      removeIntentListeners();
      preloadObserver?.disconnect();

      if (hashFrame !== undefined) {
        window.cancelAnimationFrame(hashFrame);
      }
      if (hashFrameAfterLayout !== undefined) {
        window.cancelAnimationFrame(hashFrameAfterLayout);
      }
    };
  }, [supportsIntersectionObserver]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !supportsIntersectionObserver) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          !entry?.isIntersecting ||
          entry.intersectionRatio < MOUNT_THRESHOLD
        ) {
          return;
        }

        removeIntentListenersRef.current?.();
        loadParticlesBlobScene();
        setShouldMountScene(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px",
        threshold: [0, MOUNT_THRESHOLD],
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [supportsIntersectionObserver]);

  const isActive = isInViewport && documentIsVisible;

  return (
    <div ref={containerRef} className={`pblob ${className}`} aria-hidden="true">
      {shouldMountScene ? (
        <Suspense fallback={null}>
          <LazyParticlesBlobScene active={isActive} variant={variant} />
        </Suspense>
      ) : null}
    </div>
  );
}
