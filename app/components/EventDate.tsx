"use client";

import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../data/types";

type EventDateProps = {
  invitation: Invitation;
};

export default function EventDate({ invitation }: EventDateProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const day = new Date(
    `${invitation.event.date}T00:00:00`
  ).getDate();

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
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#E8E3D9] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl">

        {/* Encabezado */}
        <div
          className={`mb-16 text-center transition-all duration-[1600ms] ease-out md:mb-20 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#6F7466]">
            Reserva la fecha
          </p>

          <div
            className={`mx-auto mt-6 h-px bg-[#A8B09A] transition-all duration-[1800ms] ease-out ${
              isVisible ? "w-12" : "w-0"
            }`}
          />
        </div>

        {/* Fecha principal */}
        <div className="text-center">

          {/* Detalle superior */}
          <div
            className={`mb-3 flex items-center justify-center gap-4 transition-all duration-[1600ms] ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <span
              className={`h-px bg-[#C9BFAE] transition-all duration-[1800ms] ease-out ${
                isVisible ? "w-12" : "w-0"
              }`}
            />

            <span
              className={`text-[9px] text-[#A8B09A] transition-all duration-[1400ms] ease-out ${
                isVisible
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            >
              ✦
            </span>

            <span
              className={`h-px bg-[#C9BFAE] transition-all duration-[1800ms] ease-out ${
                isVisible ? "w-12" : "w-0"
              }`}
            />
          </div>

          {/* Día */}
          <p
            className={`font-serif text-[7rem] leading-none tracking-tight text-[#292824] transition-all duration-[1800ms] ease-out md:text-[10rem] ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-10 scale-[0.96] opacity-0"
            }`}
          >
            {String(day).padStart(2, "0")}
          </p>

          {/* Mes */}
          <p
            className={`mt-5 font-serif text-3xl tracking-wide text-[#4F4C45] transition-all delay-[350ms] duration-[1700ms] ease-out md:text-4xl ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {invitation.event.month}
          </p>

          {/* Año */}
          <p
            className={`mt-3 text-xs font-medium uppercase tracking-[0.45em] text-[#77736A] transition-all delay-[550ms] duration-[1600ms] ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {invitation.event.year}
          </p>

          {/* Día de la semana */}
          <p
            className={`mt-7 text-sm italic text-[#6F6A61] transition-all delay-[750ms] duration-[1600ms] ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {invitation.event.day}
          </p>

          {/* Detalle inferior */}
          <div
            className={`mx-auto mt-7 flex items-center justify-center gap-4 transition-all delay-[900ms] duration-[1700ms] ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <span
              className={`h-px bg-[#C9BFAE] transition-all duration-[1800ms] ease-out ${
                isVisible ? "w-8" : "w-0"
              }`}
            />

            <span
              className={`text-[8px] text-[#A8B09A] transition-all duration-[1400ms] ease-out ${
                isVisible
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
            >
              ✦
            </span>

            <span
              className={`h-px bg-[#C9BFAE] transition-all duration-[1800ms] ease-out ${
                isVisible ? "w-8" : "w-0"
              }`}
            />
          </div>
        </div>

        {/* Horarios */}
        <div
          className={`mx-auto mt-16 grid max-w-xl grid-cols-2 border-t border-[#C9BFAE] transition-all delay-[1100ms] duration-[1800ms] ease-out ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="border-r border-[#C9BFAE] px-4 py-8 text-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
              Ceremonia
            </p>

            <p className="mt-3 font-serif text-xl text-[#3F3C36]">
              {invitation.ceremony.time}
            </p>
          </div>

          <div className="px-4 py-8 text-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
              Recepción
            </p>

            <p className="mt-3 font-serif text-xl text-[#3F3C36]">
              {invitation.reception.time}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}