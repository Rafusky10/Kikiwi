import { Invitation } from "./types";

export const invitation: Invitation = {
  // ==========================================
  // PAREJA
  // ==========================================
  couple: {
    name1: "Ana",
    name2: "Carlos",
    fullNames: "Ana & Carlos",
  },

  // ==========================================
  // INFORMACIÓN GENERAL DEL EVENTO
  // ==========================================
  event: {
    date: "2026-11-15",
    day: "Domingo",
    month: "Noviembre",
    year: "2026",
  },

  // ==========================================
  // PORTADA
  // ==========================================
  cover: {
    enabled: true,
    image: "/images/ana-y-carlos/portada.jpg",
    phrase:
      "Con mucha ilusión queremos compartir este día tan especial contigo.",
  },

  // ==========================================
  // NUESTRA HISTORIA
  // ==========================================
  story: {
    enabled: true,

    title: "Nuestra historia",

    paragraphs: [
      "Nos conocimos en un lugar mágico, donde el destino decidió cruzar nuestros caminos. Desde ese momento, supimos que estábamos hechos el uno para el otro.",

      "Hoy, después de tantos momentos compartidos, queremos celebrar nuestro amor junto a las personas que más queremos.",
    ],

    phrase:
      "Y colorín colorado, esta historia de amor ha comenzado",

    images: [
      {
        src: "/images/ana-y-carlos/historia-1.jpg",
        alt: "Historia de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/historia-2.jpg",
        alt: "Historia de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/historia-3.jpg",
        alt: "Historia de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/historia-4.jpg",
        alt: "Historia de Ana y Carlos",
      },
    ],
  },

  // ==========================================
  // GALERÍA
  // ==========================================
  gallery: {
    enabled: true,

    title: "Galería",

    images: [
      {
        src: "/images/ana-y-carlos/galeria-1.jpg",
        alt: "Fotografía de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/galeria-2.jpg",
        alt: "Fotografía de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/galeria-3.jpg",
        alt: "Fotografía de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/galeria-4.jpg",
        alt: "Fotografía de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/galeria-5.jpg",
        alt: "Fotografía de Ana y Carlos",
      },
      {
        src: "/images/ana-y-carlos/galeria-6.jpg",
        alt: "Fotografía de Ana y Carlos",
      },
    ],
  },
  
// ==========================================
  // CUENTA REGRESIVA
  // ==========================================
   countdown: {
    enabled: true,
  },

  // ==========================================
  // CEREMONIA
  // ==========================================
  ceremony: {
    enabled: true,

    title: "Ceremonia",

    name: "Parroquia de Santa Clara",

    address: [
      "Av. Principal #123",
      "Santa Clara, Estado de México",
    ],

    time: "18:00",

    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Parroquia+de+Santa+Clara",

    image: "/images/ana-y-carlos/ceremonia.jpg",
  },

  // ==========================================
  // RECEPCIÓN
  // ==========================================
  reception: {
    enabled: true,

    title: "Recepción",

    name: "Hacienda Santa Clara",

    address: [
      "Carretera México-Toluca Km 45.5",
      "Santa Clara, Estado de México",
    ],

    time: "20:00",

    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hacienda+Santa+Clara",

    image: "/images/ana-y-carlos/recepcion.jpg",
  },

  // ==========================================
  // MÚSICA
  // ==========================================
  music: {
    enabled: true,

    title: "Nuestra canción",

    audio: "/audio/ana-y-carlos/musica.mp3",
  },

  // ==========================================
  // ITINERARIO
  // ==========================================
  itinerary: {
  enabled: true,
  title: "Itinerario",

  events: [
    {
      time: "20:00",
      title: "Recepción",
      icon: "champagne",
    },
    {
      time: "20:30",
      title: "Cena",
      icon: "dinner",
    },
    {
      time: "22:00",
      title: "Baile principal",
      icon: "dance",
    },
    {
      time: "22:30",
      title: "Discurso de padrinos",
      icon: "speech",
    },
    {
      time: "23:00",
      title: "Pastel",
      icon: "cake",
    },
    {
      time: "23:30",
      title: "Snacks y bebidas",
      icon: "drinks",
    },
    {
      time: "00:30",
      title: "After party",
      icon: "party",
    },
    {
      time: "02:00",
      title: "Final del evento",
      icon: "sparkles",
    },
  ],
},

  // ==========================================
  // PASE INDIVIDUAL
  // ==========================================
  individualPass: {
    enabled: false,
  },

  // ==========================================
  // ÁLBUM DE FOTOS
  // ==========================================
  photoAlbum: {
    enabled: false,

    title: "Comparte tus fotos",

    message:
      "Escanea el código y comparte las fotos que tomes durante nuestra celebración.",
  },

  // ==========================================
  // CÓDIGO DE VESTIMENTA
  // ==========================================
  dressCode: {
    enabled: true,

    title: "Código de vestimenta",

    type: {
      enabled: true,
      value: "Formal",
    },

    description: {
      enabled: true,
      text:
        "Nos encantará verte lucir tu mejor versión para celebrar juntos este día tan especial.",
    },

        colors: {
      enabled: true,
      items: [
        "#F7F4EE",
        "#A8B09A",
        "#5F5B52",
        "#292824",
      ],
    },

    referenceImage: {
      enabled: true,
      src: "/images/ana-y-carlos/dresscode.jpg",
      alt: "Código de vestimenta",
    },

    pinterest: {
      enabled: true,
      url: "https://pin.it/2DSPYVOtK",
    },
  },
  // ==========================================
// MESA DE REGALOS
// ==========================================
gifts: {
  enabled: true,

  title: "Mesa de regalos",

  message:
    "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, puedes hacerlo a través de las siguientes opciones.",

      cash: {
      enabled: true,
      bank: "BBVA",
      accountHolder: "Ana López y Carlos García",
      accountNumber: "0123456789",
      clabe: "012345678901234567",
    },

  registries: [
    {
      name: "Liverpool",
      icon: "liverpool",
      url: "https://www.liverpool.com.mx/",
    },
    {
      name: "Amazon",
      icon: "amazon",
      url: "https://www.amazon.com.mx/",
    },
  ],
},

  // ==========================================
  // CONFIRMACIÓN DE ASISTENCIA
  // ==========================================
  rsvp: {
  enabled: true,

  title: "Confirma tu asistencia",

  message:
    "Nos encantará contar contigo en este día tan especial.",

  requireGuestName: true,

  allowCompanions: false,

  maxCompanions: 0,
},

  // ==========================================
  // PIE DE PÁGINA
  // ==========================================
  footer: {
    message:
      "Gracias por ser parte de este día tan especial",
  },
};