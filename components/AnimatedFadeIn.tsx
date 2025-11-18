import React, { useRef, useEffect } from "react";

const AnimatedFadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition =
          "opacity 0.8s cubic-bezier(.68,-0.55,.27,1.55), transform 0.8s cubic-bezier(.68,-0.55,.27,1.55)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    }
  }, [delay]);

  return <div ref={ref}>{children}</div>;
};

export default AnimatedFadeIn;
