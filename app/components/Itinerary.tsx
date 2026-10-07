"use client";

import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../data/types";

type ItineraryProps = {
  invitation: Invitation;
};

function EventIcon({ icon }: { icon: string }) {
  const commonProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "champagne":
      return (
        <svg {...commonProps}>
          <path d="M7 3h10l-1.5 7a4 4 0 0 1-7 0L7 3Z" />
          <path d="M12 14v6" />
          <path d="M9 20h6" />
          <path d="M9 7h6" />
        </svg>
      );

    case "dinner":
      return (
        <svg {...commonProps}>
          <path d="M7 3v8" />
          <path d="M5 3v5a2 2 0 0 0 4 0V3" />
          <path d="M7 11v10" />
          <path d="M16 3v18" />
          <path d="M16 3c2 2 3 4 3 7h-3" />
        </svg>
      );

    case "dance":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v6" />
          <path d="m12 9-4 3" />
          <path d="m12 9 4 2" />
          <path d="m12 13-4 6" />
          <path d="m12 13 5 5" />
        </svg>
      );

    case "speech":
      return (
        <svg {...commonProps}>
          <path d="M6 4h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-4 4v-4H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M8 9h8" />
          <path d="M8 12h5" />
        </svg>
      );

    case "cake":
      return (
        <svg {...commonProps}>
          <path d="M5 10h14v9H5z" />
          <path d="M4 19h16" />
          <path d="M7 10V7" />
          <path d="M12 10V7" />
          <path d="M17 10V7" />
          <path d="M7 5c1 1 0 2 0 2" />
          <path d="M12 5c1 1 0 2 0 2" />
          <path d="M17 5c1 1 0 2 0 2" />
        </svg>
      );

    case "drinks":
      return (
        <svg {...commonProps}>
          <path d="M5 4h14l-1.5 7a4 4 0 0 1-7 0L5 4Z" />
          <path d="M12 15v5" />
          <path d="M9 20h6" />
          <path d="M8 8h8" />
        </svg>
      );

    case "party":
      return (
        <svg {...commonProps}>
          <path d="m4 20 7-7" />
          <path d="m13 4 7 7" />
          <path d="m15 3 1 2" />
          <path d="m19 7 2 1" />
          <path d="m5 4 1 2" />
          <path d="m3 9 2 1" />
          <path d="m12 3 1 3" />
        </svg>
      );

    case "sparkles":
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3Z" />
          <path d="m19 14 .6 2.4L22 17l-2.4.6L19 20l-.6-2.4L16 17l2.4-.6L19 14Z" />
          <path d="m5 14 .5 2L7 16.5 5.5 17 5 19l-.5-2-1.5-.5 1.5-.5L5 14Z" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
  }
}

export default function Itinerary({ invitation }: ItineraryProps) {
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
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (
    !invitation.itinerary.enabled ||
    invitation.itinerary.events.length === 0
  ) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#E8E3D9] px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-5xl">

        {/* MARCO */}
        <div
          className={`relative border border-[#C9BFAE] bg-[#ECE8DF] px-4 py-14 transition-all duration-1000 ease-out sm:px-8 md:px-14 md:py-16 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          {/* ESQUINAS */}
          <span className="absolute left-[-1px] top-[-1px] h-5 w-5 border-l border-t border-[#A8B09A]" />
          <span className="absolute right-[-1px] top-[-1px] h-5 w-5 border-r border-t border-[#A8B09A]" />
          <span className="absolute bottom-[-1px] left-[-1px] h-5 w-5 border-b border-l border-[#A8B09A]" />
          <span className="absolute bottom-[-1px] right-[-1px] h-5 w-5 border-b border-r border-[#A8B09A]" />

          {/* ENCABEZADO */}
          <div className="text-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.45em] text-[#6F7466]">
              El desarrollo de nuestra celebración
            </p>

            <h2 className="mt-4 font-serif text-4xl tracking-wide text-[#292824] md:text-5xl">
              {invitation.itinerary.title}
            </h2>

            <div className="mx-auto mt-6 h-px w-12 bg-[#A8B09A]" />
          </div>

          {/* TIMELINE */}
          <div className="relative mx-auto mt-10 max-w-3xl md:mt-16">

            {/* LÍNEA VERTICAL CENTRAL */}
            <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-[#C9BFAE]" />

            <div className="space-y-5 md:space-y-10">
              {invitation.itinerary.events.map((event, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={`${event.time}-${event.title}`}
                    className="relative grid min-h-[52px] grid-cols-2"
                  >
                    {/* LADO IZQUIERDO */}
                    <div
                      className={`flex items-center justify-center pr-2 transition-all duration-1000 ease-out sm:pr-4 md:pr-6 ${
                        visible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-5 opacity-0"
                      }`}
                      style={{
                        transitionDelay: visible
                          ? `${index * 180 + 300}ms`
                          : "0ms",
                      }}
                    >
                      {isLeft && (
                        <div className="flex items-center justify-end">
                          {/* TEXTO */}
                          <div className="text-right">
                            <p className="font-serif text-lg text-[#4F4C45] md:text-xl">
                              {event.time}
                            </p>

                            <h3 className="mt-1 text-[8px] font-medium uppercase leading-4 tracking-[0.22em] text-[#292824] md:text-[9px]">
                              {event.title}
                            </h3>
                          </div>

                          {/* LÍNEA */}
                          <div className="mx-2 h-px w-5 bg-[#C9BFAE] sm:mx-3 sm:w-6 md:mx-4 md:w-10" />

                          {/* ICONO */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C9BFAE] bg-[#ECE8DF] text-[#6F7466]">
                            <EventIcon icon={event.icon} />
                          </div>

                          {/* CONECTOR */}
                          <div className="h-px w-2 bg-[#C9BFAE] md:w-4" />
                        </div>
                      )}
                    </div>

                    {/* LADO DERECHO */}
                    <div
                      className={`flex items-center justify-center pl-2 transition-all duration-1000 ease-out sm:pl-4 md:pl-6 ${
                        visible
                          ? "translate-x-0 opacity-100"
                          : "translate-x-5 opacity-0"
                      }`}
                      style={{
                        transitionDelay: visible
                          ? `${index * 180 + 300}ms`
                          : "0ms",
                      }}
                    >
                      {!isLeft && (
                        <div className="flex items-center justify-start">
                          {/* CONECTOR */}
                          <div className="h-px w-2 bg-[#C9BFAE] md:w-4" />

                          {/* ICONO */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C9BFAE] bg-[#ECE8DF] text-[#6F7466]">
                            <EventIcon icon={event.icon} />
                          </div>

                          {/* LÍNEA */}
                          <div className="mx-2 h-px w-5 bg-[#C9BFAE] sm:mx-3 sm:w-6 md:mx-4 md:w-10" />

                          {/* TEXTO */}
                          <div className="text-left">
                            <p className="font-serif text-lg text-[#4F4C45] md:text-xl">
                              {event.time}
                            </p>

                            <h3 className="mt-1 text-[8px] font-medium uppercase leading-4 tracking-[0.22em] text-[#292824] md:text-[9px]">
                              {event.title}
                            </h3>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}