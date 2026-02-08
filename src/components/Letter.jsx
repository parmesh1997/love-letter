import RevealSentence from "./RevealSentence";

export default function Letter({ onNext }) {
  return (
    <div className="screen center">
      <div className="letter-wrapper">
        <div className="letter-bg" />

        <div className="letter blur-container">
          <h1 className="heading-animate glow-letter-title">
            Happy Anniversary ❤️
          </h1>

          <RevealSentence>
            From the moment you entered my life, everything found its place.
          </RevealSentence>

          <RevealSentence delay={300} highlight>
            You are my calm, my strength, and my favorite chapter.
          </RevealSentence>

          <RevealSentence delay={500}>
            This is not just code. This is my heart — written honestly.
          </RevealSentence>

          <button className="primary fade-in delay-4" onClick={onNext}>
            Continue 💖
          </button>
        </div>
      </div>
    </div>
  );
}
