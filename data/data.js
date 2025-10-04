export const defaultYogaTypes = [
    {
      id: 1,
      title: "La respiration",
      description: "Contrôlée et profonde, elle accompagne chaque mouvement",
      image: "/img/yoga-types/type-1.svg",
      animation: "flip-left",
      duration: 500
    },
    {
      id: 2,
      title: "La concentration",
      description: "Être attentif à chaque geste pour mieux l’exécuter",
      image: "/img/yoga-types/type-2.svg",
      animation: "flip-right",
      duration: 600
    },
    {
      id: 3,
      title: "Le centrage",
      description: "Renforcer la sangle abdominale (le “powerhouse”) qui soutient tout le corps",
      image: "/img/yoga-types/type-3.svg",
      animation: "flip-left",
      duration: 600
    },
    {
      id: 4,
      title: "Le contrôle",
      description: "Chaque mouvement est précis, sans gestes brusques.",
      image: "/img/yoga-types/type-4.svg",
      animation: "flip-right",
      duration: 600
    },
    {
      id: 5,
      title: "La fluidité",
      description: "Les enchaînements doivent être harmonieux.",
      image: "/img/yoga-types/type-5.svg",
      animation: "flip-left",
      duration: 600
    },
    {
      id: 6,
      title: "La précision",
      description: "La qualité prime sur la quantité de répétitions.",
      image: "/img/yoga-types/type-6.svg",
      animation: "flip-right",
      duration: 600
    }
];

export const  VideoSection = [
  {
    videoThumbnail : '/img/video.png', 
    videoUrl : 'https://youtu.be/_y39T5jQfFM?si=fsKAo5scI_USGhzo', // Remplacez par votre URL vidéo
    videoTitle : 'Yoga Session Video',
    altText : 'Video thumbnail'
  }
];

export const popularClasses = [
  {
    id: 1,
    title: "Pilates au sol (Matwork)",
    description: "Pratiqué sur tapis, parfois avec petits accessoires (ballon, élastique, cercle magique, rouleau). C’est la forme la plus accessible et répandue.",
    image: "/img/popular-classes/cours1.jpg",
    link: "/public/session-details",
    category: "Intermédiaire",
    duration: "45 min",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 142,
    price: "25€",
    tags: ["Dynamique", "Énergisant"],
    level: "Intermédiaire",
    animationDuration: 600
  },
  {
    id: 2,
    title: "Pilates sur machines",
    description: "Utilise des appareils inventés par Joseph Pilates (souvent avec ressorts pour ajouter résistance ou assistance) :",
    image: "/img/popular-classes/cours2.jpg",
    link: "/public/session-details",
    category: "Débutant",
    duration: "60 min",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 203,
    price: "20€",
    tags: ["Bases", "Débutant"],
    level: "Débutant",
    animationDuration: 700
  },
  {
    id: 3,
    title: "Pilates doux / thérapeutique",
    description: "Adapté pour les personnes en rééducation, seniors, ou en reprise d’activité..",
    image: "/img/popular-classes/cours3.jpg",
    link: "/public/session-details",
    category: "Débutant",
    duration: "30 min",
    instructor: "Emma Wilson",
    rating: 4.7,
    students: 98,
    price: "15€",
    tags: ["Matinal", "Court"],
    level: "Tous niveaux",
    animationDuration: 800
  },
  {
    id: 4,
    title: "Pilates dynamique / cardio-pilates",
    description: "Enchaînements plus rapides pour brûler des calories, proche du fitness.",
    image: "/img/popular-classes/cours4.jpg",
    link: "/public/session-details",
    category: "Avancé",
    duration: "75 min",
    instructor: "David Kumar",
    rating: 4.6,
    students: 87,
    price: "30€",
    tags: ["Flexibilité", "Relaxant"],
    level: "Avancé",
    animationDuration: 900
  }
];

export const categories = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

export const sectionConfig = {
  popularClasses: {
    title: "Cours Populaires",
    subtitle: "Découvrez nos cours les plus appréciés",
    viewAllText: "Voir tous les cours",
    viewAllLink: "/classes"
  },
  yogaTypes: {
    title: "Nos Types de Yoga",
    subtitle: "Découvrez les différents styles de yoga que nous proposons",
    viewMoreText: "Voir plus",
    viewMoreLink: "/classes"
  }
};

export const instructors = [
  {
    name: "Amber Murphy",
    image: "/img/instructors/1.png",
    animation: "fade-right",
    socials: [
      { platform: "facebook", icon: "ri-facebook-fill", url: "#" },
      { platform: "twitter", icon: "ri-twitter-fill", url: "#" },
      { platform: "linkedin", icon: "ri-linkedin-box-fill", url: "#" },
    ],
  },
  {
    name: "Beatrice Carpenter",
    image: "/img/instructors/2.jpg",
    animation: "flip-left",
    socials: [
      { platform: "facebook", icon: "ri-facebook-fill", url: "#" },
      { platform: "twitter", icon: "ri-twitter-fill", url: "#" },
      { platform: "linkedin", icon: "ri-linkedin-box-fill", url: "#" },
    ],
  },
  {
    name: "Kathryn Patel",
    image: "/img/instructors/3.jpg",
    animation: "fade-left",
    socials: [
      { platform: "facebook", icon: "ri-facebook-fill", url: "#" },
      { platform: "twitter", icon: "ri-twitter-fill", url: "#" },
      { platform: "linkedin", icon: "ri-linkedin-box-fill", url: "#" },
    ],
  },
];

