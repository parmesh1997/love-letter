import { useEffect, useState } from "react";

export default function useTypewriter(text, speed = 40) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length) {
        setOutput((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}
