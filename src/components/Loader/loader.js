import { useEffect, useState } from "react";
import { gsap } from "gsap";

import loading1 from "../../images/loader/loading1.jpg";
import loading2 from "../../images/loader/loading2.jpg";
import loading3 from "../../images/loader/loading3.jpg";
import loading4 from "../../images/loader/loading4.jpg";
import loading5 from "../../images/loader/loading5.jpg";

const images = [loading1, loading2, loading3, loading4, loading5];

const Loader = ({ onFinish }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Animación texto
        gsap.fromTo(
            ".loader-line",
            { x: "100vw", opacity: 0 },
            {
                x: "0",
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                stagger: 0.1,
            }
        );

        // Imagen secuencial cada 1s
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 1000);

        // Barra de progreso avanza durante 5s
        gsap.to(".progress-bar", {
            width: "100%",
            duration: 5,
            ease: "linear",
            onComplete: () => {
                clearInterval(interval);
                setIsExiting(true);

                // Fade-out CSS, luego desmontar
                setTimeout(() => {
                    onFinish();
                }, 1000);
            },
        });

        return () => {
            clearInterval(interval);
        };
    }, [onFinish]);

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-neutral-900 z-[9999] transition-opacity duration-1000 ${isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            <div className="loader absolute bottom-10 left-10 text-neutral-100 leading-none">
                <h2 className="loader-line text-5xl lg:text-9xl ">Oscar Rojas</h2>
                <h2 className="loader-line text-5xl lg:text-8xl mb-4 font-Covik" >Portafolio</h2>

                <div className="loader-line w-[80vw] lg:w-[40vw] h-[20vh] overflow-hidden relative">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`loader-${i}`}
                            className={`absolute w-full h-full object-cover top-0 left-0 transition-opacity duration-500 ${i === currentImage ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ))}
                </div>

                <h2 className="loader-line text-2xl lg:text-6xl font-Covik font-lighter">Foto fija</h2>
            </div>

            {/* Barra de progreso */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-700">
                <div className="progress-bar h-full bg-neutral-100 w-0" />
            </div>
        </div>
    );
};

export default Loader;
