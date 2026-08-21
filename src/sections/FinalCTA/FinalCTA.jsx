import "./FinalCTA.css";
import { useEffect, useRef, useState } from "react";
import WhatsAppQRModal from "../../components/Contact/WhatsAppQRModal";
import useRevealCascade from "../../hooks/useRevealCascade";

const FINAL_CTA_VIDEO_SRC =
  "https://jqfoelzu0sy400ry.public.blob.vercel-storage.com/hero11.mp4";

export default function FinalCTA() {
  const supportsIntersectionObserver =
    typeof window !== "undefined" && "IntersectionObserver" in window;
  const [openQR, setOpenQR] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(
    !supportsIntersectionObserver
  );
  const [shouldPlayVideo, setShouldPlayVideo] = useState(
    !supportsIntersectionObserver
  );
  const sectionRef = useRevealCascade();
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !supportsIntersectionObserver) return undefined;

    const loadMargin = Math.round(window.innerHeight * 1.5);
    const playbackMargin = Math.round(window.innerHeight * 0.25);

    const loadObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries[0]?.isIntersecting) return;

        setShouldLoadVideo(true);
        observer.disconnect();
      },
      {
        rootMargin: `${loadMargin}px 0px`,
        threshold: 0,
      }
    );

    const playbackObserver = new IntersectionObserver(
      (entries) => {
        setShouldPlayVideo(Boolean(entries[0]?.isIntersecting));
      },
      {
        rootMargin: `${playbackMargin}px 0px`,
        threshold: 0,
      }
    );

    loadObserver.observe(section);
    playbackObserver.observe(section);

    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [sectionRef, supportsIntersectionObserver]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    if (!shouldPlayVideo) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    playPromise?.catch(() => {
      // El navegador puede posponer autoplay aunque el video esté muted.
    });
  }, [shouldLoadVideo, shouldPlayVideo]);

  return (
    <section
      ref={sectionRef}
      className="finalCta"
      aria-label="Final Call to Action"
    >
      <div className="finalCta__media">
        <video
          ref={videoRef}
          className="finalCta__video"
          src={shouldLoadVideo ? FINAL_CTA_VIDEO_SRC : undefined}
          autoPlay={shouldPlayVideo}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="finalCta__overlay" aria-hidden="true"></div>
      </div>

      <div className="container finalCta__content">
        <div className="finalCta__panel">
          <h2 className="finalCta__title" data-reveal>HABLEMOS DE TU PROYECTO</h2>

          <p className="finalCta__desc" data-reveal data-reveal-delay="1">
            Si buscas un sitio web profesional, bien estructurado y desarrollado con criterio,
            en Nuvem podemos ayudarte a construir una solución alineada a tus objetivos.
          </p>

          <div className="finalCta__actions" data-reveal data-reveal-delay="2">
            <button
              type="button"
              className="btn btn--white"
              onClick={() => setOpenQR(true)}
            >
              Cotizar
            </button>
          </div>
        </div>
      </div>

      <WhatsAppQRModal
        open={openQR}
        onClose={() => setOpenQR(false)}
        phone="5570713137"
        message="Hola, me gustaría cotizar un sitio web."
      />
    </section>
  );
}
