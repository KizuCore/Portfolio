import fr from "../locales/fr.json";

export type BusinessPage = {
  path: string;
  kind: "service" | "case-study";
  eyebrow: string;
  title: string;
  seoTitle?: string;
  description: string;
  intro: string;
  tags: string[];
  overview?: { label: string; value: string; detail: string }[];
  gallery?: {
    title: string;
    description: string;
    enlarge: string;
    images: { src: string; alt: string; title: string; caption: string }[];
  };
  sections: { id?: string; title: string; text: string; items?: string[]; links?: { path: string; label: string }[] }[];
  questions: { question: string; answer: string }[];
};

// Le contenu rédactionnel est partagé par React et la génération SEO statique. Les affirmations doivent rester factuelles.
// Les services restent en français ; les études de cas utilisent les fichiers JSON de traduction partagés.
export const BUSINESS_PAGES: BusinessPage[] = [
  {
    path: "/services/developpement-api",
    kind: "service",
    eyebrow: "API & backend · Rennes",
    title: "Développement d’API sur mesure à Rennes",
    description: "Théo Guérin, développeur freelance à Rennes : création et intégration d’API avec Django (Python) ou Node.js, authentification et bases de données.",
    intro: "Vous avez une interface à connecter, des données à partager ou des échanges entre outils à automatiser ? Je développe et intègre des API avec Django (Python) ou Node.js. Nous définissons les échanges, les accès et les erreurs à gérer avant de construire le service.",
    tags: ["API REST", "Django · Python", "Node.js", "Intégrations"],
    sections: [
      { title: "Partir des échanges dont vous avez besoin", text: "Nous identifions les données à exposer, les actions possibles et les utilisateurs autorisés. L’API est définie autour de ces usages, qu’elle alimente une interface React, une application Flutter ou un outil interne.", items: ["Définition des endpoints et des formats de réponse.", "Validation des entrées, gestion des erreurs et règles métier.", "Authentification et permissions selon les rôles."] },
      { title: "Django ou Node.js : choisir selon le projet", text: "Le choix dépend de votre code existant, de votre équipe et des services à connecter. Django permet de construire un backend Python avec ses modèles de données et son administration. Node.js permet de développer les services côté serveur en JavaScript ou TypeScript. Nous retenons la solution adaptée au périmètre et à la maintenance attendue." },
      { links: [{"path":"/fr/experience","label":"Mon expérience API et intégrations chez Nahibu"}], title: "Relier vos applications et vos services", text: "Je peux créer une API ou intégrer celle d’un prestataire : catalogue, commandes, formulaires ou notifications. Chez Nahibu, j’ai développé une API Node.js avec Sequelize (ORM) qui synchronise les données utilisateurs entre WooCommerce, l’espace client et Brevo. Mon expérience comprend aussi l’intégration de Systempay et LimeSurvey.", items: ["Connexion aux bases PostgreSQL ou MySQL selon le projet.", "Gestion des identifiants techniques côté serveur.", "Traitement des erreurs et des réponses des services externes."] },
      { title: "Livrer une API que vous pouvez reprendre", text: "La mission comprend un périmètre et des livrables définis ensemble. La documentation et les vérifications portent sur les échanges réellement utilisés par votre application.", items: ["Exemples de requêtes et description des réponses.", "Tests des parcours importants et des accès autorisés.", "Préparation du déploiement et transmission des informations utiles."] },
    ],
    questions: [
      { question: "Faut-il choisir Django ou Node.js avant de vous contacter ?", answer: "Non. Présentez-moi votre besoin et votre environnement actuel. Nous pouvons choisir la technologie lors du cadrage, en tenant compte de la maintenance et des contraintes d’hébergement." },
      { question: "Pouvez-vous intégrer une API existante ?", answer: "Oui. Je commence par sa documentation, ses moyens d’authentification et ses limites d’utilisation pour définir les échanges et les cas d’erreur à gérer." },
      { question: "Pouvez-vous faire évoluer un backend Django ?", answer: "Oui. Je propose aussi des interventions dédiées à Django : reprise de code, évolution des modèles de données, ajout de fonctionnalités et maintenance. La page Développement Django détaille cette offre." },
    ],
  },
  { path: "/realisations/la-maree-malouine", kind: "case-study", ...fr.business_pages.cases["la-maree-malouine"] },
  { path: "/realisations/a-table", kind: "case-study", ...fr.business_pages.cases["a-table"] },
  {
    path: "/services/developpeur-react",
    kind: "service",
    eyebrow: "Développement d’applications · Rennes",
    title: "Développeur React freelance à Rennes",
    description: "Théo Guérin, développeur React freelance à Rennes : interfaces TypeScript, applications web et intégration API. Échangeons sur votre projet.",
    intro: "Un espace client, un tableau de bord ou une application métier à créer ? Développeur React et TypeScript à Rennes, je construis des interfaces connectées à vos données. J’interviens aussi sur un projet existant pour ajouter des fonctionnalités, corriger les parcours et préparer sa mise en ligne.",
    tags: ["React", "TypeScript", "API REST", "Tests automatisés"],
    sections: [
      { title: "Une interface pensée pour vos utilisateurs", text: "Je développe des interfaces qui rendent les actions essentielles faciles à comprendre, sur ordinateur comme sur mobile.", items: ["Applications métier, tableaux de bord et formulaires.", "Composants réutilisables et parcours accessibles au clavier.", "Intégration de vos API, avec gestion des chargements et des erreurs."] },
      { title: "Faire évoluer un projet existant", text: "Je commence par comprendre votre code, vos contraintes et les difficultés rencontrées. Nous définissons ensuite les changements prioritaires et leur périmètre.", items: ["Ajout de fonctionnalités et correction de bugs.", "Séparation de l’interface, des données et de la logique métier.", "Tests des parcours importants et préparation du déploiement."] },
      { links: [{"path":"/fr/realisations/la-maree-malouine","label":"Voir l’application React La Marée Malouine"}], title: "Une expérience concrète du front au back", text: "Chez Nahibu, je développe des interfaces React et des API REST avec Django et Flask, ainsi qu’une API Node.js avec Sequelize pour synchroniser les données utilisateurs entre WooCommerce, l’espace client et Brevo. Le frontend Flambow associe React et TypeScript à des tests Vitest et Playwright. Ces expériences nourrissent ma façon de concevoir des interfaces reliées à des services réels." },
      { title: "Comment se déroule une mission ?", text: "Nous avançons par étapes avec des points de validation définis ensemble.", items: ["Cadrage : utilisateurs, fonctionnalités, contraintes et code existant.", "Proposition : périmètre, estimation et livrables convenus avant développement.", "Réalisation : démonstrations et retours sur les parcours.", "Livraison : vérifications, mise en ligne et transmission des informations utiles."] },
    ],
    questions: [
      { question: "Pouvez-vous intervenir sur une application React existante ?", answer: "Oui. Une première lecture du projet permet de préciser les dépendances, les points à corriger et les conditions de reprise avant de chiffrer la mission." },
      { question: "Pouvez-vous aussi développer l’API ?", answer: "Oui, mon expérience full-stack couvre notamment Django, Flask et Node.js. Nous pouvons définir une mission qui inclut l’interface et les services dont elle a besoin." },
      { question: "Comment obtenir une estimation ?", answer: "Envoyez-moi l’objectif du projet, les fonctionnalités attendues, votre échéance et, si possible, un aperçu de l’existant. Je pourrai préciser les informations nécessaires à une estimation adaptée." },
    ],
  },
  {
    path: "/services/creation-site-internet-rennes",
    kind: "service",
    eyebrow: "Création de sites · Rennes",
    title: "Création de site internet à Rennes",
    description: "Création de sites web par Théo Guérin, développeur freelance à Rennes : site vitrine, interface responsive et intégrations adaptées à votre activité.",
    intro: "Vous êtes indépendant, commerçant ou responsable d’une petite structure ? Je crée votre site internet pour présenter votre activité, rassurer vos visiteurs et faciliter la prise de contact. Basé à Rennes, je vous accompagne sur la structure des pages, le développement et la mise en ligne.",
    tags: ["Site vitrine", "Mobile", "SEO technique", "Intégrations"],
    sections: [
      { title: "Un site qui explique ce que vous faites", text: "Nous organisons vos contenus autour des questions de vos visiteurs : ce que vous proposez, à qui cela s’adresse et comment vous contacter.", items: ["Structure des pages et navigation lisible.", "Interface adaptée aux petits écrans.", "Présentation des prestations, des réalisations et des coordonnées."] },
      { links: [{"path":"/fr/realisations/les-portes-de-montafilan","label":"Voir le site et la gestion des tarifs de Montafilan"}], title: "Des choix adaptés à votre quotidien", text: "La solution dépend de la fréquence de vos mises à jour, de vos outils et de votre budget. Le projet Les Portes de Montafilan utilise par exemple Google Sheets pour permettre la modification des tarifs sans toucher au code.", items: ["Formulaire de contact et connexion aux services utiles.", "Choix du mode de mise à jour des contenus.", "Préparation de l’hébergement et transmission des accès convenus."] },
      { title: "Des bases techniques pour être découvert", text: "Je prépare des pages avec des titres explicites, des descriptions, une structure de contenu lisible et un sitemap. Le référencement se travaille ensuite avec vos contenus et les données de fréquentation ; aucune position dans Google n’est garantie." },
      { title: "Du premier échange à la mise en ligne", text: "Nous définissons les pages, les textes et les images nécessaires, puis vous validez la direction visuelle et les parcours. La livraison comprend les pages prévues, les intégrations convenues et les informations utiles pour gérer le site. Le nom de domaine, l’hébergement et la maintenance sont précisés dans la proposition." },
    ],
    questions: [
      { question: "Quel budget prévoir pour mon site ?", answer: "Le budget dépend du nombre de pages, des contenus disponibles, des intégrations et du mode de mise à jour. Décrivez-moi votre besoin pour établir une estimation sur un périmètre précis." },
      { question: "Pourrai-je modifier le contenu moi-même ?", answer: "Nous le définissons dès le cadrage. Un outil de gestion de contenu ou une connexion à un tableur peut convenir selon les informations à modifier." },
      { question: "Le nom de domaine et l’hébergement sont-ils compris ?", answer: "Les coûts des services externes et leur gestion sont précisés dans la proposition. Ils dépendent des outils retenus pour votre site." },
    ],
  },
  { path: "/realisations/les-portes-de-montafilan", kind: "case-study", ...fr.business_pages.cases["les-portes-de-montafilan"] },
  {
    path: "/services/developpeur-django",
    kind: "service",
    eyebrow: "Backend & API · Rennes",
    title: "Développeur Django freelance à Rennes",
    description: "Théo Guérin, développeur Django freelance à Rennes : API Python, logique métier, bases de données et intégrations pour vos applications web.",
    intro: "Votre application repose sur Django, ou vous souhaitez construire un backend Python ? Je développe les modèles de données, les règles métier et les API qui relient vos utilisateurs à vos services. Je peux aussi reprendre un backend existant après examen du code et de ses contraintes.",
    tags: ["Django", "Python", "PostgreSQL", "API REST"],
    sections: [
      { title: "Une API adaptée à votre application", text: "Je conçois des services qui alimentent une interface React, une application mobile ou un outil interne, à partir de vos besoins fonctionnels.", items: ["Modélisation des données et règles métier.", "Endpoints REST, validation des entrées et gestion des erreurs.", "Authentification et permissions définies selon les rôles utilisateurs."] },
      { links: [{"path":"/fr/experience","label":"Découvrir mon travail sur les API chez Nahibu"}], title: "Connecter vos outils", text: "Une application doit souvent échanger avec des services externes. Chez Nahibu, je développe et maintiens des API REST avec Django et Flask. La synchronisation des données utilisateurs entre WooCommerce, l’espace client et Brevo repose sur une API Node.js que j’ai développée avec Sequelize (ORM). Mon expérience inclut aussi l’intégration de Systempay et LimeSurvey." },
      { title: "Faire évoluer le backend dans la durée", text: "Je sépare les responsabilités pour faciliter les évolutions : accès aux données, logique métier et interface de l’API. Les parcours importants font l’objet de vérifications adaptées au projet.", items: ["Évolution des modèles et des bases PostgreSQL ou MySQL.", "Correction de bugs et ajout de fonctionnalités.", "Préparation du déploiement et documentation des points utiles à la reprise."] },
      { title: "Une mission définie ensemble", text: "Nous commençons par vos utilisateurs, vos données et vos contraintes d’hébergement. Pour une reprise, j’examine le code et les dépendances avant de chiffrer les changements. Le périmètre précise les fonctionnalités à livrer, les migrations de données éventuelles, les vérifications et la documentation de déploiement." },
    ],
    questions: [
      { question: "Pouvez-vous relier Django à React ou Flutter ?", answer: "Oui. Une API permet de partager les données et les règles métier entre une interface React et une application Flutter. Les besoins d’authentification et de synchronisation sont définis au cadrage." },
      { question: "Intervenez-vous sur un backend existant ?", answer: "Oui. Je commence par examiner le code, les modèles de données et les conditions de déploiement pour identifier les contraintes de la reprise." },
    ],
  },
  {
    path: "/services/developpeur-flutter",
    kind: "service",
    eyebrow: "Applications mobiles · Rennes",
    title: "Développeur Flutter freelance à Rennes",
    description: "Théo Guérin, développeur Flutter freelance à Rennes : applications mobiles Dart, navigation, stockage local et connexion à vos API.",
    intro: "Vous souhaitez créer une application mobile pour vos utilisateurs ou un outil utilisable sur le terrain ? Je développe avec Flutter et Dart les écrans, la navigation et l’accès aux données. Le stockage local, la connexion à une API et les plateformes visées sont définis selon vos usages.",
    tags: ["Flutter", "Dart", "Stockage local", "API"],
    sections: [
      { title: "Des parcours conçus pour le mobile", text: "Nous définissons les actions essentielles avant de construire les écrans : ce que l’utilisateur veut faire, les informations nécessaires et les retours à lui afficher.", items: ["Navigation entre les écrans et formulaires.", "Affichage des données, états de chargement et messages d’erreur.", "Connexion à une API existante ou développement du backend associé."] },
      { title: "Des données accessibles selon votre usage", text: "Le fonctionnement hors connexion se prépare dès la conception. Selon le besoin, l’application peut conserver des données localement ; les échanges avec le serveur et les éventuels conflits de synchronisation sont à définir dans le périmètre." },
      { links: [{"path":"/fr/realisations/a-table","label":"Découvrir À table !, mon application Flutter hors connexion"}], title: "Deux projets pour découvrir mon travail", text: "À table ! est une application Flutter de gestion de cuisine, conçue pour fonctionner hors connexion avec Riverpod et Isar. Elle permet de suivre les dates de péremption et de consulter un calendrier. LemonMaze propose un parcours d’énigmes pour découvrir Rennes." },
      { title: "Du prototype à une version vérifiable", text: "Le cadrage précise les plateformes visées, les écrans prioritaires et les données à manipuler. Nous convenons ensuite des étapes de démonstration, des tests sur appareils et des conditions de livraison. La publication sur les stores et ses prérequis sont à définir ensemble." },
    ],
    questions: [
      { question: "Mon application peut-elle fonctionner sans connexion ?", answer: "Certaines fonctionnalités peuvent utiliser un stockage local. Il faut préciser quelles données restent accessibles hors connexion et ce qui doit être synchronisé au retour du réseau." },
      { question: "Pouvez-vous développer l’API de l’application ?", answer: "Oui, je travaille aussi avec Django et Python. Cela permet de définir ensemble le fonctionnement mobile et les services nécessaires côté serveur." },
    ],
  },
];

