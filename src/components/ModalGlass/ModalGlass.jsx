import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./ModalGlass.css";

export default function ModalGlass({ open, title, onClose, children }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  // ESC + bloquear scroll + focus inicial
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);

    // lock scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus close
    window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // click fuera (overlay)
  const handleOverlayMouseDown = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  if (!open) return null;

  return createPortal(
    <div
      className="modalGlass"
      ref={overlayRef}
      onMouseDown={handleOverlayMouseDown}
      role="presentation"
    >
      <div
        className="modalGlass__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title || "Modal"}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="modalGlass__close"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>

        {title ? <h3 className="modalGlass__title">{title}</h3> : null}

        <div className="modalGlass__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}