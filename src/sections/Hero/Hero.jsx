import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <video
          className="hero__video"
          src="https://jqfoelzu0sy400ry.public.blob.vercel-storage.com/herofinal1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="container hero__content">
        <p className="hero__eyebrow">Estudio digital · México</p>
        <h1 className="hero__title">Diseñamos sitios que hacen sentir <em>clara</em> una gran idea.</h1>
        <div className="hero__bottom">
          <p className="hero__copy">Estrategia, diseño y desarrollo web a medida para marcas que quieren crecer con una presencia digital honesta y memorable.</p>
          <a className="hero__link" href="#servicios">Descubrir Nuvem</a>
        </div>
      </div>
    </section>
  );
}
