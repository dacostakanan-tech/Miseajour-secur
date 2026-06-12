// Mock data for SG (Société Générale) clone

export const mainNav = [
  {
    label: 'Ouvrir un compte',
    items: [
      { title: 'Compte bancaire SG', desc: 'Pour les particuliers' },
      { title: 'Compte joint', desc: "À deux, en toute simplicité" },
      { title: 'Compte jeune', desc: 'De 12 à 24 ans' },
      { title: 'Changer de banque', desc: 'Mobilité bancaire SG' },
    ],
  },
  {
    label: 'Emprunter',
    items: [
      { title: 'Crédit immobilier', desc: 'Pour votre achat' },
      { title: 'Crédit auto', desc: 'Pour votre véhicule' },
      { title: 'Prêt personnel', desc: 'Tous projets' },
      { title: 'Rachat de crédits', desc: 'Une seule mensualité' },
    ],
  },
  {
    label: 'Épargner',
    items: [
      { title: 'Livret A', desc: 'Taux 2,4 %' },
      { title: 'Assurance-vie', desc: 'Faire fructifier' },
      { title: 'PEA / Bourse', desc: 'Investir en actions' },
      { title: 'Plan Épargne Logement', desc: 'Préparer un achat' },
    ],
  },
  {
    label: 'Assurer',
    items: [
      { title: 'Assurance habitation', desc: 'Protéger votre logement' },
      { title: 'Assurance auto', desc: 'Rouler tranquille' },
      { title: 'Assurance santé', desc: 'Mutuelle adaptée' },
      { title: 'Prévoyance', desc: 'Protéger vos proches' },
    ],
  },
  {
    label: 'Mes conseils',
    items: [
      { title: 'Premier salaire', desc: 'Bien démarrer' },
      { title: 'Premier achat immo', desc: 'Conseils experts' },
      { title: 'Sécurité et fraude', desc: 'Vous protéger' },
      { title: 'Retraite', desc: 'Préparer sereinement' },
    ],
  },
  {
    label: 'Services',
    items: [
      { title: "L'Appli SG", desc: 'Banque mobile' },
      { title: 'Paiements & virements', desc: 'Au quotidien' },
      { title: 'International', desc: 'Voyager, étudier' },
      { title: 'Trouver une agence', desc: '1 600 agences' },
    ],
  },
];

export const promoCards = [
  {
    bg: '#FFB7C5',
    overlay: '#F7889B',
    tag: 'OFFRE DE BIENVENUE',
    title: 'Vous avez entre 18 et 24 ans ?',
    cta: "Découvrez nos offres pour vous",
    image: 'https://images.unsplash.com/photo-1778500838953-6c54326f8d89?crop=entropy&cs=srgb&fm=jpg&q=85',
  },
  {
    bg: '#F5E6CF',
    overlay: '#E8D2A8',
    tag: 'BIENVENUE CHEZ SG',
    title: 'Gagnez du temps en ouvrant en ligne votre 1er compte bancaire.',
    cta: 'En profiter',
    image: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?crop=entropy&cs=srgb&fm=jpg&q=85',
  },
  {
    bg: '#E8F0F7',
    overlay: '#CFE0EE',
    tag: 'CONSEIL EXPERT',
    title: 'Un conseiller dédié dans votre agence SG.',
    cta: 'Prendre rendez-vous',
    image: 'https://images.unsplash.com/photo-1714974528703-e5ad41abc259?crop=entropy&cs=srgb&fm=jpg&q=85',
  },
];

export const advantages = [
  {
    icon: 'MapPin',
    title: 'Une banque ancrée dans votre territoire',
    desc: 'Plus de 1 600 agences en France et un conseiller dédié près de chez vous.',
  },
  {
    icon: 'Smartphone',
    title: "L'Appli SG plebiscitée par 5M de clients",
    desc: "4,7/5 sur l'App Store : virements instantanés, agrégation de comptes, assistant SG.",
  },
  {
    icon: 'Headphones',
    title: 'Un service client 6j/7',
    desc: 'Du lundi au samedi, par téléphone, chat ou messagerie sécurisée.',
  },
  {
    icon: 'Leaf',
    title: "Engagés pour l'environnement",
    desc: '60 Mds € dédiés à la transition énergétique d\u2019ici 2030.',
  },
];

export const news = [
  {
    category: 'Actualité',
    date: '8 juin 2025',
    title: 'Actifs numériques : la révolution qui bouscule la finance',
    image: 'https://images.pexels.com/photos/9300768/pexels-photo-9300768.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    category: 'Engagement',
    date: '21 mai 2025',
    title: 'SG, Partenaire Officiel du Crunch Creator',
    image: 'https://images.unsplash.com/photo-1514415008039-efa173293080?crop=entropy&cs=srgb&fm=jpg&q=85',
  },
  {
    category: 'Innovation',
    date: '11 mai 2025',
    title: 'Des actions locales concrètes pour le climat et la nature',
    image: 'https://images.unsplash.com/photo-1588979355313-6711a095465f?crop=entropy&cs=srgb&fm=jpg&q=85',
  },
];

export const otherSpaces = [
  { icon: 'Briefcase', title: 'Espace Client Professionnels', desc: 'Progeliance Net' },
  { icon: 'Building2', title: 'Espace Client Entreprises', desc: 'Sogecash Net' },
  { icon: 'Gem', title: 'Espace Banque Privée', desc: 'Gestion de fortune' },
  { icon: 'Globe2', title: 'SG à l\u2019international', desc: 'Filiales monde' },
];

export const usefulLinks = [
  {
    icon: 'CreditCard',
    title: 'Urgences carte bancaire',
    sublinks: [
      'Faire opposition à votre carte bancaire',
      'Recharger votre carte bancaire',
    ],
  },
  {
    icon: 'ShieldCheck',
    title: 'Nos conseils sécurité',
    sublinks: [
      'Découvrez SG Pass sécurité',
      'Guide des bonnes pratiques',
      'Voir les escroqueries identifiées',
    ],
  },
];

export const footerCols = [
  {
    title: 'Découvrir SG',
    links: ['Qui sommes-nous ?', 'Nos engagements', 'Recrutement', 'Actualités', 'Investisseurs'],
  },
  {
    title: 'Aide & contact',
    links: ['Centre d\u2019aide', 'Nous contacter', 'Trouver une agence', 'Aide sécurité', 'Médiateur'],
  },
  {
    title: 'Outils & services',
    links: ['L\u2019Appli SG', 'Espace client', 'Faire opposition', 'Suivre un dossier', 'Connaître mon plafond'],
  },
  {
    title: 'Informations légales',
    links: ['Conditions générales', 'Mentions légales', 'Cookies', 'Confidentialité', 'Accessibilité'],
  },
];

export const regions = [
  'SG Particuliers',
  'SG Régions',
  'SG Bretagne',
  'SG Ile-de-France',
  'SG Outre-mer',
  'SG Grand Est',
];

export const heroImage = 'https://images.unsplash.com/photo-1686723726446-8b881f37ce62?crop=entropy&cs=srgb&fm=jpg&q=85';
