"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../data/types";

type StoryProps = {
  invitation: Invitation;
};

export default function Story({ invitation }: StoryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPhraseVisible, setIsPhraseVisible] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const phrase = phraseRef.current;

    if (!phrase) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPhraseVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
      }
    );

    observer.observe(phrase);

    return () => observer.disconnect();
  }, []);

  const phraseWords = invitation.story.phrase.split(" ");

  return (
    <>
      <section
        ref={sectionRef}
        id="historia"
        className="relative overflow-hidden bg-[#F7F4EE] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-5xl">

          {/* Encabezado */}
          <div
            className={`mb-16 text-center transition-all duration-1000 ease-out md:mb-20 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            {/* Detalle superior */}
            <div className="mb-7 flex items-center justify-center gap-3">
              <span
                className={`h-px bg-[#A8B09A] transition-all duration-1000 ease-out ${
                  isVisible ? "w-10" : "w-0"
                }`}
              />

              <span
                className={`text-[10px] text-[#A8B09A] transition-all duration-700 ${
                  isVisible
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                }`}
              >
                ✦
              </span>

              <span
                className={`h-px bg-[#A8B09A] transition-all duration-1000 ease-out ${
                  isVisible ? "w-10" : "w-0"
                }`}
              />
            </div>

            {/* Título */}
            <h2 className="font-serif text-4xl leading-tight tracking-wide text-[#292824] md:text-5xl">
              {invitation.story.title}
            </h2>

            {/* Línea decorativa */}
            <div
              className={`mx-auto mt-7 h-px bg-[#C9BFAE] transition-all delay-200 duration-1000 ease-out ${
                isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>

          {/* Historia */}
          <div
            className={`mx-auto max-w-2xl transition-all delay-300 duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="space-y-7 text-center">
              {invitation.story.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] leading-8 tracking-[0.01em] text-[#5D5A53] md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Fotografías */}
          <div className="mt-20 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4 md:gap-4">
            {invitation.story.images.map((image, index) => (
              <button
                key={index}
                type="button"
                className={`group relative aspect-square cursor-pointer touch-manipulation overflow-hidden bg-[#E8E3D9] text-left transition-all duration-1000 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible
                    ? `${500 + index * 100}ms`
                    : "0ms",
                }}
                onClick={() => setSelectedImage(image.src)}
                aria-label={`Ver fotografía ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="pointer-events-none object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />
              </button>
            ))}
          </div>

          {/* Frase */}
          <div
            ref={phraseRef}
            className="mx-auto mt-20 max-w-2xl text-center md:mt-24"
          >
            {/* Separador */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <span
                className={`h-px bg-[#C9BFAE] transition-all duration-1000 ease-out ${
                  isPhraseVisible ? "w-8" : "w-0"
                }`}
              />

              <span
                className={`text-[9px] text-[#A8B09A] transition-all duration-1000 ease-out ${
                  isPhraseVisible
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                }`}
              >
                ✦
              </span>

              <span
                className={`h-px bg-[#C9BFAE] transition-all duration-1000 ease-out ${
                  isPhraseVisible ? "w-8" : "w-0"
                }`}
              />
            </div>

            {/* Frase */}
            <p className="font-serif text-xl italic leading-8 text-[#68645C] md:text-2xl">
              “{" "}
              {phraseWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={`inline-block transition-all duration-700 ease-out ${
                    isPhraseVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isPhraseVisible
                      ? `${index * 90}ms`
                      : "0ms",
                  }}
                >
                  {word}
                  {index < phraseWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
              {" "}
              ”
            </p>
          </div>

          {/* Cierre */}
          <div className="mt-20 flex justify-center md:mt-24">
            <div
              className={`h-px bg-[#C9BFAE] transition-all duration-1000 ease-out ${
                isPhraseVisible ? "w-12 opacity-100" : "w-0 opacity-0"
              }`}
            />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 touch-manipulation"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Imagen ampliada"
              width={1600}
              height={1600}
              sizes="100vw"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            <button
              type="button"
              className="absolute -right-2 -top-2 z-10 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-black/60 text-3xl leading-none text-white transition hover:bg-black/80"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}