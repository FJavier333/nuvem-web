import "./Hero.css";
import heroVideo from "../../assets/herofinal1.mp4";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <video
          className="hero__video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </section>
  );
}