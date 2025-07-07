import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCaretRight,
  faCaretDown,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import DarkModeButton from "../DarkModeButton/darkModeButton";
import NavbarButton from "./NavBarButton/navBarButton";

const NavBar = ({ onCategoryChange, activeCategory }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);

    const menu = menuRef.current;

    if (!showMenu) {
      gsap.to(menu, { x: "0%", duration: 0.3, ease: "circ.out" });
    } else {
      gsap.to(menu, { x: "100%", duration: 0.3, ease: "circ.out" });
    }
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);

    const dropdown = dropdownRef.current;

    if (!showDropdown) {
      gsap.to(dropdown, {
        maxHeight: "10rem",
        duration: 0.3,
        ease: "bounce.out",
      });
    } else {
      gsap.to(dropdown, { maxHeight: 0, duration: 0.3, ease: "bounce.out" });
    }
  };

  useEffect(() => {
    const menu = menuRef.current;
    gsap.set(menu, { x: "100%", ease: "circ.out" });
  }, []);

  // 👇 Nuevo efecto: cerrar menú si haces click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.3,
          ease: "circ.out",
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  const categories = ["Fijas", "Backstage", "Retratos", "Más fotos"];
  const otherSites = [
    { name: "Portafolio web", url: "https://eldesernauta.com" },
  ];

  return (
    <nav className="relative w-full mx-auto pt-3 pb-0 md:mb-3 flex justify-between gap-3 md:gap-0 items-center text-white px-5 z-50">
      <h1 className="text-3xl cursor-none lg:text-6xl text-neutral-900 dark:text-neutral-100 font-Soligant">
        Oscar Rojas
      </h1>

      <DarkModeButton />
      <NavbarButton action={handleToggleMenu} showMenu={showMenu} />

      <div
        ref={menuRef}
        className="fixed inset-y-0 right-0 box-border flex flex-col bg-white dark:bg-black w-[calc(100%-15px)] md:w-64 xl:w-96 p-6 text-white justify-between items-start transition duration-300 z-50"
      >
        <button
          className="text-neutral-900 dark:text-neutral-100 font-bold text-lg mb-4 absolute top-4 right-4"
          onClick={handleToggleMenu}
        >
          &#10005;
        </button>
        <ul className="font-Covik text-neutral-900 dark:text-neutral-100">
          {categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className={`mb-2 w-full cursor-pointer ${
                activeCategory === cat
                  ? "text-neutral-900 dark:text-neutral-100 font-bold"
                  : ""
              }`}
            >
              {cat}
            </li>
          ))}

          <li
            onClick={handleToggleDropdown}
            className="mb-2 w-full cursor-pointer flex gap-3 items-center"
          >
            Otros sitios{" "}
            {showDropdown ? (
              <FontAwesomeIcon icon={faCaretDown} style={{ fontSize: 10 }} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} style={{ fontSize: 10 }} />
            )}
          </li>
          <ul
            ref={dropdownRef}
            className="w-60 overflow-hidden transition-max-height duration-300 ease-in-out pl-5"
            style={{ maxHeight: 0 }}
          >
            {otherSites.map((site, index) => (
              <li
                key={index}
                className="mb-2 w-full cursor-pointer"
                onClick={() => window.open(site.url, "_blank")}
              >
                {site.name}
              </li>
            ))}
          </ul>
        </ul>
        <div className="w-full flex flex-col gap-3">
          <ul className="w-full flex justify-center items-center gap-3">
            <li className="mx-2 text-neutral-900 dark:text-neutral-100 cursor-pointer transition duration-500">
              <a
                href="mailto:info@eldesernauta.com"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 15 }} />
              </a>
            </li>
            <li className="mx-2 text-neutral-900 dark:text-neutral-100 cursor-pointer transition duration-500">
              <a
                href="https://instagram.com/eldesernauta/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} style={{ fontSize: 15 }} />
              </a>
            </li>
            <li className="mx-2 text-neutral-900 dark:text-neutral-100 cursor-pointer transition duration-500">
              <a
                href="https://github.com/eldesernauta/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} style={{ fontSize: 15 }} />
              </a>
            </li>
            <li className="mx-2 text-neutral-900 dark:text-neutral-100 cursor-pointer transition duration-500">
              <a
                href="https://www.linkedin.com/in/eldesernauta/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedinIn} style={{ fontSize: 15 }} />
              </a>
            </li>
          </ul>
          <p className="text-xs text-center font-Covik text-neutral-900 dark:text-neutral-100">
            {new Date().getFullYear()} <span>&copy;</span> eldesernauta
          </p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
