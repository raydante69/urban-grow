/**
 * UrbanGrow Famille — données de l'application mobile (version Famille)
 *
 * Toutes les données affichées dans l'app. Pas de back-end : c'est une démo
 * fonctionnelle. Les recettes de l'app d'origine ont été remplacées par des
 * activités à faire en famille (voir `activities`), et une rubrique de jeux
 * d'apprentissage a été ajoutée (voir `games`).
 */

/* ------------------------------------------------------------------ */
/* Comptes de démo — le rôle (famille / enseignant) est défini "en interne" */
/* ------------------------------------------------------------------ */

/* Banque d'images réelles (photos UrbanGrow, optimisées et embarquées dans le
   projet -> aucune dépendance réseau externe, chargement fiable et hors ligne). */
export const img = {
  potager: "/img/potager.jpg",
  teaching: "/img/teaching.jpg",
  nature: "/img/nature.jpg",
  garden: "/img/garden.jpg",
  watering: "/img/watering.jpg",
  basilic: "/img/basilic.jpg",
  ciboulette: "/img/ciboulette.jpg",
  persil: "/img/persil.jpg",
  thym: "/img/thym.jpg",
  romarin: "/img/romarin.jpg",
  coriandre: "/img/coriandre.jpg",
  menthe: "/img/menthe.jpg",
};

export type Role = "family" | "teacher";

export interface Account {
  email: string;
  password: string;
  role: Role;
  name: string;
  avatar: string; // emoji
}

export const accounts: Account[] = [
  {
    email: "famille@urbangrow.fr",
    password: "famille",
    role: "family",
    name: "Famille Martin",
    avatar: "👨‍👩‍👧‍👦",
  },
  {
    email: "prof@urbangrow.fr",
    password: "prof",
    role: "teacher",
    name: "Mme Dubois",
    avatar: "🧑‍🏫",
  },
];

/* ------------------------------------------------------------------ */
/* Potager connecté — tableau de bord (page Accueil)                   */
/* ------------------------------------------------------------------ */

export type Stage = "Mûr" | "Croissance" | "Germination" | "Semé";

export interface Plant {
  id: string;
  name: string;
  emoji: string;
  image: string;
  stage: Stage;
  progress: number; // 0-100
}

export const plants: Plant[] = [
  { id: "basilic", name: "Basilic", emoji: "🌿", image: img.basilic, stage: "Mûr", progress: 100 },
  { id: "menthe", name: "Menthe", emoji: "🍃", image: img.menthe, stage: "Croissance", progress: 68 },
  { id: "persil", name: "Persil", emoji: "🌱", image: img.persil, stage: "Croissance", progress: 54 },
  { id: "coriandre", name: "Coriandre", emoji: "🌾", image: img.coriandre, stage: "Germination", progress: 22 },
  { id: "ciboulette", name: "Ciboulette", emoji: "🧅", image: img.ciboulette, stage: "Germination", progress: 18 },
  { id: "thym", name: "Thym", emoji: "🌱", image: img.thym, stage: "Semé", progress: 6 },
];

export const sensors = {
  humidity: 62, // %
  light: 4200, // lux
  water: 35, // % réservoir
  temperature: 21, // °C
};

/**
 * Conseils intelligents du potager. L'app d'origine suggérait des *recettes*
 * de cuisine — on les remplace par des suggestions d'activités en famille.
 */
export const advice = [
  {
    id: "water",
    icon: "💧",
    tone: "warn" as const,
    title: "Réservoir bientôt vide",
    text: "Le niveau d'eau est à 35 %. Pensez à remplir le réservoir d'ici 2 jours.",
    cta: "Voir le tuto",
    to: "/activites/arrosage-malin",
  },
  {
    id: "harvest",
    icon: "🌿",
    tone: "good" as const,
    title: "Le basilic est prêt !",
    text: "Récoltez votre basilic en famille et lancez une activité jardinage avec les enfants.",
    cta: "Activité famille",
    to: "/activites/recolte-en-famille",
  },
  {
    id: "rotation",
    icon: "🔄",
    tone: "info" as const,
    title: "Pensez à la rotation",
    text: "Deux bacs se libèrent bientôt. Semez de nouvelles graines avec vos enfants.",
    cta: "Activité famille",
    to: "/activites/semis-premiers-pas",
  },
];

