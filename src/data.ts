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
  stage: Stage;
  progress: number; // 0-100
}

export const plants: Plant[] = [
  { id: "basilic", name: "Basilic", emoji: "🌿", stage: "Mûr", progress: 100 },
  { id: "menthe", name: "Menthe", emoji: "🍃", stage: "Croissance", progress: 68 },
  { id: "persil", name: "Persil", emoji: "🌱", stage: "Croissance", progress: 54 },
  { id: "coriandre", name: "Coriandre", emoji: "🌾", stage: "Germination", progress: 22 },
  { id: "ciboulette", name: "Ciboulette", emoji: "🧅", stage: "Germination", progress: 18 },
  { id: "thym", name: "Thym", emoji: "🌱", stage: "Semé", progress: 6 },
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
