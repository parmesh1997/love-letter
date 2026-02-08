// import RevealSentence from "./RevealSentence";
// import { useEffect, useState } from "react";

// export default function Letter({ onNext }) {
//   const [showHint, setShowHint] = useState(
//   !localStorage.getItem("scrollHintSeen")
// );

// useEffect(() => {
//   const hideHint = () => {
//     setShowHint(false);
//     localStorage.setItem("scrollHintSeen", "true");
//     window.removeEventListener("scroll", hideHint);
//   };

//   window.addEventListener("scroll", hideHint);
//   return () => window.removeEventListener("scroll", hideHint);
// }, []);

//   return (
//     <div className="screen center">
//       <div className="letter blur-container">
//         <h1 className="heading-animate">Happy Anniversary ❤️</h1>
//        {/* {showHint && <div className="scroll-hint">⬇️ Scroll</div>} */}


//         <RevealSentence delay={0}>
//           From the moment you entered my life, everything found its place.
//         </RevealSentence>

//         <RevealSentence delay={200} className="highlight">
//           You are my calm, my strength, and my favorite chapter.
//         </RevealSentence>

//         <RevealSentence delay={400}>
//           This is not just code. This is my heart — written honestly.
//         </RevealSentence>

//         <button className="primary fade-in delay-4" onClick={onNext}>
//           Continue 💖
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
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
