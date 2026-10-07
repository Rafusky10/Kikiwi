export type Invitation = {
  couple: {
    name1: string;
    name2: string;
    fullNames: string;
  };

  event: {
    date: string;
    day: string;
    month: string;
    year: string;
  };

  cover: {
    enabled: boolean;
    image: string;
    phrase: string;
  };

  story: {
    enabled: boolean;
    title: string;
    paragraphs: string[];
    phrase: string;
    images: {
      src: string;
      alt: string;
    }[];
  };

  gallery: {
    enabled: boolean;
    title: string;
    images: {
      src: string;
      alt: string;
    }[];
  };

  countdown: {
    enabled: boolean;
  };

  ceremony: {
    enabled: boolean;
    title: string;
    name: string;
    address: string[];
    time: string;
    mapsUrl: string;
    image: string;
  };

  reception: {
    enabled: boolean;
    title: string;
    name: string;
    address: string[];
    time: string;
    mapsUrl: string;
    image: string;
  };

  music: {
    enabled: boolean;
    title: string;
    audio: string;
  };

  itinerary: {
    enabled: boolean;
    title: string;

    events: {
      time: string;
      title: string;
      icon: string;
    }[];
  };

  dressCode: {
    enabled: boolean;
    title: string;

    type: {
      enabled: boolean;
      value: string;
    };

    description: {
      enabled: boolean;
      text: string;
    };

    colors: {
      enabled: boolean;
      items: string[];
    };

    referenceImage: {
      enabled: boolean;
      src: string;
      alt: string;
    };

    pinterest: {
      enabled: boolean;
      url: string;
    };
  };

  gifts: {
    enabled: boolean;
    title: string;
    message: string;

    cash: {
      enabled: boolean;
      bank: string;
      accountHolder: string;
      accountNumber: string;
      clabe: string;
    };

    registries: {
      name: string;
      icon: string;
      url: string;
    }[];
  };

  rsvp: {
    enabled: boolean;
    title: string;
    message: string;
    requireGuestName: boolean;
    allowCompanions: boolean;
    maxCompanions: number;
  };

  individualPass: {
    enabled: boolean;
  };

  photoAlbum: {
    enabled: boolean;
    title: string;
    message: string;
  };

  footer: {
    message: string;
  };
};