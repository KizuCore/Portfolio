import fr from "../locales/fr.json";
import en from "../locales/en.json";
import bzh from "../locales/bzh.json";

export type BusinessPage = {
  path: string;
  kind: "service" | "case-study";
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  tags: string[];
  sections: { title: string; text: string; items?: string[] }[];
  questions: { question: string; answer: string }[];
};

// Editorial content is shared by React and the static SEO build. Keep claims factual.
// Services remain in French; case studies use the shared locale JSON files.
export const BUSINESS_PAGES: BusinessPage[] = [
  { path: "/realisations/a-table", kind: "case-study", ...fr.business_pages.cases["a-table"] },
  {
    path: "/services/developpeur-react",
    kind: "service",
    eyebrow: "Développement d’applications · Rennes",
    title: "Développeur React freelance à Rennes",
    description: "Théo Guérin, développeur React freelance à Rennes : interfaces TypeScript, applications web et intégration API. Échangeons sur votre projet.",
    intro: "Une application à construire, une interface à faire évoluer ou un projet React à reprendre ? Je vous accompagne du cadrage des fonctionnalités à leur mise en ligne, avec une attention particulière à la clarté des parcours et à la maintenance du code.",
    tags: ["React", "TypeScript", "API REST", "Tests automatisés"],
    sections: [
      { title: "Une interface pensée pour vos utilisateurs", text: "Je développe des interfaces qui rendent les actions essentielles faciles à comprendre, sur ordinateur comme sur mobile.", items: ["Applications métier, tableaux de bord et formulaires.", "Composants réutilisables et parcours accessibles au clavier.", "Intégration de vos API, avec gestion des chargements et des erreurs."] },
      { title: "Faire évoluer un projet existant", text: "Je commence par comprendre votre code, vos contraintes et les difficultés rencontrées. Nous définissons ensuite les changements prioritaires et leur périmètre.", items: ["Ajout de fonctionnalités et correction de bugs.", "Séparation de l’interface, des données et de la logique métier.", "Tests des parcours importants et préparation du déploiement."] },
      { title: "Une expérience concrète du front au back", text: "Chez Nahibu, je développe des interfaces React et des API Python avec Django et Flask. Le frontend Flambow associe React et TypeScript à des tests Vitest et Playwright. Ces expériences nourrissent ma façon de concevoir des interfaces reliées à des services réels." },
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
    intro: "Présenter votre activité, expliquer votre offre et faciliter la prise de contact : votre site doit être utile dès la première visite. Je conçois des sites adaptés à vos contenus, à vos visiteurs et à votre manière de travailler.",
    tags: ["Site vitrine", "Mobile", "SEO technique", "Intégrations"],
    sections: [
      { title: "Un site qui explique ce que vous faites", text: "Nous organisons vos contenus autour des questions de vos visiteurs : ce que vous proposez, à qui cela s’adresse et comment vous contacter.", items: ["Structure des pages et navigation lisible.", "Interface adaptée aux petits écrans.", "Présentation des prestations, des réalisations et des coordonnées."] },
      { title: "Des choix adaptés à votre quotidien", text: "La solution dépend de la fréquence de vos mises à jour, de vos outils et de votre budget. Le projet Les Portes de Montafilan utilise par exemple Google Sheets pour permettre la modification des tarifs sans toucher au code.", items: ["Formulaire de contact et connexion aux services utiles.", "Choix du mode de mise à jour des contenus.", "Préparation de l’hébergement et transmission des accès convenus."] },
      { title: "Des bases techniques pour être découvert", text: "Je prépare des pages avec des titres explicites, des descriptions, une structure de contenu lisible et un sitemap. Le référencement se travaille ensuite avec vos contenus et les données de fréquentation ; aucune position dans Google n’est garantie." },
      { title: "Du premier échange à la mise en ligne", text: "Le cadrage permet de choisir les pages, de rassembler les textes et les images, puis de convenir du périmètre. Vous validez la direction visuelle et les parcours avant la livraison. La maintenance et les évolutions peuvent être définies séparément selon vos besoins." },
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
    intro: "Derrière une interface, il faut des données fiables et des règles métier bien définies. Je développe des backends Python et Django pour relier vos utilisateurs, vos données et vos services.",
    tags: ["Django", "Python", "PostgreSQL", "API REST"],
    sections: [
      { title: "Une API adaptée à votre application", text: "Je conçois des services qui alimentent une interface React, une application mobile ou un outil interne, à partir de vos besoins fonctionnels.", items: ["Modélisation des données et règles métier.", "Endpoints REST, validation des entrées et gestion des erreurs.", "Authentification et permissions définies selon les rôles utilisateurs."] },
      { title: "Connecter vos outils", text: "Une application doit souvent échanger avec des services externes. Mon expérience chez Nahibu inclut l’intégration de WooCommerce, Systempay, Brevo et LimeSurvey, ainsi que la maintenance d’API Django et Flask." },
      { title: "Faire évoluer le backend dans la durée", text: "Je sépare les responsabilités pour faciliter les évolutions : accès aux données, logique métier et interface de l’API. Les parcours importants font l’objet de vérifications adaptées au projet.", items: ["Évolution des modèles et des bases PostgreSQL ou MySQL.", "Correction de bugs et ajout de fonctionnalités.", "Préparation du déploiement et documentation des points utiles à la reprise."] },
      { title: "Une mission définie ensemble", text: "Nous commençons par vos utilisateurs, vos données et vos contraintes d’hébergement. Si un backend existe déjà, sa lecture permet de préciser les changements, les dépendances et les livrables avant le développement." },
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
    intro: "Une idée d’application mobile ou un parcours à simplifier ? Je développe avec Flutter et Dart des interfaces adaptées aux usages mobiles, en tenant compte de vos données, de la navigation et des conditions de connexion.",
    tags: ["Flutter", "Dart", "Stockage local", "API"],
    sections: [
      { title: "Des parcours conçus pour le mobile", text: "Nous définissons les actions essentielles avant de construire les écrans : ce que l’utilisateur veut faire, les informations nécessaires et les retours à lui afficher.", items: ["Navigation entre les écrans et formulaires.", "Affichage des données, états de chargement et messages d’erreur.", "Connexion à une API existante ou développement du backend associé."] },
      { title: "Des données accessibles selon votre usage", text: "Le fonctionnement hors connexion se prépare dès la conception. Selon le besoin, l’application peut conserver des données localement ; les échanges avec le serveur et les éventuels conflits de synchronisation sont à définir dans le périmètre." },
      { title: "Deux projets pour découvrir mon travail", text: "À table ! est une application Flutter de gestion de cuisine, conçue pour fonctionner hors connexion avec Riverpod et Isar. Elle permet de suivre les dates de péremption et de consulter un calendrier. LemonMaze propose un parcours d’énigmes pour découvrir Rennes." },
      { title: "Du prototype à une version vérifiable", text: "Le cadrage précise les plateformes visées, les écrans prioritaires et les données à manipuler. Nous convenons ensuite des étapes de démonstration, des tests sur appareils et des conditions de livraison. La publication sur les stores et ses prérequis sont à définir ensemble." },
    ],
    questions: [
      { question: "Mon application peut-elle fonctionner sans connexion ?", answer: "Certaines fonctionnalités peuvent utiliser un stockage local. Il faut préciser quelles données restent accessibles hors connexion et ce qui doit être synchronisé au retour du réseau." },
      { question: "Pouvez-vous développer l’API de l’application ?", answer: "Oui, je travaille aussi avec Django et Python. Cela permet de définir ensemble le fonctionnement mobile et les services nécessaires côté serveur." },
    ],
  },
];

const translations = { fr, en, bzh };
export function getBusinessLabels(locale: string = "fr") {
  return translations[locale as keyof typeof translations]?.business_pages.labels ?? fr.business_pages.labels;
}

export function getBusinessPages(locale: string = "fr"): BusinessPage[] {
  const cases = (translations[locale as keyof typeof translations] ?? fr).business_pages.cases;
  return BUSINESS_PAGES.map(page => page.kind === "case-study"
    ? { ...page, ...cases[page.path.split("/").pop() as keyof typeof cases] }
    : page);
}

export function getBusinessPage(pathname: string, locale: string = "fr"): BusinessPage | undefined {
  return getBusinessPages(locale).find(page => page.path === pathname);
}
