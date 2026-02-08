import { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Cover from "./components/Cover";
import Letter from "./components/Letter";
import Question from "./components/Question";
import Celebration from "./components/Celebration";
import Sparkles from "./components/Sparkles";
import "./App.css";

function App() {
  const [step, setStep] = useState("cover");

  const ambientRef = useRef(null);
  const musicRef = useRef(null);
  const nodeRef = useRef(null);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);

  const fadeVolume = (audioEl, target, speed = 0.02) => {
    const interval = setInterval(() => {
      if (!audioEl) return clearInterval(interval);

      if (Math.abs(audioEl.volume - target) < speed) {
        audioEl.volume = target;
        clearInterval(interval);
      } else {
        audioEl.volume += audioEl.volume < target ? speed : -speed;
      }
    }, 120);
  };

  const startExperience = async () => {
    /* -----------------------------
       AUDIO CONTEXT (MOBILE SAFE)
    ------------------------------ */
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();

      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      const source =
        audioCtxRef.current.createMediaElementSource(
          ambientRef.current
        );

      source.connect(analyserRef.current);
      analyserRef.current.connect(
        audioCtxRef.current.destination
      );

      window.__ambientAnalyser = analyserRef.current;
    }

    if (audioCtxRef.current.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    /* -----------------------------
       AMBIENT: START & FADE IN
    ------------------------------ */
    const ambient = ambientRef.current;
    ambient.volume = 0;
    await ambient.play();
    fadeVolume(ambient, 0.35);

    /* -----------------------------
       LOVE MUSIC: DELAYED START
       + AMBIENT FADE DOWN
    ------------------------------ */
    setTimeout(async () => {
      const music = musicRef.current;
      music.volume = 0;
      await music.play();
      fadeVolume(music, 0.6);

      // IMPORTANT: ambient steps back
      fadeVolume(ambient, 0.05);
    }, 2200);

    setStep("letter");
  };

  /* -----------------------------
     READING MODE: KEEP MUSIC SOFT
  ------------------------------ */
  useEffect(() => {
    const music = musicRef.current;
    if (!music) return;

    if (step === "letter") {
      fadeVolume(music, 0.25);
    } else if (step === "celebration") {
      fadeVolume(music, 0.65);
    }
  }, [step]);

  const renderStep = () => {
    if (step === "cover")
      return <Cover onOpen={startExperience} />;
    if (step === "letter")
      return <Letter onNext={() => setStep("question")} />;
    if (step === "question")
      return <Question onYes={() => setStep("celebration")} />;
    return <Celebration onReplay={() => setStep("cover")} />;
  };

  return (
    <div className="app paper-bg">
      {step === "letter" && <Sparkles />}

      <audio ref={ambientRef} loop preload="auto">
        <source src="/ambient.mp3" type="audio/mp3" />
      </audio>

      <audio ref={musicRef} loop preload="auto">
        <source src="/love-music.mp3" type="audio/mp3" />
      </audio>

      <SwitchTransition>
        <CSSTransition
          key={step}
          timeout={600}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <div ref={nodeRef} className="screen">
            {renderStep()}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

export default App;
