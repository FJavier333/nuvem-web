import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="notFound" aria-labelledby="not-found-title">
      <div className="notFound__content">
        <p className="notFound__code" aria-hidden="true">
          404
        </p>

        <h1 className="notFound__title" id="not-found-title">
          PÁGINA NO ENCONTRADA
        </h1>

        <p className="notFound__description">
          La página que buscas no existe o ya no está disponible.
        </p>

        <Link className="notFound__button" to="/">
          VOLVER AL INICIO
        </Link>
      </div>
    </main>
  );
}
