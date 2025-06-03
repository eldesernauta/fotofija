import { useState, useEffect } from "react";
import { gsap } from "gsap";
import LoaderWrapper from "./components/Loader/loaderWrapper";
// tailwind-keep: font-Stravinsky

import "./index.css";
import Slider from "./components/Slider/slider";
import NavBar from "./components/NavBar/navBar";
import Footer from "./components/Footer/footer";

import { galleryData } from "../data/galleryData";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Fijas");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return;
    setIsTransitioning(true);

    const timeline = gsap.timeline();
    timeline
      .to(".image-carousel", {
        y: "100%",
        duration: 1,
        ease: "power2.inOut",
      })
      .call(() => {
        setSelectedCategory(category);
      })
      .to(".image-carousel", {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      })
      .call(() => {
        setIsTransitioning(false);
      });
  };

  return isLoading ? (
    <LoaderWrapper onFinish={() => setIsLoading(false)} />
  ) : (
    <div className="w-full h-screen bg-neutral-100 dark:bg-neutral-900 transition duration-300">
      <NavBar onCategoryChange={handleCategoryChange}
        activeCategory={selectedCategory} />

      <div className="image-carousel">
        <Slider images={galleryData[selectedCategory]} />
      </div>

      <Footer onCategoryChange={handleCategoryChange}
        activeCategory={selectedCategory}
      />
    </div>
  );
}

export default App;
