import type { Invitation } from "../data/types";

type FooterProps = {
  invitation: Invitation;
};

export default function Footer({ invitation }: FooterProps) {
  const day = new Date(
    `${invitation.event.date}T00:00:00`
  ).getDate();

  return (
    <section className="relative overflow-hidden bg-[#292824] px-6 py-28 text-white md:py-36">
      <div className="mx-auto max-w-3xl text-center">

        {/* Detalle superior */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-white/30" />

          <span className="text-[9px] text-[#A8B09A]">
            ✦
          </span>

          <span className="h-px w-10 bg-white/30" />
        </div>

        {/* Mensaje */}
        <p className="font-serif text-2xl leading-relaxed text-white/95 md:text-3xl">
          {invitation.footer.message}
        </p>

        {/* Separador */}
        <div className="mx-auto my-10 h-px w-12 bg-white/25" />

        {/* Nombres */}
        <p className="font-serif text-4xl leading-tight tracking-wide text-white md:text-5xl">
          {invitation.couple.fullNames}
        </p>

        {/* Fecha */}
        <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
          {day} · {invitation.event.month} · {invitation.event.year}
        </p>

      </div>
    </section>
  );
}