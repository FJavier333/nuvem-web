import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
import { useEffect, useState } from "react";
import WhatsAppQRModal from "../Contact/WhatsAppQRModal";

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openQR, setOpenQR] = useState(false);

  // ✅ acordeón SOLO en responsive (<=1024)
  const [isAccMode, setIsAccMode] = useState(false);
  const [openAcc, setOpenAcc] = useState(null); // "contacto" | "nav" | "about" | null
  const toggleAcc = (key) => setOpenAcc((prev) => (prev === key ? null : key));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");

    const apply = () => {
      setIsAccMode(mq.matches);
      if (!mq.matches) setOpenAcc(null); // al volver a desktop, resetea acordeón
    };

    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  const goToSection = (id) => {
    if (pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTopSmart = (fromEl) => {
    const isScrollable = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      const oy = cs.overflowY;
      return (oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 2;
    };

    const findScrollParent = (start) => {
      let el = start?.parentElement;
      while (el && el !== document.documentElement) {
        if (isScrollable(el)) return el;
        el = el.parentElement;
      }
      return document.scrollingElement || document.documentElement;
    };

    const scroller = findScrollParent(fromEl);

    if (scroller && typeof scroller.scrollTo === "function") {
      scroller.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" aria-label="Footer">
      <div className="container footer__inner">
        {/* LEFT — Brand */}
        <div className="footer__brand">
          <h3 className="footer__brandTitle">Qué es Nuvem</h3>

          <p className="footer__desc">
            Nuvem es un estudio de desarrollo web enfocado en crear sitios
            profesionales, bien estructurados y pensados para crecer a largo
            plazo, sin plantillas ni soluciones express.
          </p>

          {/* CONTACTO — Desktop normal */}
          {!isAccMode && (
            <>
              <h3 className="footer__brandTitle">Contacto</h3>

              <p className="footer__desc">
                Correo:{" "}
                <a
                  href="mailto:blacfjba3@gmail.com"
                  className="footer__link-underline"
                  onClick={() => {
                    setTimeout(() => {
                      window.open(
                        "https://mail.google.com/mail/?view=cm&fs=1&to=blacfjba3@gmail.com",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }, 300);
                  }}
                >
                  blacfjba3@gmail.com
                </a>
                <br />
                Teléfono:{" "}
                <span
                  className="footer__link-underline"
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenQR(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setOpenQR(true);
                  }}
                >
                  55 7071 3137
                </span>
              </p>
            </>
          )}

          {/* CONTACTO — Responsive acordeón */}
          {isAccMode && (
            <>
              <button
                className="footer__accBtn footer__accBtn--first"
                type="button"
                aria-expanded={openAcc === "contacto"}
                onClick={() => toggleAcc("contacto")}
              >
                <span>Contacto</span>
                <span className="footer__accChevron" aria-hidden="true" />
              </button>

              <div className={`footer__accPanel ${openAcc === "contacto" ? "is-open" : ""}`}>
                <div className="footer__accInner">
                  <p className="footer__desc">
                    Correo:{" "}
                    <a
                      href="mailto:blacfjba3@gmail.com"
                      className="footer__link-underline"
                      onClick={() => {
                        setTimeout(() => {
                          window.open(
                            "https://mail.google.com/mail/?view=cm&fs=1&to=blacfjba3@gmail.com",
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }, 300);
                      }}
                    >
                      blacfjba3@gmail.com
                    </a>
                    <br />
                    Teléfono:{" "}
                    <span
                      className="footer__link-underline"
                      role="button"
                      tabIndex={0}
                      onClick={() => setOpenQR(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setOpenQR(true);
                      }}
                    >
                      55 7071 3137
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* MIDDLE — Navegación */}
        <div className="footer__mid">
          {/* Desktop normal */}
          {!isAccMode && (
            <>
              <h3 className="footer__brandTitle">Navegación</h3>

              <nav className="footer__nav" aria-label="Navegación del sitio">
                <button className="btn-text footer__link" type="button" onClick={() => goToSection("servicios")}>
                  Servicios
                </button>

                <button className="btn-text footer__link" type="button" onClick={() => goToSection("portafolio")}>
                  Portafolio
                </button>

                <button className="btn-text footer__link" type="button" onClick={() => goToSection("porque")}>
                  Garantía
                </button>

                <button className="btn-text footer__link" type="button" onClick={() => goToSection("faq")}>
                  FAQ
                </button>

                <button className="btn-text footer__link" type="button" onClick={() => goToSection("contacto")}>
                  Contacto
                </button>
              </nav>

              <button
                className="footer__toTop"
                type="button"
                aria-label="Volver al inicio"
                title="Volver al inicio"
                onClick={(e) => scrollToTopSmart(e.currentTarget)}
              >
                ▲
              </button>
            </>
          )}

          {/* Responsive acordeón */}
          {isAccMode && (
            <>
              <button
                className="footer__accBtn"
                type="button"
                aria-expanded={openAcc === "nav"}
                onClick={() => toggleAcc("nav")}
              >
                <span>Navegación</span>
                <span className="footer__accChevron" aria-hidden="true" />
              </button>

              <div className={`footer__accPanel ${openAcc === "nav" ? "is-open" : ""}`}>
                <div className="footer__accInner">
                  <nav className="footer__nav" aria-label="Navegación del sitio">
                    <button className="btn-text footer__link" type="button" onClick={() => goToSection("servicios")}>
                      Servicios
                    </button>

                    <button className="btn-text footer__link" type="button" onClick={() => goToSection("portafolio")}>
                      Portafolio
                    </button>

                    <button className="btn-text footer__link" type="button" onClick={() => goToSection("porque")}>
                      Garantía
                    </button>

                    <button className="btn-text footer__link" type="button" onClick={() => goToSection("faq")}>
                      FAQ
                    </button>

                    <button className="btn-text footer__link" type="button" onClick={() => goToSection("contacto")}>
                      Contacto
                    </button>
                  </nav>

                  <button
                    className="footer__toTop"
                    type="button"
                    aria-label="Volver al inicio"
                    title="Volver al inicio"
                    onClick={(e) => scrollToTopSmart(e.currentTarget)}
                  >
                    ▲
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT — Links + Social */}
        <div className="footer__right">
          {/* Desktop normal */}
          {!isAccMode && (
            <>
              <h3 className="footer__brandTitle">About</h3>

              <nav className="footer__nav" aria-label="Enlaces legales">
                <Link className="btn-text footer__link" to="/quienes-somos">
                  Quiénes somos
                </Link>
                <Link className="btn-text footer__link" to="/como-trabajamos">
                  Cómo trabajamos
                </Link>
                <Link className="btn-text footer__link" to="/terminos">
                  Términos y condiciones
                </Link>
                <Link className="btn-text footer__link" to="/privacidad">
                  Aviso de privacidad
                </Link>
                <Link className="btn-text footer__link" to="/politica">
                  Política oficial
                </Link>
              </nav>

              <div className="footer__social" aria-label="Redes sociales">
                <a
                  className="footer__icon footer__icon--ig"
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 
                      2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10a5 
                      5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm5.25-.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5Z"
                    />
                  </svg>
                </a>

                {/* WhatsApp icon comentado como lo tenías */}
              </div>
            </>
          )}

          {/* Responsive acordeón */}
          {isAccMode && (
            <>
              <button
                className="footer__accBtn"
                type="button"
                aria-expanded={openAcc === "about"}
                onClick={() => toggleAcc("about")}
              >
                <span>About</span>
                <span className="footer__accChevron" aria-hidden="true" />
              </button>

              <div className={`footer__accPanel ${openAcc === "about" ? "is-open" : ""}`}>
                <div className="footer__accInner">
                  <nav className="footer__nav" aria-label="Enlaces legales">
                    <Link className="btn-text footer__link" to="/quienes-somos">
                      Quiénes somos
                    </Link>
                    <Link className="btn-text footer__link" to="/como-trabajamos">
                      Cómo trabajamos
                    </Link>
                    <Link className="btn-text footer__link" to="/terminos">
                      Términos y condiciones
                    </Link>
                    <Link className="btn-text footer__link" to="/privacidad">
                      Aviso de privacidad
                    </Link>
                    <Link className="btn-text footer__link" to="/politica">
                      Política oficial
                    </Link>
                  </nav>

                  <div className="footer__social" aria-label="Redes sociales">
                    <a
                      className="footer__icon footer__icon--ig"
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Instagram"
                      title="Instagram"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 
                          2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10a5 
                          5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm5.25-.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5Z"
                        />
                      </svg>
                    </a>

                    {/* WhatsApp icon comentado como lo tenías */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="footer__copyright">
        © {new Date().getFullYear()} Nuvem. Todos los derechos reservados.
        <br />
        v1.0.0 · Enero 2026
      </div>

      <WhatsAppQRModal
        open={openQR}
        onClose={() => setOpenQR(false)}
        phone="5570713137"
        message="Hola, me gustaría cotizar un sitio web."
      />
    </footer>
  );
}