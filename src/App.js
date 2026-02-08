import { useRef, useState, useEffect } from "react";
import Cover from "./components/Cover";
import Letter from "./components/Letter";
import Question from "./components/Question";
import Celebration from "./components/Celebration";
import "./App.css";

function App() {
  const [step, setStep] = useState("cover");

  const ambientRef = useRef(null);
  const loveRef = useRef(null);

  /* -----------------------------
     AUDIO CONTROL HELPERS
  ------------------------------ */
  const playAmbient = () => {
    const a = ambientRef.current;
    if (!a) return;
    a.volume = 0.35;
    a.loop = true;
    a.play().catch(() => {});
  };

  const stopAmbient = () => {
    const a = ambientRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  };

  const playLove = () => {
    const m = loveRef.current;
    if (!m) return;
    if (!m.paused) return; // already playing
    m.volume = 0.6;
    m.loop = true;
    m.play().catch(() => {});
  };

  /* -----------------------------
     STEP-BASED AUDIO LOGIC
  ------------------------------ */
  useEffect(() => {
    if (step === "cover") {
      playAmbient();
    } else {
      stopAmbient();
      playLove();
    }
  }, [step]);

  /* -----------------------------
     NAVIGATION
  ------------------------------ */
  const startExperience = () => {
    setStep("letter");
  };

  return (
    <div className="app">
      {/* AUDIO (GLOBAL, NEVER UNMOUNTED) */}
      <audio ref={ambientRef} preload="auto">
        <source
          src={`${process.env.PUBLIC_URL}/ambient.mp3`}
          type="audio/mp3"
        />
      </audio>

      <audio ref={loveRef} preload="auto">
        <source
          src={`${process.env.PUBLIC_URL}/love-music.mp3`}
          type="audio/mp3"
        />
      </audio>

      {/* SCREENS */}
      {step === "cover" && <Cover onOpen={startExperience} />}
      {step === "letter" && <Letter onNext={() => setStep("question")} />}
      {step === "question" && <Question onYes={() => setStep("celebration")} />}
      {step === "celebration" && (
        <Celebration onReplay={() => setStep("cover")} />
      )}
    </div>
  );
}

export default App;
