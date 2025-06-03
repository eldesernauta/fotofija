import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeButton = () => {
  const [theme, setTheme] = useState("light");
  const buttonRef = useRef(null);
  const moonRef = useRef(null);
  const sunRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    const moon = moonRef.current;
    const sun = sunRef.current;
    const mask = maskRef.current;

    gsap.to(moon, {
      y: theme === "dark" ? "0" : "100%",
      duration: 1,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.set(mask, { overflow: "hidden" });
      },
    });
    gsap.to(sun, {
      y: theme === "dark" ? "100%" : 0,
      duration: 1,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.set(mask, { overflow: "hidden" });
      },
    });
  };

  return (
    <button
      ref={buttonRef}
      className="rounded-full w-4 h-4 absolute top-7 lg:top-8 left-3/4 lg:left-1/2 transform -translate-x-1/2 flex items-center justify-center overflow-hidden"
      onClick={handleThemeSwitch}
    >
      <span
        className={`text-neutral-500 ${theme === "dark" && "hidden"}`}
        ref={moonRef}
      >
        <FontAwesomeIcon icon={faMoon} style={{ fontSize: 15 }} />
      </span>
      <span
        className={`text-neutral-400 ${theme === "light" && "hidden"}`}
        ref={sunRef}
      >
        <FontAwesomeIcon icon={faSun} style={{ fontSize: 15 }} />
      </span>
      <div
        className="overflow-hidden absolute inset-0 rounded-full"
        ref={maskRef}
      ></div>
    </button>
  );
};

export default DarkModeButton;
