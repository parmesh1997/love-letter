import { useEffect, useRef, useState } from "react";

export default function Cover({ onOpen }) {
  const pulseRef = useRef(null);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    let raf;

    const animate = () => {
      const analyser = window.__ambientAnalyser;

      if (analyser && pulseRef.current && !explode) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);

        // Low-frequency average (beat)
        const bass = data.slice(0, 10).reduce((a, b) => a + b, 0) / 10;

        // Subtle scale pulse
        const scale = 1 + Math.min(bass / 500, 0.06);

        pulseRef.current.style.transform = `scale(${scale})`;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [explode]);

  const handleClick = () => {
    setExplode(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div className="screen center">
      {/* OUTER WRAPPER = explosion */}
      <div
        className={`heart-wrapper ${explode ? "explode" : ""}`}
        onClick={handleClick}
      >
        {/* INNER HEART = pulse + glow */}
        <div ref={pulseRef} className="heart glow-heart">
          ❤️
        </div>
      </div>

      <p className="glow-hint">Tap my heart</p>
    </div>
  );
}
