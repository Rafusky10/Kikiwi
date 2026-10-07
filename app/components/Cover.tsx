import Image from "next/image";
import type { Invitation } from "../data/types";

type CoverProps = {
  invitation: Invitation;
};

export default function Cover({ invitation }: CoverProps) {
  const day = new Date(
    `${invitation.event.date}T00:00:00`
  ).getDate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Imagen principal */}
      <Image
        src={invitation.cover.image}
        alt={`Fotografía de ${invitation.couple.fullNames}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay general */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Oscurecimiento suave alrededor del contenido */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.28)_45%,rgba(0,0,0,0.10)_70%,transparent_100%)]" />

      {/* Degradado inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {/* Contenido */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">

        {/* Encabezado */}
        <p
          className="mb-8 text-[10px] font-medium uppercase tracking-[0.45em] text-white sm:text-xs"
          style={{
            textShadow:
              "0 1px 3px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.7)",
          }}
        >
          Nuestra boda
        </p>

        {/* Nombres */}
        <h1
          className="max-w-4xl font-serif text-5xl leading-tight tracking-wide text-white sm:text-6xl md:text-8xl"
          style={{
            textShadow:
              "0 2px 2px rgba(0,0,0,0.95), 0 0 5px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.65)",
          }}
        >
          {invitation.couple.fullNames}
        </h1>

        {/* Separador */}
        <div className="my-9 flex items-center gap-3">
          <span
            className="h-px w-10 bg-white/75"
            style={{
              boxShadow: "0 1px 5px rgba(0,0,0,0.9)",
            }}
          />

          <span
            className="text-xs text-white"
            style={{
              textShadow: "0 1px 5px rgba(0,0,0,0.9)",
            }}
          >
            ✦
          </span>

          <span
            className="h-px w-10 bg-white/75"
            style={{
              boxShadow: "0 1px 5px rgba(0,0,0,0.9)",
            }}
          />
        </div>

        {/* Fecha */}
        <p
          className="text-xs font-medium uppercase tracking-[0.4em] text-white sm:text-sm"
          style={{
            textShadow:
              "0 2px 3px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.75)",
          }}
        >
          {day} · {invitation.event.month} · {invitation.event.year}
        </p>

        {/* Frase */}
        <p
          className="mt-9 max-w-lg text-[13px] leading-7 text-white sm:text-base"
          style={{
            textShadow:
              "0 2px 3px rgba(0,0,0,0.95), 0 0 8px rgba(0,0,0,0.75)",
          }}
        >
          {invitation.cover.phrase}
        </p>

        {/* Botón */}
        <a
          href="#historia"
          className="mt-10 border border-white/80 bg-white/5 px-10 py-4 text-[10px] font-medium uppercase tracking-[0.35em] text-white shadow-[0_2px_8px_rgba(0,0,0,0.6)] backdrop-blur-[2px] transition duration-500 hover:bg-white hover:text-black"
        >
          Abrir invitación
        </a>
      </div>

      {/* Indicador inferior */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/85">
        <span
          className="text-[9px] uppercase tracking-[0.35em]"
          style={{
            textShadow: "0 2px 6px rgba(0,0,0,0.95)",
          }}
        >
          Descubre
        </span>

        <span
          className="h-8 w-px bg-white/70"
          style={{
            boxShadow: "0 1px 5px rgba(0,0,0,0.8)",
          }}
        />
      </div>
    </section>
  );
}