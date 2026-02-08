import { useEffect, useRef, useState } from "react";

export default function RevealSentence({ children, delay = 0, highlight }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className={`sentence ${visible ? "show" : ""} ${
        highlight ? "highlight" : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </p>
  );
}