// Le navigateur fournit le dictionnaire déjà chargé ; les scripts SEO font de même
// avec leurs fichiers JSON, sans imposer toutes les langues au JavaScript initial.
type BusinessTranslations = typeof fr.business_pages;

export function getBusinessLabels(translations: BusinessTranslations = fr.business_pages) {
  return translations.labels;
}

export function getBusinessPages(translations: BusinessTranslations = fr.business_pages): BusinessPage[] {
  const cases = translations.cases;
  return BUSINESS_PAGES.map(page => page.kind === "case-study"
    ? { ...page, ...cases[page.path.split("/").pop() as keyof typeof cases] }
    : page);
}

export function getBusinessPage(pathname: string, translations: BusinessTranslations = fr.business_pages): BusinessPage | undefined {
  return getBusinessPages(translations).find(page => page.path === pathname);
}

// Relier chaque offre à des preuves et à des prestations complémentaires, sans afficher tout le catalogue.
const RELATED_PATHS: Record<string, string[]> = {
  "/services/creation-site-internet-rennes": ["/realisations/les-portes-de-montafilan", "/realisations/la-maree-malouine", "/services/developpeur-react"],
  "/services/developpeur-react": ["/realisations/la-maree-malouine", "/realisations/les-portes-de-montafilan", "/services/developpement-api"],
  "/services/developpement-api": ["/services/developpeur-django", "/services/developpeur-react", "/realisations/la-maree-malouine"],
  "/services/developpeur-django": ["/services/developpement-api", "/services/developpeur-react", "/services/developpeur-flutter"],
  "/services/developpeur-flutter": ["/realisations/a-table", "/services/developpement-api", "/services/developpeur-django"],
  "/realisations/la-maree-malouine": ["/services/developpeur-react", "/services/developpement-api", "/realisations/les-portes-de-montafilan"],
  "/realisations/les-portes-de-montafilan": ["/services/creation-site-internet-rennes", "/services/developpeur-react", "/realisations/la-maree-malouine"],
  "/realisations/a-table": ["/services/developpeur-flutter", "/realisations/les-portes-de-montafilan", "/realisations/la-maree-malouine"],
};

export function getRelatedBusinessPages(pathname: string, pages: BusinessPage[]): BusinessPage[] {
  return (RELATED_PATHS[pathname] ?? []).flatMap(path => {
    const page = pages.find(item => item.path === path);
    return page ? [page] : [];
  });
}