export const subscribe = {
  title: "Abonnez vous à notre newsletter",
  description:
    "Abonnez-vous pour ne rien manquer : actualités, astuces et contenus inspirants.",
  image: "/img/suscribee.png",
  placeholder: "Votre adresse mail",
  buttonText: "S'enregistrer",
};

export const heroHeaders = {
  about: {
    title: "About",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "A Propos", href: "/public/a-propos", active: true },
    ],
  },
  contact: {
    title: "Contact",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Contact", href: "/public/contact", active: true },
    ],
  },
  tarifs: {
    title: "Achat Crédits",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Achat Crédit", href: "/public/tarifs", active: true },
    ],
  },
  planning: {
    title: "Planning",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Planning", href: "/public/planning", active: true },
    ],
  },
  session_details: {
    title: "Details de Session",
    breadcrumbs: [
      { label: "Accueil", href: "/" },
      { label: "Details de Session", href: "/public/session-details", active: true },
    ],
  },
};

export const aboutYoga = {
  title: "Moon Lagre Studio",
  button: {
    label: "Contactez Nous",
    href: "#",
  },
  lead: "Découvrez une nouvelle façon de vous entraîner, où l’efficacité rencontre l’élégance. Le studio Lagree, c’est bien plus qu’une salle de sport : c’est un espace dédié à la transformation du corps et de l’esprit, dans une ambiance moderne et inspirante.",
  description:
    "Chaque séance est pensée pour réveiller tous vos muscles en profondeur, renforcer votre posture et booster votre énergie, le tout dans un cadre chic,lumineux et motivant.",
};


export const testimonials = [
  {
    description:
      "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
    title: "Super Studio",
    author: "— SARA PARKER",
  },
  {
    description:
      "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
    title: "Incroyable Expérience",
    author: "— JOE GUERRERO",
  },
];

export const classes = [
    { id: 1, title: "Pilates au sol (Matwork)", img: "/img/popular-classes/cours1.jpg" },
    { id: 2, title: "Pilates sur machines", img: "/img/popular-classes/cours2.jpg" },
    { id: 3, title: "Pilates doux / thérapeutique", img: "/img/popular-classes/cours3.jpg" },
    { id: 4, title: "Pilates dynamique / cardio-pilates", img: "/img/popular-classes/cours4.jpg" },
    { id: 5, title: "Pilates prénatal", img: "/img/popular-classes/cours5.jpg" },
    { id: 6, title: "Pilates postnatal", img: "/img/popular-classes/cours6.jpg" },
    { id: 7, title: "Pilates pour sportifs", img: "/img/popular-classes/cours7.jpg" },
    { id: 8, title: "Pilates Yoga (PiYo ou Yogalates)", img:  "/img/popular-classes/cours8.jpg"  },
    { id: 9, title: "Pilates Ball / Swiss Ball", img: "/img/popular-classes/cours9.jpg" },
];

export const faqData = {

  about: {
    image: "/img/new/6.jpeg",
    title: "FAQ - À propos de nous",
    description: "Découvrez plus d’informations sur notre entreprise.",
    questions: [
      {
        question: "Depuis quand existez-vous ?",
        answer: "Nous existons depuis plus de 10 ans dans le domaine du bien-être."
      },
      {
        question: "Où se trouvent vos studios ?",
        answer: "Nous avons plusieurs studios dans la région."
      }
    ]
  },

  credits: {
    image: "/img/new/7.jpeg",
    title: "FAQ - En savoir plus sur les crédits et leurs utilités",
    description: "Quelques réponses avant de nous joindre directement.",
    questions: [
      {
        question: "Peut on partager des crédits ?",
        answer: "Vous pouvez nous appeler ou nous écrire via le formulaire."
      },
      {
        question: "Combien de crédits est nécessaire pour un cours ?",
        answer: "Nous sommes ouverts de 8h à 20h du lundi au samedi."
      }
    ]
  }
};

export const transactions = [
    {
      id: 1,
      type: 'Votre conmpte à été crédité',
      transactionId: '50919487',
      date: 'Le 23 Oct 18, 03:13 PM',
      amount: '+7 cr',
      isPositive: true
    },
    {
      id: 2,
      type: 'Votre conmpte à été débité',
      transactionId: '50919487',
      date: 'Le 23 Oct 18, 03:13 PM',
      amount: '-75 cr',
      isPositive: false
    },
    {
      id: 3,
      type: 'Votre conmpte à été crédité',
      transactionId: '50919487',
      date: 'Le 23 Oct 18, 03:13 PM',
      amount: '+75 cr',
      isPositive: true
    }
];

export const points = [
    {
      id: 1,
      type: 'Points crédités',
      transactionId: '50919487',
      date: 'Le 23 Oct 18, 03:13 PM',
      amount: '+7 cr',
      isPositive: true
    },
    {
      id: 2,
      type: 'Points débités',
      transactionId: '50919487',
      date: 'Le 23 Oct 18, 03:13 PM',
      amount: '-75 cr',
      isPositive: false
    },
    {
      id: 3,
      type: 'Points crédités',
      transactionId: '50919487',
      date: 'Le 23 Oct 18, 03:13 PM',
      amount: '+75 cr',
      isPositive: true
    }
];