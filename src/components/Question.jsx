// import { useRef, useState } from "react";

// export default function Question({ onYes }) {
//   const containerRef = useRef(null);
//   const [pos, setPos] = useState({ top: "65%", left: "55%" });

//   const escape = () => {
//     const box = containerRef.current;
//     const maxX = box.offsetWidth - 100;
//     const maxY = box.offsetHeight - 50;

//     setPos({
//       left: Math.random() * maxX + "px",
//       top: Math.random() * maxY + "px",
//     });
//   };

//   const handleYes = () => {
//     localStorage.setItem(
//       "valentineResponse",
//       JSON.stringify({
//         accepted: true,
//         timestamp: new Date().toISOString(),
//       })
//     );
//     onYes();
//   };

//   return (
//     <div className="screen center">
//       <div className="question-box" ref={containerRef}>
//         <h2>Will you be my Valentine for the rest of my life? 💍</h2>

//         <button className="yes" onClick={handleYes}>
//           Yes 💖
//         </button>

//         <button
//           className="no"
//           style={pos}
//           onMouseEnter={escape}
//           onTouchStart={escape}
//         >
//           No 😅
//         </button>
//       </div>
//     </div>
//   );
// }
import { useRef, useState } from "react";

export default function Question({ onYes }) {
  const boxRef = useRef(null);
  const [pos, setPos] = useState({ top: "65%", left: "55%" });

  const escape = () => {
    const box = boxRef.current;
    setPos({
      left: Math.random() * (box.offsetWidth - 100) + "px",
      top: Math.random() * (box.offsetHeight - 50) + "px",
    });
  };

  const handleYes = () => {
    localStorage.setItem(
      "valentineResponse",
      JSON.stringify({ accepted: true, timestamp: new Date().toISOString() })
    );
    onYes();
  };

  return (
    <div className="screen center">
<div className="question-box glow-question-box" ref={boxRef}>
  <h2 className="glow-question-text">
    Will you be my Valentine forever? 💍
  </h2>

  <button className="yes glow-yes" onClick={handleYes}>
    Yes 💖
  </button>

  <button
    className="no glow-no"
    style={pos}
    onMouseEnter={escape}
    onTouchStart={escape}
  >
    No 😅
  </button>
</div>

    </div>
  );
}
