"use client";

import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../data/types";

type DressCodeProps = {
  invitation: Invitation;
};

export default function DressCode({ invitation }: DressCodeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
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

  if (!invitation.dressCode.enabled) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F4EE] px-5 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-5xl">

        {/* ENCABEZADO */}
        <div
          className={`text-center transition-all duration-1000 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-[9px] font-medium uppercase tracking-[0.5em] text-[#6F7466]">
            Una celebración con estilo
          </p>

          <h2 className="mt-5 font-serif text-4xl tracking-wide text-[#292824] md:text-5xl">
            {invitation.dressCode.title}
          </h2>

          <div className="mx-auto mt-7 h-px w-10 bg-[#A8B09A]" />
        </div>

        {/* TIPO + DESCRIPCIÓN */}
        <div className="mx-auto mt-14 max-w-2xl text-center md:mt-18">

          {/* TIPO */}
          {invitation.dressCode.type.enabled && (
            <div
              className={`transition-all duration-1000 ease-out ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? "250ms" : "0ms",
              }}
            >
              <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#6F7466]">
                Código de vestimenta
              </p>

              <p className="mt-4 font-serif text-4xl tracking-[0.12em] text-[#292824] md:text-5xl">
                {invitation.dressCode.type.value}
              </p>

              <div className="mx-auto mt-6 h-px w-8 bg-[#C9BFAE]" />
            </div>
          )}

          {/* DESCRIPCIÓN */}
          {invitation.dressCode.description.enabled && (
            <div
              className={`mx-auto mt-8 max-w-lg transition-all duration-1000 ease-out ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? "450ms" : "0ms",
              }}
            >
              <p className="text-sm leading-7 tracking-wide text-[#5F5B52] md:text-base">
                {invitation.dressCode.description.text}
              </p>
            </div>
          )}
        </div>

        {/* PALETA */}
        {invitation.dressCode.colors.enabled &&
          invitation.dressCode.colors.items.length > 0 && (
            <div
              className={`mt-14 text-center transition-all duration-1000 ease-out md:mt-18 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? "650ms" : "0ms",
              }}
            >
              <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#6F7466]">
                Paleta sugerida
              </p>

              <div className="mt-7 flex justify-center">
                <div className="flex items-center">
                  {invitation.dressCode.colors.items.map(
                    (color, index) => (
                      <div
                        key={`${color}-${index}`}
                        className={`relative h-12 w-12 rounded-full border border-[#F7F4EE] shadow-sm transition-all duration-700 ease-out md:h-14 md:w-14 ${
                          visible
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-0"
                        }`}
                        style={{
                          backgroundColor: color,
                          marginLeft: index === 0 ? "0px" : "-8px",
                          transitionDelay: visible
                            ? `${750 + index * 100}ms`
                            : "0ms",
                          zIndex:
                            invitation.dressCode.colors.items.length -
                            index,
                        }}
                        title={color}
                        aria-label={`Color ${color}`}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}

        {/* IMAGEN DE REFERENCIA */}
        {invitation.dressCode.referenceImage.enabled &&
          invitation.dressCode.referenceImage.src && (
            <div
              className={`mx-auto mt-14 max-w-md transition-all duration-1200 ease-out md:mt-18 ${
                visible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-6 scale-[0.97] opacity-0"
              }`}
              style={{
                transitionDelay: visible ? "1100ms" : "0ms",
              }}
            >
              <div className="text-center">
                <p className="mb-5 text-[9px] font-medium uppercase tracking-[0.4em] text-[#6F7466]">
                  Inspiración
                </p>

                <div className="mx-auto overflow-hidden">
                  <img
                    src={invitation.dressCode.referenceImage.src}
                    alt={invitation.dressCode.referenceImage.alt}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

        {/* MÁS INSPIRACIÓN */}
        {invitation.dressCode.pinterest.enabled &&
          invitation.dressCode.pinterest.url && (
            <div
              className={`mt-8 flex justify-center transition-all duration-1000 ease-out md:mt-10 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? "1350ms" : "0ms",
              }}
            >
              <a
                href={invitation.dressCode.pinterest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center text-[#5F6458]"
              >
                <span className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.3em]">
                  <span>Más inspiración para tu look</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

                <span className="mt-3 h-px w-28 bg-[#C9BFAE] transition-all duration-500 group-hover:w-40 group-hover:bg-[#A8B09A]" />
              </a>
            </div>
          )}
      </div>
    </section>
  );
}