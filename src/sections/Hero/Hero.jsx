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
    </section>
  );
}