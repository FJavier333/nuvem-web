import { useEffect, useRef, useState } from "react";
import { X as XIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoNuvem from "../../images/logoWorld5.png";
import "./Header.css";
import WhatsAppQRModal from "../../components/Contact/WhatsAppQRModal";

const NAVIGATION = {
  sections: {
    label: "Secciones",
    items: [
      { label: "Servicios", href: "/#servicios" },
      { label: "Portafolio", href: "/#portafolio" },
      { label: "Proceso", href: "/#proceso" },
      { label: "Por qué elegirnos", href: "/#nuvem-principles-title" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
  about: {
    label: "Acerca",
    items: [
      { label: "¿Quiénes somos?", to: "/quienes-somos" },
      { label: "Como trabajamos", to: "/como-trabajamos" },
    ],
  },
  legal: {
    label: "Legal",
    items: [
      { label: "Terminos y condiciones", to: "/terminos" },
      { label: "Aviso de privacidad", to: "/privacidad" },
    ],
  },
};

export default function Header() {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(null); // "secciones" | "paginas" | "legal" | null
  const [scrolled, setScrolled] = useState(false);
  const [openWa, setOpenWa] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileNavRef = useRef(null);
  const scrollerRef = useRef(null);

  // ✅ Anti-parpadeo (close con delay, open cancela)
  const closeTimerRef = useRef(null);

  const open = (key) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu(key);
  };

  const close = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 180);
  };

  const toggleMenu = (key) => {
    // si hay un cierre pendiente, lo cancelamos
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const handleMobileSectionClick = (event, href) => {
    setMobileOpen(false);

    const isMobileMenu = window.matchMedia("(max-width: 640px)").matches;
    if (pathname !== "/" || !isMobileMenu) return;

    const targetUrl = new URL(href, window.location.origin);
    const targetId = decodeURIComponent(targetUrl.hash.slice(1));
    const anchorTarget = document.getElementById(targetId);
    const scrollTarget = anchorTarget?.matches("h2")
      ? anchorTarget
      : anchorTarget?.querySelector("h2");

    if (!scrollTarget) return;

    event.preventDefault();
    scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(
      window.history.state,
      "",
      `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`,
    );
  };

  // Cerrar menús al click fuera / ESC
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Header sólido al hacer scroll (infalible: detecta el scroller real por intención wheel/touch)
  useEffect(() => {
    const isScrollable = (el) => {
      if (!el) return false;
      const cs = getComputedStyle(el);
      const oy = cs.overflowY;
      return (oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 2;
    };

    const findScrollParent = (start) => {
      let el = start;
      while (el && el !== document.documentElement) {
        if (isScrollable(el)) return el;
        el = el.parentElement;
      }
      return document.scrollingElement || document.documentElement;
    };

    const update = () => {
      const y = scroller?.scrollTop ?? 0;
      setScrolled(y > 8);
    };

    const onScroll = () => update();

    let scroller = document.scrollingElement || document.documentElement;
    scrollerRef.current = scroller;

    const bindTo = (next) => {
      if (!next || next === scroller) return;
      scroller?.removeEventListener?.("scroll", onScroll);
      scroller = next;
      scroller.addEventListener("scroll", onScroll, { passive: true });
      scrollerRef.current = scroller; // ✅
      update();
    };

    // 1) bind inicial
    scroller.addEventListener("scroll", onScroll, { passive: true });
    update();

    // 2) cuando haces wheel/touch, detecta el contenedor que realmente scxdxdrollea
    const onIntent = (e) => {
      const candidate = findScrollParent(e.target);
      bindTo(candidate);
    };

    window.addEventListener("wheel", onIntent, { passive: true, capture: true });
    window.addEventListener("touchmove", onIntent, { passive: true, capture: true });

    return () => {
      scroller?.removeEventListener?.("scroll", onScroll);
      window.removeEventListener("wheel", onIntent, true);
      window.removeEventListener("touchmove", onIntent, true);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen || !mobileNavRef.current) return;

    const viewport = window.visualViewport;
    const mobileNav = mobileNavRef.current;

    const syncMobileViewport = () => {
      mobileNav.style.setProperty(
        "--mobile-nav-height",
        `${viewport?.height ?? window.innerHeight}px`,
      );
      mobileNav.style.setProperty(
        "--mobile-nav-top",
        `${viewport?.offsetTop ?? 0}px`,
      );
    };

    syncMobileViewport();
    viewport?.addEventListener("resize", syncMobileViewport);
    viewport?.addEventListener("scroll", syncMobileViewport);
    window.addEventListener("resize", syncMobileViewport);

    return () => {
      viewport?.removeEventListener("resize", syncMobileViewport);
      viewport?.removeEventListener("scroll", syncMobileViewport);
      window.removeEventListener("resize", syncMobileViewport);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`header section--dark ${scrolled ? "header--solid" : "header--transparent"}`}
      ref={headerRef}
    >
      <div className="container header__inner">
        <Link
          className="header__brand"
          to="/"
          aria-label="Nuvem"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();

              const el = scrollerRef.current;

              // 1) scroller real (si existe)
              if (el && typeof el.scrollTo === "function") {
                el.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }

              // 2) fallback window (por si acaso)
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
          }}
        >
          <img className="header__logoImg" src={logoNuvem} alt="Nuvem" title="Home" />
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {/* Secciones */}
          <div
            className={`menu ${openMenu === "secciones" ? "menu--open" : ""}`}
            onMouseEnter={() => open("secciones")}
            onMouseLeave={close}
          >
            <button
              className="menu__trigger"
              type="button"
              aria-expanded={openMenu === "secciones"}
              onClick={() => toggleMenu("secciones")}
            >
              {NAVIGATION.sections.label} <span className="menu__chev" aria-hidden="true"></span>
            </button>

            <div
              className="menu__panel"
              role="menu"
              onMouseEnter={() => open("secciones")}
              onMouseLeave={close}
            >
              {NAVIGATION.sections.items.map((item) => (
                <a
                  className="menu__item"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpenMenu(null)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Páginas */}
          <div
            className={`menu ${openMenu === "paginas" ? "menu--open" : ""}`}
            onMouseEnter={() => open("paginas")}
            onMouseLeave={close}
          >
            <button
              className="menu__trigger"
              type="button"
              aria-expanded={openMenu === "paginas"}
              onClick={() => toggleMenu("paginas")}
            >
              {NAVIGATION.about.label} <span className="menu__chev" aria-hidden="true"></span>
            </button>

            <div
              className="menu__panel"
              role="menu"
              onMouseEnter={() => open("paginas")}
              onMouseLeave={close}
            >
              {NAVIGATION.about.items.map((item) => (
                <Link
                  className="menu__item"
                  to={item.to}
                  key={item.to}
                  onClick={() => setOpenMenu(null)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div
            className={`menu ${openMenu === "legal" ? "menu--open" : ""}`}
            onMouseEnter={() => open("legal")}
            onMouseLeave={close}
          >
            <button
              className="menu__trigger"
              type="button"
              aria-expanded={openMenu === "legal"}
              onClick={() => toggleMenu("legal")}
            >
              {NAVIGATION.legal.label} <span className="menu__chev" aria-hidden="true"></span>
            </button>

            <div
              className="menu__panel"
              role="menu"
              onMouseEnter={() => open("legal")}
              onMouseLeave={close}
            >
              {NAVIGATION.legal.items.map((item) => (
                <Link
                  className="menu__item"
                  to={item.to}
                  key={item.to}
                  onClick={() => setOpenMenu(null)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="btnCotiza"
            onClick={() => setOpenWa(true)}
          >
            Cotizar
          </button>

          <button
            type="button"
            className="header__burger"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className="header__burgerLines" aria-hidden="true"></span>
          </button>
        </div>
      </div>
 
      <div
        className={`mobileNav ${mobileOpen ? "mobileNav--open" : ""}`}
        aria-hidden={!mobileOpen}
        ref={mobileNavRef}
      >
        <div className="mobileNav__panel" role="dialog" aria-label="Menú">
          <div className="mobileNav__top">
            <span className="mobileNav__title">Menú</span>

            <button
              type="button"
              className="mobileNav__close"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
            >
              <XIcon aria-hidden="true" strokeWidth={2.5} />
            </button>
          </div>

          <div className="mobileNav__section">
            <div className="mobileNav__label">{NAVIGATION.sections.label}</div>
            {NAVIGATION.sections.items.map((item) => (
              <a
                className="mobileNav__link"
                href={item.href}
                key={item.href}
                onClick={(event) => handleMobileSectionClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mobileNav__section">
            <div className="mobileNav__label">{NAVIGATION.about.label}</div>
            {NAVIGATION.about.items.map((item) => (
              <Link
                className="mobileNav__link"
                to={item.to}
                key={item.to}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mobileNav__section">
            <div className="mobileNav__label">{NAVIGATION.legal.label}</div>
            {NAVIGATION.legal.items.map((item) => (
              <Link
                className="mobileNav__link"
                to={item.to}
                key={item.to}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mobileNav__cta">
            <button
              type="button"
              className="btnCotiza"
              onClick={() => {
                setMobileOpen(false);
                setOpenWa(true);
              }}
            >
              Cotizar
            </button>
          </div>
        </div>

        <button
          className="mobileNav__backdrop"
          aria-label="Cerrar menú"
          onClick={() => setMobileOpen(false)}
        />
      </div>

      <WhatsAppQRModal
        open={openWa}
        onClose={() => setOpenWa(false)}
        phone="525570713137"
        message="Hola, quiero una cotización en Nuvem."
      />
    </header>
  );
}
