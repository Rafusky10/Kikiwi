"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Invitation } from "../data/types";

type GalleryProps = {
  invitation: Invitation;
};

export default function Gallery({ invitation }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const images = invitation.gallery.images;

  const nextImage = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex(
      (current) => (current - 1 + images.length) % images.length
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      nextImage();
    } else {
      previousImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (event.key === "ArrowRight") {
          setSelectedImage(
            (current) =>
              current === null ? 0 : (current + 1) % images.length
          );
        }

        if (event.key === "ArrowLeft") {
          setSelectedImage(
            (current) =>
              current === null
                ? 0
                : (current - 1 + images.length) % images.length
          );
        }

        if (event.key === "Escape") {
          setSelectedImage(null);
        }

        return;
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, images.length]);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <>
      <section className="relative overflow-hidden bg-[#F7F4EE] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">

          {/* Encabezado */}
          <div className="mb-14 text-center md:mb-16">

            {/* Detalle superior */}
            <div className="mb-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#A8B09A]" />

              <span className="text-[10px] text-[#A8B09A]">
                ✦
              </span>

              <span className="h-px w-10 bg-[#A8B09A]" />
            </div>

            {/* Título */}
            <h2 className="font-serif text-4xl leading-tight tracking-wide text-[#292824] md:text-5xl">
              {invitation.gallery.title}
            </h2>

            {/* Línea decorativa */}
            <div className="mx-auto mt-7 h-px w-12 bg-[#C9BFAE]" />
          </div>

          {/* Galería */}
          <div className="mx-auto max-w-4xl">

            {/* Fotografía principal */}
            <div
              className="group relative overflow-hidden bg-[#E8E3D9]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                className="relative block aspect-[4/5] w-full cursor-pointer touch-manipulation overflow-hidden md:aspect-[16/10]"
                onClick={() => setSelectedImage(currentIndex)}
                aria-label={`Ver fotografía ${currentIndex + 1} de ${images.length}`}
              >
                <Image
                  key={currentImage.src}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  priority={currentIndex === 0}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="pointer-events-none object-contain animate-[galleryFade_700ms_ease-out]"
                />

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-700 group-hover:bg-black/10" />

                {/* Número */}
                <span
                  className="pointer-events-none absolute bottom-5 left-5 text-[10px] font-medium tracking-[0.25em] text-white"
                  style={{
                    textShadow: "0 1px 6px rgba(0,0,0,0.75)",
                  }}
                >
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>

                {/* Indicador móvil */}
                <span
                  className="pointer-events-none absolute bottom-5 right-5 text-[9px] tracking-[0.18em] text-white/90 md:hidden"
                  style={{
                    textShadow: "0 1px 6px rgba(0,0,0,0.75)",
                  }}
                >
                  DESLIZA
                </span>
              </button>

              {/* Flecha izquierda */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-xl text-white backdrop-blur-[2px] transition duration-300 hover:bg-black/40 md:flex"
                  aria-label="Fotografía anterior"
                >
                  ‹
                </button>
              )}

              {/* Flecha derecha */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-xl text-white backdrop-blur-[2px] transition duration-300 hover:bg-black/40 md:flex"
                  aria-label="Siguiente fotografía"
                >
                  ›
                </button>
              )}
            </div>

            {/* Información inferior */}
            <div className="mt-6 flex items-center justify-between">

              {/* Contador */}
              <span className="text-[10px] font-medium tracking-[0.2em] text-[#68645C]">
                {String(currentIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-[#C9BFAE]">/</span>
                {String(images.length).padStart(2, "0")}
              </span>

              {/* Indicadores */}
              <div className="flex items-center gap-1.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Ir a fotografía ${index + 1}`}
                    className={`h-px transition-all duration-500 ${
                      index === currentIndex
                        ? "w-7 bg-[#A8B09A]"
                        : "w-3 bg-[#C9BFAE]"
                    }`}
                  />
                ))}
              </div>

              {/* Texto */}
              <span className="hidden text-[9px] tracking-[0.16em] text-[#8A867D] md:block">
                DESLIZA PARA DESCUBRIR
              </span>
            </div>
          </div>

          {/* Cierre */}
          <div className="mt-20 flex justify-center md:mt-24">
            <div className="h-px w-12 bg-[#C9BFAE]" />
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 touch-manipulation"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative flex max-h-full max-w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1600}
              height={1600}
              sizes="100vw"
              className="pointer-events-none max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* Cerrar */}
            <button
              type="button"
              className="absolute -right-2 -top-2 z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-black/60 text-3xl leading-none text-white transition hover:bg-black/80"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen"
            >
              ×
            </button>

            {/* Anterior */}
            {images.length > 1 && (
              <button
                type="button"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl text-white transition hover:bg-black/70"
                onClick={() =>
                  setSelectedImage(
                    (selectedImage - 1 + images.length) % images.length
                  )
                }
                aria-label="Fotografía anterior"
              >
                ‹
              </button>
            )}

            {/* Siguiente */}
            {images.length > 1 && (
              <button
                type="button"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl text-white transition hover:bg-black/70"
                onClick={() =>
                  setSelectedImage(
                    (selectedImage + 1) % images.length
                  )
                }
                aria-label="Siguiente fotografía"
              >
                ›
              </button>
            )}

            {/* Contador */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] text-white/90">
              {String(selectedImage + 1).padStart(2, "0")}
              {" / "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}

      {/* Animación de cambio */}
      <style jsx>{`
        @keyframes galleryFade {
          from {
            opacity: 0;
            transform: scale(1.015);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}