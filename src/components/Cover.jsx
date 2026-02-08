import { useState } from "react";

export default function Cover({ onOpen }) {
  const [explode, setExplode] = useState(false);

  const handleClick = () => {
    if (explode) return; // prevent double clicks

    // 1️⃣ Trigger explosion
    setExplode(true);

    // 2️⃣ Navigate AFTER animation
    setTimeout(() => {
      onOpen();
    }, 900); // must match CSS duration
  };

  return (
    <div className="screen center">
      <div
        className={`heart-wrapper ${explode ? "explode" : ""}`}
        onClick={handleClick}
      >
        <div className="heart glow-heart">❤️</div>
      </div>

      <p className={`glow-hint ${explode ? "fade-out" : ""}`}>
        Tap my heart ❤️
      </p>
    </div>
  );
}
