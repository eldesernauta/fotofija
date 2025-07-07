import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Tooltip } from "@nextui-org/react";

const filmIcon = require("../../images/film.png");
const mfIcon = require("../../images/mf.png");

const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [imageWidths, setImageWidths] = useState([]);
  const imagesRef = useRef([]);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  const getCameraType = (src) => {
    const fileName = src.split("/").pop().toLowerCase();
    return {
      isFilm: fileName.includes("_film") || fileName.includes("_mf"),
      isMediumFormat: fileName.includes("_mf"),
    };
  };

  const goTo = (index) => {
    if (index === current || index < 0 || index >= images.length) return;

    gsap.to(imagesRef.current[current], {
      autoAlpha: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.fromTo(
      imagesRef.current[index],
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6, ease: "power3.inOut" }
    );

    setCurrent(index);
  };

  const next = () => goTo((current + 1) % images.length);
  const prev = () => goTo((current - 1 + images.length) % images.length);

  useEffect(() => {
    if (!images || images.length === 0) return;
    imagesRef.current.forEach((img) => img && gsap.set(img, { autoAlpha: 0 }));
    gsap.set(imagesRef.current[0], { autoAlpha: 1 });
    setCurrent(0);
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (!images || images.length === 0) return;
    imagesRef.current.forEach((img) => img && gsap.set(img, { autoAlpha: 0 }));
    gsap.set(imagesRef.current[0], { autoAlpha: 1 });
    setCurrent(0);

    const container = containerRef.current;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > 50) deltaX > 0 ? prev() : next();
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [images]);

  const handleImageLoad = (e, idx) => {
    const width = e.target.offsetWidth;
    setImageWidths((prev) => {
      const updated = [...prev];
      updated[idx] = width;
      return updated;
    });
  };

  return (
    <div
      ref={containerRef}
      className="slider relative h-[calc(100vh-9rem)] overflow-hidden z-10 flex justify-center items-center"
    >
      {images.map((src, idx) => {
        const isActive = idx === current;
        const cameraType = getCameraType(src);

        return (
          <div
            key={idx}
            className={`pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0"
            } z-30`}
          >
            {/* Icons */}
              {isActive && (cameraType.isFilm || cameraType.isMediumFormat) && (
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex flex-col gap-2 items-end pr-1 z-[9999] pointer-events-auto">
                  {cameraType.isFilm && (
                    <Tooltip
                      content="Foto análoga"
                      placement="top"
                      className="bg-[#B37DFF] px-8 py-4 rounded-md z-[99999] pointer-events-auto"
                      showArrow
                    >
                      <img
                        src={filmIcon}
                        alt="film icon"
                        title="Foto análoga"
                        className="w-6 lg:w-10 pointer-events-auto"
                      />
                    </Tooltip>
                  )}
                  {cameraType.isMediumFormat && (
                    <Tooltip
                      content="Medio formato"
                      placement="bottom"
                      className="bg-[#FFE959] px-8 py-4 rounded-md z-[99999] pointer-events-auto"
                      showArrow
                    >
                      <img
                        src={mfIcon}
                        alt="medio formato icon"
                        title="Foto medio formato"
                        className="w-6 lg:w-10 pointer-events-auto"
                      />
                    </Tooltip>
                  )}
                </div>
              )}
            <div className="relative w-auto h-auto pointer-events-none">
              

              <img
                src={src}
                alt={`slide-${idx}`}
                ref={(el) => (imagesRef.current[idx] = el)}
                onLoad={(e) => handleImageLoad(e, idx)}
                className="max-h-[calc(100vh-9rem)] max-w-[calc(100vw-20px)] object-contain pointer-events-none"
              />
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex z-50">
        <button
          onClick={prev}
          className="cta previous flex items-center px-4 pt-4 pb-0 bg-neutral-100 dark:bg-neutral-900  rounded-tl-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="10"
            viewBox="0 0 46 16"
            className="text-black dark:text-white -translate-y-8"
          >
            <path
              d="M38,0l1.455,1.455-5.506,5.506H76V9.039H34.948l5.506,5.506L38,16l-8-8Z"
              transform="translate(-30)"
            />
          </svg>
          <span className="hidden md:block hover-underline-animation text-[9px] 2xl:text-[12px] text-black dark:text-white ml-2 font-Covik">
            Anterior
          </span>
        </button>

        <button
          onClick={next}
          className="cta next flex items-center px-4 pt-4 pb-0 bg-neutral-100 dark:bg-neutral-900 rounded-tr-xl"
        >
          <span className="hidden md:block hover-underline-animation text-[9px] 2xl:text-[12px] text-black dark:text-white mr-2 font-Covik">
            Siguiente
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="10"
            viewBox="0 0 46 16"
            className="text-black dark:text-white -translate-y-8"
          >
            <path
              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              transform="translate(30)"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
