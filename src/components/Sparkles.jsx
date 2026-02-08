// import { useEffect } from "react";

// export default function Sparkles() {
//   useEffect(() => {
//     let lastTime = 0;

//     const handler = (e) => {
//       const now = Date.now();

//       // ⛔ throttle for mobile
//       if (now - lastTime < 120) return;
//       lastTime = now;

//       const sparkle = document.createElement("span");
//       sparkle.className = "sparkle";

//       const x = e.touches ? e.touches[0].clientX : e.clientX;
//       const y = e.touches ? e.touches[0].clientY : e.clientY;

//       sparkle.style.left = `${x}px`;
//       sparkle.style.top = `${y}px`;

//       document.body.appendChild(sparkle);
//       setTimeout(() => sparkle.remove(), 700);
//     };

//     window.addEventListener("touchmove", handler, { passive: true });
//     window.addEventListener("mousemove", handler);

//     return () => {
//       window.removeEventListener("touchmove", handler);
//       window.removeEventListener("mousemove", handler);
//     };
//   }, []);

//   return null;
// }
import { useEffect } from "react";

export default function Sparkles() {
  useEffect(() => {
    let last = 0;
    const handler = (e) => {
      const now = Date.now();
      if (now - last < 120) return;
      last = now;

      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      const s = document.createElement("span");
      s.className = "sparkle";
      s.style.left = x + "px";
      s.style.top = y + "px";
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    };

    window.addEventListener("mousemove", handler);
    window.addEventListener("touchmove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      window.removeEventListener("touchmove", handler);
    };
  }, []);

  return null;
}
