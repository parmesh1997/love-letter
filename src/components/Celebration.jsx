import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Celebration({ onReplay }) {
  const { width, height } = useWindowSize();
  const data = JSON.parse(localStorage.getItem("valentineResponse"));

  const [mounted, setMounted] = useState(false);
  const [confettiLevel, setConfettiLevel] = useState("low");

  useEffect(() => {
    // Trigger background animation
    setMounted(true);

    // Increase confetti after image moment
    const timer = setTimeout(() => {
      setConfettiLevel("full");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`screen center celebration celebration-bg ${
        mounted ? "celebrate-in" : ""
      }`}
    >
      <div className="celebration-overlay" />

      {/* Confetti control */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={confettiLevel === "low" ? 60 : 180}
        gravity={confettiLevel === "low" ? 0.15 : 0.3}
         colors={[
    "#ff4d6d",
    "#ff758f",
    "#f72585",
    "#b5179e",
    "#7209b7",
    "#ffd166",
    "#ffb703",
  ]}
      />

<h1 className="glow-title">She Said YES 💖🎉</h1>

<p className="glow-subtitle">
  Forever began on{" "}
  {new Date(data.timestamp).toLocaleString()}
</p>


      <button className="primary" onClick={onReplay}>
        Replay the Moment 🔁
      </button>
    </div>
  );
}
