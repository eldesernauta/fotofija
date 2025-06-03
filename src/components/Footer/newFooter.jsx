import { gsap } from "gsap";

const NewFooter = ({ onCategoryChange, activeCategory }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
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

  const categories = ["Backstage", "Fijas", "Retratos", "Más fotos"];

  return (
    <nav className="w-full mx-auto bg-purple-200 dark:bg-neutral-900 pt-3 pb-0 md:mb-3 flex justify-between gap-3 md:gap-0 items-center px-5 2xl:px-0 z-50">
      <ul className="w-full mx-auto bg-purple-200 dark:bg-neutral-900  flex justify-center items-center gap-4 sm:gap-7">
        {categories.map((cat, i) => (
          <li
            key={i}
            onClick={() => handleCategoryClick(cat)}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            className="relative cursor-pointer font-Quizma text-neutral-900 dark:text-neutral-100"
          >
            {cat}
            <div
              className="category-border absolute left-0 bottom-0 w-full h-[2px] bg-neutral-900 dark:bg-neutral-100 scale-x-0"
              //data-category={toSlug(cat)}
            ></div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NewFooter;