export const impact = {
  water: "240 L",
  carbon: "12 kg",
  savings: "28 €",
};

/* ------------------------------------------------------------------ */
/* Activités à faire en famille (remplacent les recettes)              */
/* Chaque bloc est cliquable -> tutoriel détaillé pas à pas            */
/* ------------------------------------------------------------------ */

export interface ActivityStep {
  title: string;
  text: string;
}

export interface Activity {
  id: string;
  title: string;
  emoji: string;
  image: string;
  category: string;
  color: string; // teinte de fond (classe tailwind arbitraire)
  age: string;
  duration: string;
  difficulty: "Facile" | "Moyen" | "Aventure";
  intro: string;
  materials: string[];
  steps: ActivityStep[];
  tip: string;
}

export const activities: Activity[] = [
  {
    id: "semis-premiers-pas",
    title: "Mes premiers semis",
    emoji: "🌱",
    image: img.potager,
    category: "Jardinage",
    color: "#DCFCE7",
    age: "3-10 ans",
    duration: "30 min",
    difficulty: "Facile",
    intro:
      "Plantez vos premières graines ensemble et observez la magie de la germination jour après jour.",
    materials: [
      "Des graines (basilic, persil…)",
      "Un bac du potager UrbanGrow (ou un pot)",
      "Du terreau",
      "Un petit arrosoir",
      "Une étiquette à décorer",
    ],
    steps: [
      { title: "Préparer le bac", text: "Remplissez le bac de terreau jusqu'à 1 cm du bord. Laissez l'enfant tasser doucement avec ses mains." },
      { title: "Semer les graines", text: "Déposez 2 à 3 graines par trou, à 1 cm de profondeur. Comptez les graines à voix haute, c'est aussi un jeu !" },
      { title: "Recouvrir et arroser", text: "Recouvrez de terreau et arrosez en pluie fine. La terre doit être humide, pas détrempée." },
      { title: "Décorer l'étiquette", text: "Dessinez la plante sur l'étiquette et plantez-la dans le bac pour savoir ce qui pousse." },
      { title: "Observer chaque jour", text: "Notez ensemble la date. Les premières pousses apparaissent en 5 à 10 jours : un vrai rendez-vous quotidien !" },
    ],
    tip: "Astuce : prenez une photo chaque jour pour faire un petit film de la pousse à la fin.",
  },
  {
    id: "recolte-en-famille",
    title: "La grande récolte",
    emoji: "🧺",
    image: img.basilic,
    category: "Jardinage",
    color: "#FEF9C3",
    age: "4-12 ans",
    duration: "20 min",
    difficulty: "Facile",
    intro:
      "Les herbes sont mûres ! Apprenez à récolter sans abîmer la plante pour qu'elle repousse encore et encore.",
    materials: ["Des ciseaux à bouts ronds", "Un petit panier", "Vos plantes mûres"],
    steps: [
      { title: "Repérer ce qui est prêt", text: "Cherchez les tiges les plus hautes et les plus fournies. Le basilic est prêt quand il a au moins 6 feuilles." },
      { title: "Couper au bon endroit", text: "Coupez juste au-dessus d'une paire de feuilles : deux nouvelles tiges repousseront à cet endroit." },
      { title: "Remplir le panier", text: "Laissez l'enfant déposer délicatement les feuilles dans le panier sans les écraser." },
      { title: "Sentir et goûter", text: "Froissez une feuille entre les doigts et sentez le parfum. Décrivez ensemble l'odeur : c'est un atelier sensoriel !" },
    ],
    tip: "Ne récoltez jamais plus d'un tiers de la plante d'un coup : elle doit garder des feuilles pour grandir.",
  },
  {
    id: "arrosage-malin",
    title: "L'arrosage malin",
    emoji: "💧",
    image: img.watering,
    category: "Jardinage",
    color: "#DBEAFE",
    age: "3-8 ans",
    duration: "10 min",
    difficulty: "Facile",
    intro:
      "Comprendre de combien d'eau une plante a besoin, et apprendre à remplir le réservoir du potager.",
    materials: ["Le réservoir du potager", "Une bouteille d'eau", "Un doigt curieux"],
    steps: [
      { title: "Le test du doigt", text: "Enfoncez un doigt dans la terre : si c'est sec sur 2 cm, la plante a soif." },
      { title: "Remplir le réservoir", text: "Versez l'eau doucement jusqu'au repère « max ». Observez le niveau monter." },
      { title: "Parler aux plantes", text: "On dit que parler aux plantes les aide à pousser. Vrai ou faux ? Faites l'expérience sur 2 semaines !" },
    ],
    tip: "Trop d'eau noie les racines. Mieux vaut un peu, souvent, que beaucoup d'un coup.",
  },
  {
    id: "herbier-maison",
    title: "Un herbier maison",
    emoji: "📗",
    image: img.nature,
    category: "Créatif",
    color: "#F3E8FF",
    age: "5-12 ans",
    duration: "45 min",
    difficulty: "Moyen",
    intro:
      "Conservez vos plus belles feuilles et créez un herbier souvenir à feuilleter toute l'année.",
    materials: ["Des feuilles cueillies", "Du papier épais", "De gros livres", "De la colle", "Des feutres"],
    steps: [
      { title: "Cueillir et choisir", text: "Sélectionnez des feuilles bien à plat, sans taches. Variez les formes et les tailles." },
      { title: "Presser les feuilles", text: "Glissez-les entre deux feuilles de papier, sous une pile de livres. Patientez 1 semaine." },
      { title: "Coller et nommer", text: "Collez chaque feuille sur une page et écrivez son nom et la date à côté." },
      { title: "Décorer la couverture", text: "Donnez un titre à votre herbier et décorez la couverture en famille." },
    ],
    tip: "Profitez de la pause d'une semaine pour observer comment les feuilles changent de couleur en séchant.",
  },
  {
    id: "chasse-au-tresor-nature",
    title: "Chasse au trésor nature",
    emoji: "🔎",
    image: img.garden,
    category: "Exploration",
    color: "#FFE4E6",
    age: "4-10 ans",
    duration: "1 h",
    difficulty: "Aventure",
    intro:
      "Une chasse au trésor sensorielle dans le parc ou le jardin pour réveiller la curiosité des explorateurs.",
    materials: ["La liste de trésors (à imprimer ou dessiner)", "Un sac de collecte", "De bonnes chaussures"],
    steps: [
      { title: "Préparer la liste", text: "Dessinez ensemble 8 trésors à trouver : une feuille rouge, un caillou lisse, quelque chose qui sent bon…" },
      { title: "Partir en exploration", text: "Direction le parc ! Chaque trésor trouvé est coché sur la liste." },
      { title: "Observer avec les 5 sens", text: "À chaque trouvaille, demandez : c'est doux ? Ça sent quoi ? Ça fait quel bruit ?" },
      { title: "Le trésor final", text: "De retour à la maison, étalez la collecte et racontez l'aventure. Gardez un trésor pour l'herbier !" },
    ],
    tip: "Adaptez la liste à la saison : pommes de pin en automne, fleurs au printemps.",
  },
  {
    id: "pot-recycle",
    title: "Un pot à partir d'un déchet",
    emoji: "♻️",
    image: img.romarin,
    category: "Créatif",
    color: "#CCFBF1",
    age: "5-12 ans",
    duration: "40 min",
    difficulty: "Moyen",
    intro:
      "Transformez une boîte d'œufs ou une bouteille en pot à semis : un atelier récup' bon pour la planète.",
    materials: ["Une boîte d'œufs ou bouteille", "Des ciseaux", "Du terreau", "Des graines", "De la peinture"],
    steps: [
      { title: "Choisir son déchet", text: "Une boîte d'œufs fait 6 mini-pots, une bouteille coupée en fait un grand. À vous de choisir !" },
      { title: "Préparer le pot", text: "Un adulte perce un petit trou au fond pour l'eau. Décorez ensuite à la peinture." },
      { title: "Remplir et semer", text: "Ajoutez le terreau et semez une graine par alvéole." },
      { title: "Installer au potager", text: "Posez vos pots récup' près du potager et arrosez. Bravo, vous avez sauvé un déchet !" },
    ],
    tip: "La boîte d'œufs en carton peut être plantée directement en terre : elle se décompose toute seule.",
  },
];

