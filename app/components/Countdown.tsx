"use client";

import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../data/types";

type CountdownProps = {
  invitation: Invitation;
};

type CountdownState = "before" | "today" | "past";

export default function Countdown({ invitation }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [countdownState, setCountdownState] =
    useState<CountdownState>("before");

  const [isVisible, setIsVisible] = useState(false);
  const [secondsVisible, setSecondsVisible] = useState(true);

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
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const eventDate = new Date(
      `${invitation.event.date}T${invitation.ceremony.time}:00`
    );

    const updateCountdown = () => {
      const now = new Date();

      const eventDay = new Date(
        `${invitation.event.date}T00:00:00`
      );

      const nextDay = new Date(eventDay);
      nextDay.setDate(nextDay.getDate() + 1);

      if (now >= nextDay) {
        setCountdownState("past");

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      if (now >= eventDay && now < nextDay) {
        setCountdownState("today");

        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setCountdownState("before");

      const distance = eventDate.getTime() - now.getTime();

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });

      setSecondsVisible(false);

      setTimeout(() => {
        setSecondsVisible(true);
      }, 80);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [invitation.event.date, invitation.ceremony.time]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F4EE] px-6 py-24 md:py-32"
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
          <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#77736A]">
            La cuenta regresiva
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight tracking-wide text-[#292824] md:text-5xl">
            ¿Cuánto falta?
          </h2>

          <div
            className={`mx-auto mt-7 h-px bg-[#A8B09A] transition-all duration-[1800ms] ease-out ${
              isVisible ? "w-12" : "w-0"
            }`}
          />
        </div>

        {/* Antes del evento */}
        {countdownState === "before" && (
          <>
            <div
              className={`mx-auto grid max-w-3xl grid-cols-4 transition-all delay-[400ms] duration-[1800ms] ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {/* Días */}
              <div className="border-r border-[#C9BFAE] px-2 text-center md:px-6">
                <p className="font-serif text-4xl leading-none text-[#292824] md:text-6xl">
                  {String(timeLeft.days).padStart(2, "0")}
                </p>

                <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
                  Días
                </p>
              </div>

              {/* Horas */}
              <div className="border-r border-[#C9BFAE] px-2 text-center md:px-6">
                <p className="font-serif text-4xl leading-none text-[#292824] md:text-6xl">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>

                <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
                  Horas
                </p>
              </div>

              {/* Minutos */}
              <div className="border-r border-[#C9BFAE] px-2 text-center md:px-6">
                <p className="font-serif text-4xl leading-none text-[#292824] md:text-6xl">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>

                <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
                  Minutos
                </p>
              </div>

              {/* Segundos */}
              <div className="px-2 text-center md:px-6">
                <p
                  className={`font-serif text-4xl leading-none text-[#6F7466] transition-all duration-300 md:text-6xl ${
                    secondsVisible
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-1 opacity-50"
                  }`}
                >
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>

                <p className="mt-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736A]">
                  Segundos
                </p>
              </div>
            </div>

            {/* Información */}
            <p
              className={`mt-14 text-center text-[9px] font-medium uppercase tracking-[0.3em] text-[#8A857B] transition-all delay-[800ms] duration-[1600ms] ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Ceremonia · {invitation.ceremony.time} hrs
            </p>
          </>
        )}

        {/* Día del evento */}
        {countdownState === "today" && (
          <div
            className={`py-8 text-center transition-all duration-[1800ms] ease-out md:py-12 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-7 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C9BFAE]" />

              <span className="text-[9px] text-[#A8B09A]">
                ✦
              </span>

              <span className="h-px w-8 bg-[#C9BFAE]" />
            </div>

            <p className="font-serif text-4xl text-[#292824] md:text-5xl">
              ¡Hoy es el gran día!
            </p>

            <p className="mt-5 text-sm leading-7 text-[#6F6A61]">
              Te esperamos para celebrar juntos.
            </p>
          </div>
        )}

        {/* Evento pasado */}
        {countdownState === "past" && (
          <div
            className={`py-8 text-center transition-all duration-[1800ms] ease-out md:py-12 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-7 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#C9BFAE]" />

              <span className="text-[9px] text-[#A8B09A]">
                ✦
              </span>

              <span className="h-px w-8 bg-[#C9BFAE]" />
            </div>

            <p className="font-serif text-4xl text-[#292824] md:text-5xl">
              Gracias por acompañarnos
            </p>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#6F6A61]">
              Gracias por formar parte de un día tan especial
              para nosotros.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}