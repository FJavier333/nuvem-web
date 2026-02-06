import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./WhatsAppQRModal.css";

export default function WhatsAppQRModal({ open, onClose, phone, message }) {
  const panelRef = useRef(null);

  const encodedMessage = message ? encodeURIComponent(message) : "";
  const waUrl = `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;

  // ✅ Hooks siempre arriba
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // ✅ Render condicional DESPUÉS de hooks
  if (!open) return null;

  return createPortal(
    <div
      className="waSheet"
      role="dialog"
      aria-modal="true"
      aria-label="Contacto por WhatsApp"
      onMouseDown={(e) => {
        if (panelRef.current && !panelRef.current.contains(e.target)) {
          onClose?.();
        }
      }}
    >
      <div className="waSheet__panel" ref={panelRef}>
        <button
          type="button"
          className="waSheet__close"
          onClick={onClose}
          aria-label="Cerrar"
          title="Cerrar"
        >
          ✕
        </button>

        <div className="waSheet__qr">
          <QRCodeCanvas value={waUrl} size={240} />
        </div>

        <h3 className="waSheet__title">Escanea el código</h3>

        <p className="waSheet__desc">
          Escanea este código QR para contactarnos rápidamente vía WhatsApp y comentarnos acerca de tu proyecto.
        </p>

        <a
          className="btn-text btn-text--dark waSheet__link"
          href={waUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Ó clic para abrir chat
        </a>
      </div>
    </div>,
    document.body
  );
}