/* ------------------------------------------------------------------ */
/* Jeux d'apprentissage (nouvelle rubrique)                            */
/* ------------------------------------------------------------------ */

export type GameType = "memory" | "quiz" | "count";

export interface Game {
  id: string;
  title: string;
  emoji: string;
  image: string;
  type: GameType;
  color: string;
  age: string;
  skill: string;
  description: string;
}

export const games: Game[] = [
  {
    id: "memory-plantes",
    title: "Memory des plantes",
    emoji: "🃏",
    image: img.garden,
    type: "memory",
    color: "#DCFCE7",
    age: "3-8 ans",
    skill: "Mémoire & observation",
    description: "Retrouve les paires de plantes identiques. Trouve-les toutes avec le moins de coups possible !",
  },
  {
    id: "quiz-nature",
    title: "Quiz de la nature",
    emoji: "🧠",
    image: img.teaching,
    type: "quiz",
    color: "#DBEAFE",
    age: "6-12 ans",
    skill: "Connaissances",
    description: "Réponds aux questions sur les plantes, les saisons et le jardinage. Deviens un·e expert·e du potager !",
  },
  {
    id: "compte-graines",
    title: "Compte les graines",
    emoji: "🔢",
    image: img.potager,
    type: "count",
    color: "#FEF9C3",
    age: "3-6 ans",
    skill: "Calcul & nombres",
    description: "Compte les graines tombées dans le bac et choisis le bon chiffre. Parfait pour apprendre à compter !",
  },
];

