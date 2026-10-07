"use client";

import { useEffect, useRef, useState } from "react";
import type { Invitation } from "../data/types";

type GiftsProps = {
  invitation: Invitation;
};

export default function Gifts({ invitation }: GiftsProps) {
  const { gifts } = invitation;

  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hideBills, setHideBills] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

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

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  if (!gifts.enabled) return null;

  const openGift = () => {
    if (isAnimating || isOpen) return;

    setIsAnimating(true);
    setHideBills(false);

    setTimeout(() => {
      setHideBills(true);
    }, 3200);

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 3900);
  };

  const closeGift = () => {
    setIsOpen(false);
    setHideBills(false);

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  const copyClabe = async () => {
    if (!gifts.cash.clabe) return;

    try {
      // Método moderno
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(gifts.cash.clabe);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);

        return;
      }

      // Método de respaldo para navegadores móviles
      const textArea = document.createElement("textarea");

      textArea.value = gifts.cash.clabe;

      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";

      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");

      document.body.removeChild(textArea);

      if (successful) {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-[#E8E3D9] px-5 py-16 transition-all duration-1000 ease-out sm:px-6 md:py-24 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-4xl">

        {/* ========================================= */}
        {/* TÍTULO                                    */}
        {/* ========================================= */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#C9BFAE]" />

            <span className="text-sm text-[#A8B09A]">
              ✦
            </span>

            <span className="h-px w-10 bg-[#C9BFAE]" />
          </div>

          <h2 className="font-serif text-3xl font-light tracking-wide text-[#292824] sm:text-4xl">
            {gifts.title}
          </h2>

          <div className="mx-auto mt-5 h-px w-12 bg-[#A8B09A]" />

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#5F5B52] sm:text-base">
            {gifts.message}
          </p>

        </div>

        {/* ========================================= */}
        {/* MESAS DE REGALO                           */}
        {/* ========================================= */}

        {gifts.registries.length > 0 && (
          <div className="mx-auto mt-12 max-w-2xl">

            <p className="mb-6 text-center text-[10px] uppercase tracking-[0.3em] text-[#7A776F]">
              Nuestras opciones
            </p>

            <div className="grid gap-4 sm:grid-cols-2">

              {gifts.registries.map((registry, index) => (
                <a
                  key={`${registry.name}-${index}`}
                  href={registry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex min-h-28 flex-col items-center justify-center border border-[#C9BFAE] bg-[#F7F4EE] px-6 py-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#A8B09A] hover:shadow-[0_14px_35px_rgba(41,40,36,0.07)]"
                >
                  <span className="mb-3 text-xs text-[#A8B09A] transition-transform duration-500 group-hover:scale-110">
                    ✦
                  </span>

                  <p className="font-serif text-xl text-[#292824]">
                    {registry.name}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-[#7A776F]">
                    Ver mesa de regalos
                  </p>

                  {/* Flecha dibujada con CSS para evitar renderizado como emoji en iPhone */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 right-4 flex h-4 w-4 items-center justify-center text-[#A8B09A] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <span className="relative block h-3 w-3">
                      <span className="absolute right-0 top-0 h-[5px] w-[5px] border-r border-t border-[#A8B09A]" />

                      <span className="absolute bottom-[2px] left-[1px] h-px w-[10px] rotate-[-45deg] origin-left bg-[#A8B09A]" />
                    </span>
                  </span>
                </a>
              ))}

            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* REGALO EN EFECTIVO                        */}
        {/* ========================================= */}

        {gifts.cash.enabled && (
          <div className="mt-20">

            {/* Separador */}

            <div className="mx-auto mb-12 flex max-w-xs items-center justify-center gap-4">
              <span className="h-px flex-1 bg-[#C9BFAE]" />

              <span className="text-xs text-[#A8B09A]">
                ✦
              </span>

              <span className="h-px flex-1 bg-[#C9BFAE]" />
            </div>

            {/* Texto */}

            <div className="text-center">

              <h3 className="font-serif text-2xl font-light text-[#292824] sm:text-3xl">
                Si prefieres regalar en efectivo
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5F5B52]">
                Puedes hacerlo a través de esta opción.
              </p>

            </div>

            {/* ===================================== */}
            {/* ÁREA DE ANIMACIÓN                     */}
            {/* ===================================== */}

            <div className="relative mx-auto mt-8 min-h-[410px] max-w-lg">

              {/* =================================== */}
              {/* PAREJA                              */}
              {/* =================================== */}

              <div
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isOpen
                    ? "pointer-events-none scale-95 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              >

                {/* ================================= */}
                {/* NOVIA                             */}
                {/* ================================= */}

                <div className="absolute left-[14%] top-2 w-[170px] sm:left-[18%] sm:w-[185px]">

                  <svg
                    viewBox="0 0 220 390"
                    className="h-auto w-full overflow-visible"
                    aria-hidden="true"
                  >

                    {/* Cabello detrás de la cabeza */}

                    <path
                      d="
                        M92 54
                        C79 44 78 23 91 13
                        C103 4 121 8 130 20
                        C138 31 136 49 126 57
                        C119 63 100 63 92 54
                        Z
                      "
                      fill="#B4AEA2"
                    />

                    {/* Cabello lateral */}

                    <path
                      d="
                        M88 38
                        C79 52 82 73 91 82
                        C96 85 101 77 99 65
                        L98 48
                        Z
                      "
                      fill="#B4AEA2"
                    />

                    <path
                      d="
                        M130 38
                        C140 51 137 72 129 82
                        C124 85 119 77 121 64
                        L122 48
                        Z
                      "
                      fill="#B4AEA2"
                    />

                    {/* Rostro */}

                    <path
                      d="
                        M96 24
                        C101 17 115 16 123 23
                        C129 29 128 43 123 51
                        C119 57 101 57 96 50
                        C91 43 91 31 96 24
                        Z
                      "
                      fill="#F1EEE7"
                      stroke="#BDB4A4"
                      strokeWidth="1.3"
                    />

                    {/* Cuello */}

                    <path
                      d="
                        M103 51
                        L103 65
                        C105 69 115 69 117 65
                        L117 51
                      "
                      fill="#F1EEE7"
                      stroke="#BDB4A4"
                      strokeWidth="1.2"
                    />

                    {/* Hombros y torso */}

                    <path
                      d="
                        M101 62
                        C91 64 82 71 78 83
                        L70 116
                        C81 123 94 126 110 126
                        C126 126 139 123 150 116
                        L142 83
                        C138 71 129 64 119 62
                        Z
                      "
                      fill="#F1EEE7"
                      stroke="#BDB4A4"
                      strokeWidth="1.4"
                    />

                    {/* Escote */}

                    <path
                      d="
                        M96 65
                        C100 76 120 76 124 65
                      "
                      fill="none"
                      stroke="#D0C9BE"
                      strokeWidth="1.8"
                    />

                    {/* Cintura */}

                    <path
                      d="
                        M72 114
                        C88 121 132 121 148 114
                      "
                      fill="none"
                      stroke="#C4BDB1"
                      strokeWidth="1.5"
                    />

                    {/* Falda principal */}

                    <path
                      d="
                        M73 113
                        C67 136 57 159 49 184
                        C38 217 29 261 22 327
                        C46 343 76 351 110 351
                        C144 351 174 343 198 327
                        C191 261 182 217 171 184
                        C163 159 153 136 147 113
                        C128 122 92 122 73 113
                        Z
                      "
                      fill="#F1EEE7"
                      stroke="#BDB4A4"
                      strokeWidth="1.5"
                    />

                    {/* Pliegue izquierdo */}

                    <path
                      d="
                        M83 121
                        C75 175 68 250 65 335
                      "
                      fill="none"
                      stroke="#D5CFC4"
                      strokeWidth="1.3"
                    />

                    {/* Pliegue central */}

                    <path
                      d="
                        M110 121
                        C108 184 110 263 110 348
                      "
                      fill="none"
                      stroke="#D5CFC4"
                      strokeWidth="1.3"
                    />

                    {/* Pliegue derecho */}

                    <path
                      d="
                        M137 121
                        C145 175 152 250 155 335
                      "
                      fill="none"
                      stroke="#D5CFC4"
                      strokeWidth="1.3"
                    />

                    {/* Brazos */}

                    <path
                      d="
                        M81 73
                        C68 87 64 106 62 126
                      "
                      fill="none"
                      stroke="#BDB4A4"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    <path
                      d="
                        M139 73
                        C152 87 156 106 158 126
                      "
                      fill="none"
                      stroke="#BDB4A4"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Manos */}

                    <circle
                      cx="61"
                      cy="128"
                      r="3"
                      fill="#F1EEE7"
                      stroke="#BDB4A4"
                      strokeWidth="1"
                    />

                    <circle
                      cx="159"
                      cy="128"
                      r="3"
                      fill="#F1EEE7"
                      stroke="#BDB4A4"
                      strokeWidth="1"
                    />

                    {/* Detalle sutil del vestido */}

                    <path
                      d="
                        M48 287
                        C76 298 144 298 172 287
                      "
                      fill="none"
                      stroke="#D8D2C8"
                      strokeWidth="1.2"
                    />

                  </svg>

                </div>

                {/* ================================= */}
                {/* NOVIO                             */}
                {/* ================================= */}

                <div className="absolute right-[12%] top-4 w-[170px] sm:right-[16%] sm:w-[185px]">

                  <svg
                    viewBox="0 0 220 390"
                    className="h-auto w-full overflow-visible"
                    aria-hidden="true"
                  >

                    {/* Cabello */}

                    <path
                      d="
                        M93 54
                        C83 46 83 28 91 17
                        C100 6 118 7 128 16
                        C137 24 138 43 130 54
                        C120 59 103 59 93 54
                        Z
                      "
                      fill="#8F8A82"
                    />

                    {/* Parte superior del cabello */}

                    <path
                      d="
                        M90 30
                        C97 13 121 9 133 27
                        C126 24 120 23 113 26
                        C105 29 98 31 90 30
                        Z
                      "
                      fill="#77736C"
                    />

                    {/* Rostro */}

                    <path
                      d="
                        M97 25
                        C103 18 117 18 124 24
                        C130 30 129 43 124 51
                        C119 57 102 57 97 51
                        C92 44 92 31 97 25
                        Z
                      "
                      fill="#D9D5CC"
                      stroke="#9F9A90"
                      strokeWidth="1.3"
                    />

                    {/* Cuello */}

                    <path
                      d="
                        M103 51
                        L103 66
                        L117 66
                        L117 51
                      "
                      fill="#D9D5CC"
                      stroke="#9F9A90"
                      strokeWidth="1.2"
                    />

                    {/* Saco */}

                    <path
                      d="
                        M101 62
                        C89 64 79 70 73 82
                        L65 150
                        C77 159 92 163 110 163
                        C128 163 143 159 155 150
                        L147 82
                        C141 70 131 64 119 62
                        Z
                      "
                      fill="#D5D1C8"
                      stroke="#9F9A90"
                      strokeWidth="1.5"
                    />

                    {/* Camisa */}

                    <path
                      d="
                        M99 63
                        L110 81
                        L121 63
                        L117 60
                        L110 70
                        L103 60
                        Z
                      "
                      fill="#F7F4EE"
                    />

                    {/* Corbata */}

                    <path
                      d="
                        M105 70
                        L110 79
                        L115 70
                        L118 87
                        L110 106
                        L102 87
                        Z
                      "
                      fill="#A8B09A"
                    />

                    {/* Solapa izquierda */}

                    <path
                      d="
                        M94 63
                        L110 83
                        L101 111
                        L84 73
                        Z
                      "
                      fill="#ECE8DF"
                      stroke="#B6B0A5"
                      strokeWidth="1"
                    />

                    {/* Solapa derecha */}

                    <path
                      d="
                        M126 63
                        L110 83
                        L119 111
                        L136 73
                        Z
                      "
                      fill="#ECE8DF"
                      stroke="#B6B0A5"
                      strokeWidth="1"
                    />

                    {/* Botones */}

                    <circle
                      cx="110"
                      cy="121"
                      r="2"
                      fill="#858078"
                    />

                    <circle
                      cx="110"
                      cy="138"
                      r="2"
                      fill="#858078"
                    />

                    {/* Brazo izquierdo */}

                    <path
                      d="
                        M76 79
                        C64 96 59 119 57 145
                      "
                      fill="none"
                      stroke="#9F9A90"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />

                    {/* Brazo derecho */}

                    <path
                      d="
                        M144 79
                        C156 96 161 119 163 145
                      "
                      fill="none"
                      stroke="#9F9A90"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />

                    {/* Manos */}

                    <circle
                      cx="56"
                      cy="148"
                      r="5"
                      fill="#D9D5CC"
                      stroke="#9F9A90"
                      strokeWidth="1"
                    />

                    <circle
                      cx="164"
                      cy="148"
                      r="5"
                      fill="#D9D5CC"
                      stroke="#9F9A90"
                      strokeWidth="1"
                    />

                    {/* Pantalón izquierdo */}

                    <path
                      d="
                        M77 151
                        C87 157 98 159 108 159
                        L105 326
                        L69 326
                        Z
                      "
                      fill="#D5D1C8"
                      stroke="#9F9A90"
                      strokeWidth="1.5"
                    />

                    {/* Pantalón derecho */}

                    <path
                      d="
                        M113 159
                        C123 159 134 157 143 151
                        L151 326
                        L115 326
                        Z
                      "
                      fill="#D5D1C8"
                      stroke="#9F9A90"
                      strokeWidth="1.5"
                    />

                    {/* Línea central */}

                    <path
                      d="
                        M110 162
                        L110 323
                      "
                      stroke="#9F9A90"
                      strokeWidth="1"
                    />

                    {/* Zapato izquierdo */}

                    <path
                      d="
                        M69 324
                        L105 324
                        C108 327 108 331 104 334
                        L61 334
                        C59 331 62 327 69 324
                        Z
                      "
                      fill="#858078"
                    />

                    {/* Zapato derecho */}

                    <path
                      d="
                        M115 324
                        L151 324
                        C158 327 161 331 159 334
                        L116 334
                        C112 331 112 327 115 324
                        Z
                      "
                      fill="#858078"
                    />

                  </svg>

                </div>

              </div>

              {/* ================================= */}
              {/* BILLETE 1                         */}
              {/* ================================= */}

              <button
                type="button"
                aria-label="Ver datos bancarios"
                aria-expanded={isOpen}
                disabled={isAnimating || isOpen}
                onClick={openGift}
                className={`absolute z-20 flex h-14 w-24 items-center justify-center border border-[#A8B09A] bg-[#E8E3D9] shadow-[0_7px_18px_rgba(41,40,36,0.08)] transition-all duration-[1800ms] ease-in-out ${
                  hideBills
                    ? "left-[25%] top-[105px] rotate-[8deg] scale-90 opacity-0"
                    : isAnimating || isOpen
                      ? "left-[25%] top-[105px] rotate-[8deg] scale-90 opacity-100"
                      : "left-[4%] top-[190px] rotate-[-8deg] opacity-100 hover:-translate-y-1 hover:rotate-[-3deg]"
                }`}
              >
                <div className="pointer-events-none absolute inset-1 border border-[#C9BFAE]" />

                <span className="relative font-serif text-xl text-[#6F7466]">
                  $$
                </span>
              </button>

              {/* ================================= */}
              {/* BILLETE 2                         */}
              {/* ================================= */}

              <button
                type="button"
                aria-label="Ver datos bancarios"
                aria-expanded={isOpen}
                disabled={isAnimating || isOpen}
                onClick={openGift}
                className={`absolute z-20 flex h-14 w-24 items-center justify-center border border-[#A8B09A] bg-[#E8E3D9] shadow-[0_7px_18px_rgba(41,40,36,0.08)] transition-all duration-[2000ms] ease-in-out delay-100 ${
                  hideBills
                    ? "left-[31%] top-[145px] rotate-[-5deg] scale-90 opacity-0"
                    : isAnimating || isOpen
                      ? "left-[31%] top-[145px] rotate-[-5deg] scale-90 opacity-100"
                      : "left-[25%] top-[245px] rotate-[5deg] opacity-100 hover:-translate-y-1 hover:rotate-0"
                }`}
              >
                <div className="pointer-events-none absolute inset-1 border border-[#C9BFAE]" />

                <span className="relative font-serif text-xl text-[#6F7466]">
                  $$
                </span>
              </button>

              {/* ================================= */}
              {/* BILLETE 3                         */}
              {/* ================================= */}

              <button
                type="button"
                aria-label="Ver datos bancarios"
                aria-expanded={isOpen}
                disabled={isAnimating || isOpen}
                onClick={openGift}
                className={`absolute z-20 flex h-14 w-24 items-center justify-center border border-[#A8B09A] bg-[#E8E3D9] shadow-[0_7px_18px_rgba(41,40,36,0.08)] transition-all duration-[2200ms] ease-in-out delay-200 ${
                  hideBills
                    ? "right-[31%] top-[145px] rotate-[5deg] scale-90 opacity-0"
                    : isAnimating || isOpen
                      ? "right-[31%] top-[145px] rotate-[5deg] scale-90 opacity-100"
                      : "right-[26%] top-[245px] rotate-[-5deg] opacity-100 hover:-translate-y-1 hover:rotate-0"
                }`}
              >
                <div className="pointer-events-none absolute inset-1 border border-[#C9BFAE]" />

                <span className="relative font-serif text-xl text-[#6F7466]">
                  $$
                </span>
              </button>

              {/* ================================= */}
              {/* BILLETE 4                         */}
              {/* ================================= */}

              <button
                type="button"
                aria-label="Ver datos bancarios"
                aria-expanded={isOpen}
                disabled={isAnimating || isOpen}
                onClick={openGift}
                className={`absolute z-20 flex h-14 w-24 items-center justify-center border border-[#A8B09A] bg-[#E8E3D9] shadow-[0_7px_18px_rgba(41,40,36,0.08)] transition-all duration-[1800ms] ease-in-out delay-300 ${
                  hideBills
                    ? "right-[25%] top-[105px] rotate-[-8deg] scale-90 opacity-0"
                    : isAnimating || isOpen
                      ? "right-[25%] top-[105px] rotate-[-8deg] scale-90 opacity-100"
                      : "right-[5%] top-[190px] rotate-[8deg] opacity-100 hover:-translate-y-1 hover:rotate-[3deg]"
                }`}
              >
                <div className="pointer-events-none absolute inset-1 border border-[#C9BFAE]" />

                <span className="relative font-serif text-xl text-[#6F7466]">
                  $$
                </span>
              </button>

              {/* ================================= */}
              {/* INDICACIÓN                        */}
              {/* ================================= */}

              <div
                className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-500 ${
                  isAnimating || isOpen
                    ? "translate-y-3 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                <p className="whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-[#8A867D]">
                  Toca un billete
                </p>
              </div>

              {/* ================================= */}
              {/* INFORMACIÓN BANCARIA              */}
              {/* ================================= */}

              <div
                className={`absolute inset-0 z-10 flex items-center justify-center px-4 transition-all duration-1000 ease-out ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-5 opacity-0"
                }`}
              >

                <div className="w-full max-w-md border border-[#C9BFAE] bg-[#F7F4EE] px-7 py-8 text-left shadow-[0_14px_35px_rgba(41,40,36,0.06)] sm:px-9">

                  <div className="text-center">

                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#7A776F]">
                      Datos para tu detalle
                    </p>

                    <div className="mx-auto mt-3 h-px w-10 bg-[#A8B09A]" />

                  </div>

                  <div className="mt-7 space-y-5">

                    {gifts.cash.bank && (
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#8A867D]">
                          Banco
                        </p>

                        <p className="mt-1 font-serif text-base text-[#292824]">
                          {gifts.cash.bank}
                        </p>
                      </div>
                    )}

                    {gifts.cash.accountHolder && (
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#8A867D]">
                          Titular
                        </p>

                        <p className="mt-1 text-sm text-[#292824]">
                          {gifts.cash.accountHolder}
                        </p>
                      </div>
                    )}

                    {gifts.cash.accountNumber && (
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#8A867D]">
                          Número de cuenta
                        </p>

                        <p className="mt-1 break-all text-sm tracking-wide text-[#292824]">
                          {gifts.cash.accountNumber}
                        </p>
                      </div>
                    )}

                    {gifts.cash.clabe && (
                      <div>

                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#8A867D]">
                          CLABE
                        </p>

                        <div className="mt-1 flex items-center justify-between gap-4">

                          <p className="break-all text-sm tracking-wide text-[#292824]">
                            {gifts.cash.clabe}
                          </p>

                          <button
                            type="button"
                            onClick={copyClabe}
                            className="shrink-0 border border-[#C9BFAE] px-3 py-2 text-[8px] uppercase tracking-[0.15em] text-[#5F5B52] transition-all duration-300 hover:border-[#A8B09A] hover:bg-[#ECE8DF]"
                          >
                            {copied ? "✓ Copiada" : "Copiar"}
                          </button>

                        </div>

                      </div>
                    )}

                  </div>

                  <div className="mt-7 border-t border-[#D5D0C6] pt-5 text-center">

                    <p className="font-serif text-sm italic text-[#6F7466]">
                      Gracias por ser parte de este momento.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={closeGift}
                    className="mx-auto mt-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#7A776F] transition-colors duration-300 hover:text-[#292824]"
                  >
                    <span className="text-sm">
                      ×
                    </span>

                    Cerrar
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================= */}
        {/* DETALLE FINAL                             */}
        {/* ========================================= */}

        <div className="mt-16 flex items-center justify-center gap-4">

          <span className="h-px w-10 bg-[#C9BFAE]" />

          <span className="text-xs text-[#A8B09A]">
            ✦
          </span>

          <span className="h-px w-10 bg-[#C9BFAE]" />

        </div>

      </div>
    </section>
  );
}