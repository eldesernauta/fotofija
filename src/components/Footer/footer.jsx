import { useEffect } from "react";
import { gsap } from "gsap";

const toSlug = (str) => str.toLowerCase().replace(/\s+/g, "-");

const Footer = ({ onCategoryChange, activeCategory }) => {
  const categories = ["Fijas", "Backstage",  "Retratos", "Más fotos"];

  const handleCategoryClick = (category) => {
    onCategoryChange(category); // este prop ya lo renombraremos a algo más apropiado abajo
  };

  const handleHover = (event) => {
    const border = event.currentTarget.querySelector(".category-border");
    gsap.to(border, {
      scaleX: 1,
      transformOrigin: "left center",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleLeave = (event) => {
    const border = event.currentTarget.querySelector(".category-border");
    gsap.to(border, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const borders = document.querySelectorAll(".category-border");
    borders.forEach((el) => gsap.set(el, { scaleX: 0 }));

    const activeElement = document.querySelector(
      `.category-border[data-category="${toSlug(activeCategory)}"]`
    );

    if (activeElement) {
      gsap.set(activeElement, { scaleX: 1 });
    }
  }, [activeCategory]);

  return (
    <footer className="w-full py-5 relative -bottom-5 lg:-bottom-1 2xl:-bottom-0 left-0 bg-neutral-100 dark:bg-neutral-900 z-40">
      <nav>
        <ul className="container mx-auto flex justify-center items-center gap-4 sm:gap-7">
          {categories.map((cat, i) => (
            <li
              key={i}
              onClick={() => handleCategoryClick(cat)}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              className="relative cursor-pointer text-neutral-900 dark:text-neutral-100 font-Covik"
            >
              {cat}
              <div
                className="category-border absolute left-0 bottom-0 w-full h-[2px] bg-neutral-900 dark:bg-neutral-100 scale-x-0"
                data-category={toSlug(cat)}
              ></div>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
