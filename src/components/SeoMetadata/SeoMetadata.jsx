import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://nuvemdev.com";
const SOCIAL_IMAGE_URL = `${SITE_URL}/nuvem-og.png`;
const SOCIAL_IMAGE_ALT = "Nuvem — Desarrollo web y soluciones digitales";
const NOT_FOUND_METADATA = {
  title: "Página no encontrada | Nuvem",
  description: "La página que buscas no existe o ya no está disponible.",
};

const ROUTE_METADATA = {
  "/": {
    title: "Nuvem | Desarrollo web y soluciones digitales",
    description:
      "Diseñamos y desarrollamos sitios web, aplicaciones y soluciones digitales a medida para negocios y proyectos que buscan una base sólida para crecer.",
  },
  "/quienes-somos": {
    title: "Quiénes somos | Nuvem",
    description:
      "Conoce Nuvem, un estudio de desarrollo digital que crea soluciones a medida con criterio, estructura y una visión sólida de crecimiento.",
  },
  "/como-trabajamos": {
    title: "Cómo trabajamos | Nuvem",
    description:
      "Conoce el proceso de trabajo claro y personalizado con el que Nuvem define, diseña, desarrolla e implementa cada proyecto digital.",
  },
  "/politica": {
    title: "Cómo trabajamos | Nuvem",
    description:
      "Conoce el proceso de trabajo claro y personalizado con el que Nuvem define, diseña, desarrolla e implementa cada proyecto digital.",
    canonicalPath: "/como-trabajamos",
  },
  "/terminos": {
    title: "Términos y Condiciones | Nuvem",
    description:
      "Consulta los Términos y Condiciones que regulan la contratación y prestación de los servicios de desarrollo digital de Nuvem.",
  },
  "/privacidad": {
    title: "Aviso de Privacidad | Nuvem",
    description:
      "Consulta el Aviso de Privacidad de Nuvem y conoce cómo tratamos, protegemos y gestionamos los datos personales.",
  },
};

function setMetaContent(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setCanonicalUrl(url) {
  let canonical = document.head.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

function removeCanonicalUrl() {
  document.head.querySelector('link[rel="canonical"]')?.remove();
}

function removeMeta(attribute, key) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

export default function SeoMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const routeMetadata = ROUTE_METADATA[normalizedPath];
    const isNotFound = !routeMetadata;
    const metadata = routeMetadata ?? NOT_FOUND_METADATA;
    const canonicalPath = metadata.canonicalPath ?? normalizedPath;

    const canonicalUrl =
      canonicalPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;

    document.title = metadata.title;

    if (isNotFound) {
      removeCanonicalUrl();
      setMetaContent("name", "robots", "noindex, nofollow");
    } else {
      setCanonicalUrl(canonicalUrl);
      removeMeta("name", "robots");
    }

    setMetaContent("name", "description", metadata.description);

    setMetaContent("property", "og:locale", "es_MX");
    setMetaContent("property", "og:type", "website");
    setMetaContent("property", "og:site_name", "Nuvem");
    setMetaContent("property", "og:title", metadata.title);
    setMetaContent("property", "og:description", metadata.description);
    setMetaContent("property", "og:url", canonicalUrl);
    setMetaContent("property", "og:image", SOCIAL_IMAGE_URL);
    setMetaContent("property", "og:image:secure_url", SOCIAL_IMAGE_URL);
    setMetaContent("property", "og:image:type", "image/png");
    setMetaContent("property", "og:image:width", "1200");
    setMetaContent("property", "og:image:height", "630");
    setMetaContent("property", "og:image:alt", SOCIAL_IMAGE_ALT);

    setMetaContent("name", "twitter:card", "summary_large_image");
    setMetaContent("name", "twitter:title", metadata.title);
    setMetaContent("name", "twitter:description", metadata.description);
    setMetaContent("name", "twitter:image", SOCIAL_IMAGE_URL);
    setMetaContent("name", "twitter:image:alt", SOCIAL_IMAGE_ALT);
  }, [pathname]);

  return null;
}
