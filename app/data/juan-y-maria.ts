import { Invitation } from "./types";

export const invitation: Invitation = {
  // ==========================================
  // PAREJA
  // ==========================================
  couple: {
    name1: "Pedro-prueba",
    name2: "María",
    fullNames: "Pedro & María",
  },

  // ==========================================
  // INFORMACIÓN GENERAL DEL EVENTO
  // ==========================================
  event: {
    date: "2027-03-20",
    day: "Sábado",
    month: "Marzo",
    year: "2027",
  },

  // ==========================================
  // PORTADA
  // ==========================================
  cover: {
    enabled: true,
    image: "/images/juan-y-maria/portada.jpg",
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
      "Nuestra historia comenzó cuando nuestros caminos se cruzaron de manera inesperada.",
      "Desde entonces hemos compartido momentos increíbles que nos han llevado hasta este día.",
    ],

    phrase:
      "Y así comienza un nuevo capítulo de nuestra historia",

    images: [
      {
        src: "/images/juan-y-maria/historia-1.jpg",
        alt: "Historia de Juan y María",
      },
      {
        src: "/images/juan-y-maria/historia-2.jpg",
        alt: "Historia de Juan y María",
      },
      {
        src: "/images/juan-y-maria/historia-3.jpg",
        alt: "Historia de Juan y María",
      },
      {
        src: "/images/juan-y-maria/historia-4.jpg",
        alt: "Historia de Juan y María",
      },
    ],
  },

  // ==========================================
  // GALERÍA
  // ==========================================
  gallery: {
    enabled: true,

    title: "Nuestros momentos",

    images: [
      {
        src: "/images/juan-y-maria/galeria-1.jpg",
        alt: "Fotografía de Juan y María",
      },
      {
        src: "/images/juan-y-maria/galeria-2.jpg",
        alt: "Fotografía de Juan y María",
      },
      {
        src: "/images/juan-y-maria/galeria-3.jpg",
        alt: "Fotografía de Juan y María",
      },
      {
        src: "/images/juan-y-maria/galeria-4.jpg",
        alt: "Fotografía de Juan y María",
      },
      {
        src: "/images/juan-y-maria/galeria-5.jpg",
        alt: "Fotografía de Juan y María",
      },
      {
        src: "/images/juan-y-maria/galeria-6.jpg",
        alt: "Fotografía de Juan y María",
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

    name: "Parroquia de San Miguel",

    address: [
      "Av. Principal #456",
      "Guadalajara, Jalisco",
    ],

    time: "17:30",

    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Parroquia+de+San+Miguel",

    image: "/images/juan-y-maria/ceremonia.jpg",
  },

  // ==========================================
  // RECEPCIÓN
  // ==========================================
  reception: {
    enabled: true,

    title: "Recepción",

    name: "Hacienda Los Arcos",

    address: [
      "Carretera Guadalajara-Zapopan Km 12",
      "Zapopan, Jalisco",
    ],

    time: "19:30",

    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hacienda+Los+Arcos",

    image: "/images/juan-y-maria/recepcion.jpg",
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
    enabled: false,

    title: "Itinerario",

    events: [],
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
      enabled: false,
      items: [],
    },

    referenceImage: {
      enabled: false,
      src: "",
      alt: "",
    },

    pinterest: {
      enabled: false,
      url: "",
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
      enabled: false,
      bank: "",
      accountHolder: "",
      accountNumber: "",
      clabe: "",
    },

    registries: [
      {
        name: "Liverpool",
        icon: "",
        url: "https://www.liverpool.com.mx/",
      },
      {
        name: "Amazon",
        icon: "",
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