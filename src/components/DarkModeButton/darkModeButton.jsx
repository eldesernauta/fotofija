import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeToggleSwitch = () => {
  const [theme, setTheme] = useState("light");
  const knobRef = useRef(null);

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

    // Deslizar el knob con GSAP
    gsap.to(knobRef.current, {
      x: newTheme === "dark" ? 30 : 0, // Ajusta la distancia según el tamaño
      duration: 0.2,
      ease: "bounce.out",
    });
  };

  return (
    <button
      onClick={handleThemeSwitch}
      className="relative lg:absolute left-0 lg:left-1/2 translate-x-0 lg:-translate-x-[50%] flex justify-center items-center w-16 h-8 bg-neutral-900 dark:bg-neutral-100 rounded-full px-1 cursor-pointer"
    >
      <FontAwesomeIcon icon={faMoon} className="text-neutral-900 dark:text-neutral-900 w-4 h-4 z-10 p-2" />
      <FontAwesomeIcon icon={faSun} className="text-neutral-100 dark:text-neutral-100 w-4 h-4 z-10 p-2" />
      <div
        ref={knobRef}
        className="absolute left-1 top-1 w-6 h-6 bg-neutral-100 dark:bg-neutral-900 rounded-full shadow transition-transform"
      ></div>
    </button>
  );
};

export default DarkModeToggleSwitch;
