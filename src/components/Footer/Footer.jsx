import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import "./Footer.css";
import { useEffect, useState } from "react";
import WhatsAppQRModal from "../Contact/WhatsAppQRModal";

const CONTACT_INFO = {
  label: "Contacto",
  email: "blacfjba3@gmail.com",
  gmailUrl: "https://mail.google.com/mail/?view=cm&fs=1&to=blacfjba3@gmail.com",
  phone: "5570713137",
  message: "Hola, me gustaría cotizar un proyecto.",
};

const INSTAGRAM_LINK = {
  href: "https://www.instagram.com/prod.bypixitas_/",
  path: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm5.25-.75a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5Z",
};

const SECTION_NAVIGATION = {
  label: "Navegación",
  ariaLabel: "Navegación del sitio",
  items: [
    { label: "Servicios", id: "servicios" },
    { label: "Portafolio", id: "portafolio" },
    { label: "Proceso", id: "proceso" },
    { label: "Por qué elegirnos", id: "nuvem-principles-title" },
    { label: "FAQ", id: "faq" },
    { label: "Contacto", id: "contacto" },
  ],
};

const LEGAL_NAVIGATION = {
  label: "About",
  ariaLabel: "Enlaces legales",
  items: [
    { label: "Quiénes somos", to: "/quienes-somos" },
    { label: "Cómo trabajamos", to: "/como-trabajamos" },
    { label: "Términos y condiciones", to: "/terminos" },
    { label: "Aviso de privacidad", to: "/privacidad" },
  ],
};

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openQR, setOpenQR] = useState(false);

  // ✅ acordeón SOLO en responsive (<=1024)
  const [isAccMode, setIsAccMode] = useState(false);
  const [openAcc, setOpenAcc] = useState(null); // "contacto" | "nav" | "about" | null
  const toggleAcc = (key) => setOpenAcc((prev) => (prev === key ? null : key));

  const renderContactAccess = () => (
    <div className="footer__contactIcons" aria-label="Opciones de contacto">
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="footer__contactIcon footer__contactIcon--email"
        aria-label="Enviar correo a Nuvem"
        title="Correo"
        onClick={() => {
          setTimeout(() => {
            window.open(CONTACT_INFO.gmailUrl, "_blank", "noopener,noreferrer");
          }, 300);
        }}
      >
        <Mail aria-hidden="true" strokeWidth={1.7} />
      </a>

      <button
        className="footer__contactIcon footer__contactIcon--wa"
        type="button"
        aria-label="Contactar a Nuvem por WhatsApp"
        title="WhatsApp"
        onClick={() => setOpenQR(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.89 9.89m8.41-18.3A11.82 11.82 0 0 0 12.06 0C5.51 0 .18 5.33.18 11.88c0 2.09.55 4.13 1.6 5.92L.08 24l6.35-1.67a11.87 11.87 0 0 0 5.62 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.16-3.48-8.4"
          />
        </svg>
      </button>

      <a
        className="footer__contactIcon footer__contactIcon--ig"
        href={INSTAGRAM_LINK.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Visitar Instagram de Nuvem"
        title="Instagram"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d={INSTAGRAM_LINK.path} />
        </svg>
      </a>
    </div>
  );

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
          <h3 className="footer__brandTitle">¿Qué es Nuvem?</h3>

          <p className="footer__desc">
            Estudio de desarrollo digital enfocado en crear sitios
            profesionales, aplicaciones y soluciones a medida.
          </p>

          {/* CONTACTO — Desktop normal */}
          {!isAccMode && (
            <>
              <h3 className="footer__brandTitle">{CONTACT_INFO.label}</h3>

              {renderContactAccess()}
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
                <span>{CONTACT_INFO.label}</span>
                <span className="footer__accChevron" aria-hidden="true" />
              </button>

              <div className={`footer__accPanel ${openAcc === "contacto" ? "is-open" : ""}`}>
                <div className="footer__accInner">
                  {renderContactAccess()}
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
              <h3 className="footer__brandTitle">{SECTION_NAVIGATION.label}</h3>

              <nav className="footer__nav" aria-label={SECTION_NAVIGATION.ariaLabel}>
                {SECTION_NAVIGATION.items.map((item) => (
                  <button
                    className="btn-text footer__link"
                    type="button"
                    key={item.id}
                    onClick={() => goToSection(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
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
                <span>{SECTION_NAVIGATION.label}</span>
                <span className="footer__accChevron" aria-hidden="true" />
              </button>

              <div className={`footer__accPanel ${openAcc === "nav" ? "is-open" : ""}`}>
                <div className="footer__accInner">
                  <nav className="footer__nav" aria-label={SECTION_NAVIGATION.ariaLabel}>
                    {SECTION_NAVIGATION.items.map((item) => (
                      <button
                        className="btn-text footer__link"
                        type="button"
                        key={item.id}
                        onClick={() => goToSection(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
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
              <h3 className="footer__brandTitle">{LEGAL_NAVIGATION.label}</h3>

              <nav className="footer__nav" aria-label={LEGAL_NAVIGATION.ariaLabel}>
                {LEGAL_NAVIGATION.items.map((item) => (
                  <Link className="btn-text footer__link" to={item.to} key={item.to}>
                    {item.label}
                  </Link>
                ))}
              </nav>

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
                <span>{LEGAL_NAVIGATION.label}</span>
                <span className="footer__accChevron" aria-hidden="true" />
              </button>

              <div className={`footer__accPanel ${openAcc === "about" ? "is-open" : ""}`}>
                <div className="footer__accInner">
                  <nav className="footer__nav" aria-label={LEGAL_NAVIGATION.ariaLabel}>
                    {LEGAL_NAVIGATION.items.map((item) => (
                      <Link className="btn-text footer__link" to={item.to} key={item.to}>
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="footer__copyright">
        © {new Date().getFullYear()} Nuvem. Todos los derechos reservados.
      </div>

      <WhatsAppQRModal
        open={openQR}
        onClose={() => setOpenQR(false)}
        phone={CONTACT_INFO.phone}
        message={CONTACT_INFO.message}
      />
    </footer>
  );
}