// Cartes du jeu de memory (chaque emoji forme une paire)
export const memoryEmojis = ["🌿", "🍅", "🥕", "🌻", "🍓", "🌽"];

// Questions du quiz nature
export interface QuizQuestion {
  question: string;
  emoji: string;
  options: string[];
  answer: number; // index de la bonne réponse
  fact: string; // anecdote affichée après la réponse
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "De quoi une plante a-t-elle besoin pour pousser ?",
    emoji: "🌱",
    options: ["De lumière et d'eau", "De bonbons", "De télévision"],
    answer: 0,
    fact: "Les plantes fabriquent leur nourriture grâce à la lumière : c'est la photosynthèse !",
  },
  {
    question: "Quelle partie de la plante pousse sous la terre ?",
    emoji: "🥕",
    options: ["Les fleurs", "Les racines", "Les feuilles"],
    answer: 1,
    fact: "Les racines boivent l'eau et tiennent la plante bien droite dans le sol.",
  },
  {
    question: "À quelle saison sème-t-on le plus de graines ?",
    emoji: "🌷",
    options: ["En hiver", "Au printemps", "Jamais"],
    answer: 1,
    fact: "Au printemps, il fait plus doux et les jours rallongent : parfait pour les semis !",
  },
  {
    question: "Quel petit animal aide les fleurs en transportant le pollen ?",
    emoji: "🐝",
    options: ["L'abeille", "Le requin", "Le pingouin"],
    answer: 0,
    fact: "Les abeilles butinent de fleur en fleur et permettent aux fruits de se former. Merci les abeilles !",
  },
  {
    question: "Que devient un trognon de pomme au compost ?",
    emoji: "🍎",
    options: ["Du plastique", "De la terre riche", "De l'eau"],
    answer: 1,
    fact: "Au compost, les déchets se transforment en terreau qui nourrit de nouvelles plantes.",
  },
];

/* ------------------------------------------------------------------ */
/* Contenu pédagogique (sans recettes)                                 */
/* ------------------------------------------------------------------ */

export interface Article {
  id: string;
  title: string;
  emoji: string;
  image: string;
  category: string;
  read: string;
  excerpt: string;
  body: string[];
}

