import "./Hero.css";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const supportsIntersectionObserver =
      typeof IntersectionObserver === "function";
    let isHeroVisible = !supportsIntersectionObserver;

    const syncPlayback = () => {
      if (
        isHeroVisible &&
        document.visibilityState === "visible"
      ) {
        const playPromise = video.play();
        playPromise?.catch(() => {
          // El navegador puede rechazar autoplay incluso con el video muted.
        });
        return;
      }

      video.pause();
    };

    const handleVisibilityChange = () => {
      syncPlayback();
    };

    let observer;

    if (supportsIntersectionObserver) {
      const bounds = section.getBoundingClientRect();
      isHeroVisible =
        bounds.bottom > 0 &&
        bounds.top < window.innerHeight &&
        bounds.right > 0 &&
        bounds.left < window.innerWidth;
      syncPlayback();

      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isHeroVisible = Boolean(
            entry?.isIntersecting && entry.intersectionRatio > 0
          );
          syncPlayback();
        },
        { threshold: 0 }
      );

      observer.observe(section);
    } else {
      syncPlayback();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__media">
        <video
          ref={videoRef}
          className="hero__video"
          src="https://jqfoelzu0sy400ry.public.blob.vercel-storage.com/herofinal1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </section>
  );
}
