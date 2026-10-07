"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../data/types";

type LocationProps = {
  invitation: Invitation;
};

export default function Location({ invitation }: LocationProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

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
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#E8E3D9] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">

          {/* Encabezado */}
          <div
            className={`mb-16 text-center transition-all duration-[1800ms] ease-out md:mb-20 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#6F7466]">
              El lugar de nuestra celebración
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight tracking-wide text-[#292824] md:text-5xl">
              El evento
            </h2>

            <div
              className={`mx-auto mt-7 h-px bg-[#A8B09A] transition-all duration-[1800ms] ease-out ${
                isVisible ? "w-12" : "w-0"
              }`}
            />
          </div>

          {/* Eventos */}
          <div className="grid gap-20 md:grid-cols-2 md:gap-12">

            {/* CEREMONIA */}
            {invitation.ceremony.enabled && (
              <div
                className={`text-center transition-all delay-[300ms] duration-[1800ms] ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <p className="mb-6 text-[9px] font-medium uppercase tracking-[0.35em] text-[#77736A]">
                  {invitation.ceremony.title}
                </p>

                {/* Imagen */}
                <button
                  type="button"
                  className="group relative mx-auto block aspect-[4/3] w-full max-w-md overflow-hidden bg-[#D8D1C4] text-left"
                  onClick={() =>
                    setSelectedImage(invitation.ceremony.image)
                  }
                  aria-label={`Ver fotografía de ${invitation.ceremony.name}`}
                >
                  <Image
                    src={invitation.ceremony.image}
                    alt={`Vista de ${invitation.ceremony.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-700 group-hover:bg-black/10" />
                </button>

                {/* Información */}
                <div className="mx-auto mt-8 max-w-md">

                  <h3 className="font-serif text-2xl text-[#292824] md:text-3xl">
                    {invitation.ceremony.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#6F6A61]">
                    {invitation.ceremony.address.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index <
                          invitation.ceremony.address.length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </p>

                  {/* Hora */}
                  <div className="mt-6">
                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
                      Hora
                    </p>

                    <p className="mt-2 font-serif text-2xl text-[#4F4C45]">
                      {invitation.ceremony.time} hrs
                    </p>
                  </div>

                  {/* Acción */}
                  <a
                    href={invitation.ceremony.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-3 border border-[#9A968C] px-7 py-3 text-[9px] font-medium uppercase tracking-[0.3em] text-[#4F4C45] transition duration-500 hover:border-[#292824] hover:bg-[#292824] hover:text-white"
                  >
                    <span className="text-xs">⌖</span>
                    Cómo llegar
                  </a>
                </div>
              </div>
            )}

            {/* Separador visual en móvil */}
            {invitation.ceremony.enabled &&
              invitation.reception.enabled && (
                <div className="flex items-center justify-center md:hidden">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#C9BFAE]" />

                    <span className="text-[9px] text-[#A8B09A]">
                      ✦
                    </span>

                    <span className="h-px w-8 bg-[#C9BFAE]" />
                  </div>
                </div>
              )}

            {/* RECEPCIÓN */}
            {invitation.reception.enabled && (
              <div
                className={`text-center transition-all delay-[650ms] duration-[1800ms] ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <p className="mb-6 text-[9px] font-medium uppercase tracking-[0.35em] text-[#77736A]">
                  {invitation.reception.title}
                </p>

                {/* Imagen */}
                <button
                  type="button"
                  className="group relative mx-auto block aspect-[4/3] w-full max-w-md overflow-hidden bg-[#D8D1C4] text-left"
                  onClick={() =>
                    setSelectedImage(invitation.reception.image)
                  }
                  aria-label={`Ver fotografía de ${invitation.reception.name}`}
                >
                  <Image
                    src={invitation.reception.image}
                    alt={`Vista de ${invitation.reception.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-700 group-hover:bg-black/10" />
                </button>

                {/* Información */}
                <div className="mx-auto mt-8 max-w-md">

                  <h3 className="font-serif text-2xl text-[#292824] md:text-3xl">
                    {invitation.reception.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#6F6A61]">
                    {invitation.reception.address.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index <
                          invitation.reception.address.length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </p>

                  {/* Hora */}
                  <div className="mt-6">
                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
                      Hora
                    </p>

                    <p className="mt-2 font-serif text-2xl text-[#4F4C45]">
                      {invitation.reception.time} hrs
                    </p>
                  </div>

                  {/* Acción */}
                  <a
                    href={invitation.reception.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-3 border border-[#9A968C] px-7 py-3 text-[9px] font-medium uppercase tracking-[0.3em] text-[#4F4C45] transition duration-500 hover:border-[#292824] hover:bg-[#292824] hover:text-white"
                  >
                    <span className="text-xs">⌖</span>
                    Cómo llegar
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Cierre */}
          <div
            className={`mt-20 flex justify-center transition-all delay-[1000ms] duration-[1600ms] ease-out md:mt-24 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="h-px w-12 bg-[#C9BFAE]" />
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
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
              onClick={() => setSelectedImage(null)}
              className="absolute -right-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-3xl leading-none text-white transition hover:bg-black/80"
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