export const articles: Article[] = [
  {
    id: "pourquoi-jardiner-en-famille",
    title: "Pourquoi jardiner en famille ?",
    emoji: "👨‍👩‍👧",
    image: img.teaching,
    category: "Bien-être",
    read: "3 min",
    excerpt: "Le jardinage partagé renforce les liens et apprend la patience aux enfants.",
    body: [
      "Jardiner ensemble, c'est bien plus que faire pousser des plantes. C'est partager un moment, observer le vivant et apprendre la patience.",
      "Les enfants qui jardinent goûtent plus facilement les légumes : ils sont fiers de manger ce qu'ils ont fait pousser.",
      "C'est aussi une excellente activité pour ralentir, se déconnecter des écrans et reconnecter toute la famille à la nature, même en appartement.",
    ],
  },
  {
    id: "le-cycle-d-une-plante",
    title: "Le cycle de vie d'une plante",
    emoji: "🔄",
    image: img.nature,
    category: "Sciences",
    read: "4 min",
    excerpt: "De la graine à la récolte : les grandes étapes à observer avec les enfants.",
    body: [
      "Tout commence par une graine. À l'intérieur dort une mini-plante qui attend l'eau et la chaleur pour se réveiller.",
      "Vient ensuite la germination : une petite racine descend, une tige monte vers la lumière. Puis les feuilles se déploient.",
      "La plante grandit, fleurit, et donne parfois des fruits qui contiennent… de nouvelles graines. Et le cycle recommence !",
    ],
  },
  {
    id: "apprendre-en-jouant",
    title: "Apprendre sans s'en rendre compte",
    emoji: "🎲",
    image: img.garden,
    category: "Pédagogie",
    read: "3 min",
    excerpt: "Le jeu est la façon la plus naturelle d'apprendre pour un enfant.",
    body: [
      "Les neurosciences le confirment : on retient bien mieux ce que l'on apprend dans le plaisir et le mouvement.",
      "Compter des graines, trier des feuilles, gagner un quiz : derrière chaque jeu de l'application se cache un apprentissage.",
      "Laissez l'enfant se tromper et recommencer. L'erreur fait partie du jeu — et de l'apprentissage !",
    ],
  },
  {
    id: "les-bienfaits-des-herbes",
    title: "Les bienfaits des herbes fraîches",
    emoji: "🌿",
    image: img.coriandre,
    category: "Santé",
    read: "3 min",
    excerpt: "Pourquoi cultiver ses herbes change la cuisine et la santé de la famille.",
    body: [
      "Les herbes fraîches sont de vraies bombes de vitamines, bien plus que celles qui ont voyagé plusieurs jours en supermarché.",
      "Leur parfum transforme un plat simple en festin, et permet de réduire le sel naturellement.",
      "Avoir des herbes à portée de main, c'est inviter les enfants à assaisonner eux-mêmes leur assiette : ils adorent ça !",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Communauté                                                          */
/* ------------------------------------------------------------------ */

export interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  tag: string;
}

export const posts: Post[] = [
  {
    id: "p1",
    author: "Famille Leroy",
    avatar: "👩‍👧",
    time: "il y a 2 h",
    text: "Première récolte de basilic avec Léa (5 ans) ! Elle a adoré couper les feuilles. On a fait l'activité « La grande récolte » 🌿",
    likes: 42,
    comments: 8,
    tag: "Récolte",
  },
  {
    id: "p2",
    author: "Papa de Noé",
    avatar: "👨",
    time: "il y a 5 h",
    text: "Le quiz nature est top, mon fils a eu 5/5 ! Il m'a appris ce qu'est la photosynthèse 😅",
    likes: 31,
    comments: 5,
    tag: "Jeux",
  },
  {
    id: "p3",
    author: "Famille Said",
    avatar: "👨‍👧‍👦",
    time: "hier",
    text: "Notre herbier maison est terminé après 1 semaine de séchage. Les enfants sont super fiers du résultat 📗",
    likes: 67,
    comments: 12,
    tag: "Créatif",
  },
  {
    id: "p4",
    author: "Maman Zen",
    avatar: "👩",
    time: "hier",
    text: "On a transformé une boîte d'œufs en pots à semis. Zéro déchet et les petits ont adoré peindre ♻️",
    likes: 28,
    comments: 3,
    tag: "Récup'",
  },
];

/* Navigation principale (barre du bas) */
export const familyNav = [
  { to: "/", label: "Accueil", icon: "Home" },
  { to: "/activites", label: "Activités", icon: "Sprout" },
  { to: "/jeux", label: "Jeux", icon: "Gamepad2" },
  { to: "/contenu", label: "Contenu", icon: "BookOpen" },
  { to: "/communaute", label: "Famille", icon: "Users" },
];

/* ================================================================== */
/* ESPACE ENSEIGNANT                                                   */
/* Suivi collectif + séances pédagogiques clé-en-main (valeur BtoB).   */
/* ================================================================== */

export const teacherNav = [
  { to: "/enseignant", label: "Accueil", icon: "LayoutDashboard" },
  { to: "/enseignant/classe", label: "Ma classe", icon: "Users" },
  { to: "/enseignant/seances", label: "Séances", icon: "ClipboardList" },
  { to: "/enseignant/ressources", label: "Ressources", icon: "FolderOpen" },
  { to: "/enseignant/profil", label: "Classe", icon: "School" },
];

/* Informations de la classe (modifiables dans Profil / Classe) */
export interface ClassInfo {
  name: string;
  school: string;
  level: string;
}
export const defaultClassInfo: ClassInfo = {
  name: "CE1 B",
  school: "École Jean Jaurès",
  level: "CE1",
};

/* Potager partagé de la classe + alertes techniques (tableau de bord) */
export const classGarden = {
  bacs: 4,
  plantsActive: 10,
  alerts: [
    { id: "water", icon: "💧", tone: "warn" as const, title: "Réservoir bas (bac 3)", text: "Niveau d'eau à 28 %. À remplir avant la prochaine séance." },
    { id: "light", icon: "💡", tone: "info" as const, title: "Lumière à vérifier (bac 1)", text: "Intensité plus faible que d'habitude. Vérifier la LED horticole." },
  ],
};

/* Prochaine séance prévue (widget accueil) */
export const nextSession = {
  sessionId: "compter-graines",
  title: "Compter les graines",
  discipline: "Maths",
  date: "Lundi 29 juin",
  time: "10 h 30",
};

/* Élèves de la classe (suivi de progression, pas de notes) */
export type StudentStatus = "en-retard" | "a-jour" | "avance";

export interface Student {
  id: string;
  name: string;
  avatar: string;
  progress: number; // 0-100, avancement sur le programme
  activitiesDone: number;
  activitiesTotal: number;
  badges: number;
  status: StudentStatus;
  scores: { quiz: number; memory: number; count: number; cycle: number }; // /100
}

export const seedStudents: Student[] = [
  { id: "lea", name: "Léa M.", avatar: "👧", progress: 92, activitiesDone: 11, activitiesTotal: 12, badges: 5, status: "avance", scores: { quiz: 100, memory: 90, count: 95, cycle: 80 } },
  { id: "noe", name: "Noé B.", avatar: "👦", progress: 74, activitiesDone: 9, activitiesTotal: 12, badges: 4, status: "a-jour", scores: { quiz: 80, memory: 70, count: 85, cycle: 60 } },
  { id: "camille", name: "Camille D.", avatar: "🧒", progress: 68, activitiesDone: 8, activitiesTotal: 12, badges: 3, status: "a-jour", scores: { quiz: 60, memory: 80, count: 70, cycle: 60 } },
  { id: "sofia", name: "Sofia R.", avatar: "👧🏽", progress: 88, activitiesDone: 10, activitiesTotal: 12, badges: 5, status: "avance", scores: { quiz: 90, memory: 85, count: 90, cycle: 90 } },
  { id: "lucas", name: "Lucas P.", avatar: "👦🏾", progress: 41, activitiesDone: 5, activitiesTotal: 12, badges: 2, status: "en-retard", scores: { quiz: 50, memory: 40, count: 45, cycle: 30 } },
  { id: "jade", name: "Jade L.", avatar: "👧🏻", progress: 63, activitiesDone: 8, activitiesTotal: 12, badges: 3, status: "a-jour", scores: { quiz: 70, memory: 65, count: 60, cycle: 55 } },
  { id: "adam", name: "Adam K.", avatar: "🧒🏽", progress: 36, activitiesDone: 4, activitiesTotal: 12, badges: 1, status: "en-retard", scores: { quiz: 40, memory: 35, count: 50, cycle: 20 } },
];

/* Séances pédagogiques clé-en-main (objectifs programme déjà écrits) */
export type Discipline = "SVT" | "Maths" | "Français";

export interface Session {
  id: string;
  title: string;
  emoji: string;
  image: string;
  discipline: Discipline;
  level: string;
  duration: string;
  objective: string;
  skills: string[];
  linkedGameId?: string;
  linkedActivityId?: string;
  sheet: string; // nom de la fiche à télécharger
  materials: string[];
  steps: ActivityStep[];
}

export const sessions: Session[] = [
  {
    id: "compter-graines",
    title: "Compter les graines",
    emoji: "🔢",
    image: img.potager,
    discipline: "Maths",
    level: "CP",
    duration: "45 min",
    objective: "Dénombrer une quantité de 1 à 10 et comparer deux collections de graines.",
    skills: ["Dénombrement", "Comparaison de quantités", "Vocabulaire : plus / moins / autant"],
    linkedGameId: "compte-graines",
    sheet: "Fiche élève — Compter les graines (CP).pdf",
    materials: ["Graines (haricots, pois)", "Tablettes ou TBI pour le jeu", "Fiche élève photocopiée"],
    steps: [
      { title: "Mise en situation (10 min)", text: "Manipulation : chaque élève compte de vraies graines déposées dans sa coupelle." },
      { title: "Jeu sur tablette (15 min)", text: "Les élèves jouent à « Compte les graines » par binômes et valident leurs réponses." },
      { title: "Fiche d'application (15 min)", text: "Distribuer la fiche : entourer le bon chiffre, comparer deux bacs." },
      { title: "Mise en commun (5 min)", text: "Retour collectif au tableau sur les stratégies de comptage." },
    ],
  },
  {
    id: "cycle-de-vie",
    title: "Du semis à la pousse",
    emoji: "🌱",
    image: img.nature,
    discipline: "SVT",
    level: "CE1",
    duration: "1 h + suivi",
    objective: "Identifier les grandes étapes du cycle de vie d'une plante et les besoins du vivant.",
    skills: ["Cycle du vivant", "Observation scientifique", "Besoins d'une plante (eau, lumière)"],
    linkedActivityId: "semis-premiers-pas",
    sheet: "Fiche d'observation — Du semis à la pousse.pdf",
    materials: ["Bac du potager de la classe", "Graines de basilic", "Carnet d'observation par élève"],
    steps: [
      { title: "Semis collectif (20 min)", text: "La classe sème ensemble et formule des hypothèses : que va-t-il se passer ?" },
      { title: "Carnet d'observation", text: "Chaque semaine, les élèves dessinent et datent l'évolution de la pousse." },
      { title: "Synthèse (20 min)", text: "Reconstituer la frise du cycle : graine → germination → plante → fleur → graine." },
    ],
  },
  {
    id: "quiz-besoins",
    title: "Les besoins des plantes",
    emoji: "🧠",
    image: img.teaching,
    discipline: "SVT",
    level: "CE1 – CE2",
    duration: "30 min",
    objective: "Réinvestir et évaluer les connaissances sur ce dont une plante a besoin pour grandir.",
    skills: ["Besoins du vivant", "Argumentation orale", "Réinvestissement"],
    linkedGameId: "quiz-nature",
    sheet: "Fiche bilan — Les besoins du vivant.pdf",
    materials: ["TBI ou vidéoprojecteur", "Cartes réponses A/B/C"],
    steps: [
      { title: "Quiz collectif (15 min)", text: "Projeter « Quiz de la nature » : la classe vote, on justifie chaque réponse." },
      { title: "Trace écrite (15 min)", text: "Compléter la fiche bilan avec les mots-clés : lumière, eau, racines, photosynthèse." },
    ],
  },
  {
    id: "mots-du-potager",
    title: "L'imagier du potager",
    emoji: "🔤",
    image: img.coriandre,
    discipline: "Français",
    level: "CP",
    duration: "40 min",
    objective: "Enrichir le lexique du jardin et associer chaque mot à son image.",
    skills: ["Lexique thématique", "Langage oral", "Correspondance mot / image"],
    sheet: "Imagier du potager — à découper.pdf",
    materials: ["Imagier photocopié", "Ciseaux, colle", "Étiquettes-mots"],
    steps: [
      { title: "Découverte (15 min)", text: "Nommer collectivement les plantes du potager de la classe." },
      { title: "Atelier (20 min)", text: "Associer chaque étiquette-mot à la bonne image et coller dans le cahier." },
      { title: "Restitution (5 min)", text: "Quelques élèves relisent leur imagier à voix haute." },
    ],
  },
  {
    id: "mesurer-croissance",
    title: "Mesurer la croissance",
    emoji: "📏",
    image: img.garden,
    discipline: "Maths",
    level: "CE2",
    duration: "45 min",
    objective: "Mesurer une longueur en centimètres et représenter l'évolution sur un graphique simple.",
    skills: ["Mesure de longueurs", "Grandeurs et données", "Lecture de graphique"],
    sheet: "Carnet de pousse — relevés et graphique.pdf",
    materials: ["Règles graduées", "Plantes du potager", "Carnet de pousse collectif"],
    steps: [
      { title: "Relevé (15 min)", text: "Par groupes, les élèves mesurent la hauteur de leur plante en cm." },
      { title: "Report (20 min)", text: "Reporter la mesure dans le carnet et placer le point sur le graphique." },
      { title: "Lecture (10 min)", text: "Observer la courbe : la plante a-t-elle poussé vite ? lentement ?" },
    ],
  },
  {
    id: "memory-plantes-classe",
    title: "Memory des plantes",
    emoji: "🃏",
    image: img.menthe,
    discipline: "SVT",
    level: "GS – CP",
    duration: "25 min",
    objective: "Mémoriser et nommer les plantes aromatiques du potager.",
    skills: ["Mémoire visuelle", "Lexique des plantes", "Coopération"],
    linkedGameId: "memory-plantes",
    sheet: "Cartes Memory — à imprimer.pdf",
    materials: ["Jeu projeté ou cartes imprimées", "Plantes réelles pour comparaison"],
    steps: [
      { title: "Jeu en groupe (15 min)", text: "Les élèves jouent au Memory et nomment chaque plante trouvée." },
      { title: "Prolongement (10 min)", text: "Retrouver les plantes du jeu dans le vrai potager de la classe." },
    ],
  },
];

/* Ressources pédagogiques (fiches imprimables, articles classe, programmes) */
export type ResourceType = "Fiche" | "Article" | "Programme";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  emoji: string;
  description: string;
  format: string; // ex. "PDF · A4", "Lien"
}

export const resources: Resource[] = [
  { id: "fiche-observation", title: "Fiche d'observation hebdomadaire", type: "Fiche", emoji: "📋", description: "À photocopier : dessin de la pousse, date, mesure et météo de la semaine.", format: "PDF · A4" },
  { id: "carnet-pousse", title: "Carnet de pousse collectif", type: "Fiche", emoji: "📒", description: "Carnet de la classe pour suivre chaque bac du semis à la récolte.", format: "PDF · 8 pages" },
  { id: "imagier", title: "Imagier du potager", type: "Fiche", emoji: "🖼️", description: "Cartes mot/image des plantes et outils du jardin, à découper.", format: "PDF · A4" },
  { id: "article-ecole", title: "Pourquoi un potager à l'école ?", type: "Article", emoji: "🏫", description: "Article court à projeter : les bénéfices pédagogiques du jardinage en classe.", format: "Lecture · 3 min" },
  { id: "article-photosynthese", title: "La photosynthèse expliquée aux enfants", type: "Article", emoji: "☀️", description: "Une explication simple et imagée, adaptée au cycle 2.", format: "Lecture · 4 min" },
  { id: "programme-c2", title: "Questionner le monde — cycle 2", type: "Programme", emoji: "🎯", description: "Repères de progression et compétences du programme couvertes par les séances.", format: "Référentiel" },
];
