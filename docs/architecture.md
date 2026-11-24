# Architecture du portfolio

L'organisation suit les fonctionnalités du site. Une page, ses composants, ses
styles et sa logique restent proches ; le code réellement réutilisé est partagé.
Les URL publiques et les noms des fonctions serverless restent stables.

## Organisation

```text
src/
  app/
    main.tsx                 Démarrage React, providers et initialisation
    App.tsx                  Composition du site et transitions entre pages
    i18n.ts                  Initialisation et chargement des traductions
    routes/                  Assemblage des routes et imports différés
    layout/                  Navigation, footer, défilement, décor, chargement
      header/hooks/          Menu mobile accessible et interaction du logo
    seo/                     Métadonnées de la page active
    styles/                  Styles du shell et des transitions
  features/
    about/                   Profil, qualifications, loisirs, compétences
    business/                Pages de services
    case-studies/            Présentations détaillées des réalisations
    contact/                 Formulaire, validation client, client API, captcha
    easter-eggs/              Scènes et interactions cachées
    experience/              Parcours et chronologie
    home/                    Accueil
    legal/                   Documents légaux et recherche dans leur sommaire
    not-found/               Page 404 et son illustration
    projects/                Galerie et filtres
    resume/                  CV et lecteur PDF différé
  shared/
    config/                  URL du site, routes SEO, schémas structurés
    data/                    Résolution des images de projets pour Vite
    hooks/                   Hooks utilisés indépendamment d'une page
    privacy/                 Consentement, Analytics et préférences cookies
    ui/                      Primitives visuelles et composants réutilisables
  content/                   Profil, projets, CV, services et données légales
  locales/                   Dictionnaires fr, en et bzh
  styles/                    Tailwind, polices, palette et styles communs
  assets/                    Images et médias importés par Vite
  types/                     Déclarations TypeScript des intégrations

api/                         Points d'entrée HTTP déployés par Vercel
lib/contact/                 Validation serveur, limitation, captcha, envoi
lib/gitlab/                  Lecture et cache du calendrier public
lib/email/                   Modèles HTML et texte des e-mails
scripts/                     Génération des ressources et vérifications
scripts/lib/                 Fonctions partagées par les scripts de build
tests/                       Tests Node des comportements et du rendu SEO
public/                      Fichiers servis à URL fixe
```

Dans chaque fonctionnalité, les sous-dossiers sont créés seulement si utiles :
`pages` compose l'écran, `components` contient ses blocs visuels, `hooks` gère les
interactions et effets React, `data` les modèles locaux, `api` les échanges réseau,
`utils` les fonctions sans rendu, `types` les contrats et `styles` le CSS local.

## Sens des dépendances

- `app` assemble les fonctionnalités et le code commun.
- Une fonctionnalité utilise ses propres modules, `shared`, `content`, les
  traductions et les ressources ; elle n'importe ni `app` ni une autre fonctionnalité.
- `shared` ne dépend ni de `app` ni des fonctionnalités. Un composant utilisé
  seulement sur une page reste dans cette page.
- `content` ne dépend pas de React, des API ou du navigateur. Les données sont
  consommées à la fois par React et par les générateurs SEO exécutés avec Node.
- `api` et `lib` restent côté serveur. Aucun module de `src` ne doit les importer.

`npm run check:architecture`, inclus dans `npm run check`, contrôle ces frontières
dans les imports TypeScript, JavaScript serveur, dynamiques et CSS. TypeScript
vérifie la résolution des modules. Ce contrôle ne remplace pas la revue du code.

Les imports internes à une fonctionnalité restent relatifs ; les imports entre
domaines utilisent `@/`. Les alias `@image`, `@sound` et `@media` ciblent les médias.
Les données utilisées par les scripts Node gardent des imports relatifs compatibles
avec leur chargeur. Éviter les fichiers `index.ts` qui réexportent toutes les pages :
les routes doivent conserver leurs imports directs et différés.

## Ajouter ou modifier une page

1. Placer sa composition dans `features/<domaine>/pages`, ses blocs et styles à côté.
2. Déclarer la route dans `app/routes/appRoutes.tsx`. L'accueil est chargé immédiatement,
   les autres pages utilisent `lazy()`.
3. Déclarer ses métadonnées dans `shared/config/seo.ts`, puis les textes dans les
   dictionnaires. Le contenu partagé avec le HTML statique appartient à `content`.
4. Pour une route indexable, compléter `scripts/lib/route-preloads.mjs` et le rendu
   dans `scripts/seo-static.mjs`. Adapter les redirections Vercel si nécessaire.
5. Exécuter les validations ci-dessous et vérifier l'écran sur mobile et ordinateur.

Les styles d'une fonctionnalité sont importés par ses composants. Les styles
partagés de services et d'études de cas sont dans `styles/shared/business-layout.css`,
chargés uniquement avec ces pages. Ne pas importer tous les styles dans `main.tsx`.
Le lecteur PDF, les calendriers et les illustrations lourdes conservent leurs
frontières de chargement différé.

## Formulaire et services externes

Le formulaire appelle le client HTTP de `features/contact/api`. Côté serveur,
`api/sendEmail.js` lit la requête et traduit le résultat en réponse HTTP.
`lib/contact/submitContact.js` applique les règles de validation, de limitation et
de consentement avant l’envoi. Le message destiné à Théo part en premier. Si seul
l’accusé de réception échoue, la demande reste traitée. Les adaptateurs reCAPTCHA
et Resend et les modèles d’e-mails peuvent évoluer séparément.

Sur la page À propos, le composant `GitLabCalendar` affiche le chargement,
le calendrier ou le bouton de nouvelle tentative. Le hook `useGitLabCalendar`
gère les tentatives et l’annulation au départ de la page. Le client HTTP de
`features/about/api` utilise la transformation des contributions de `about/utils`.
La route `api/gitlab-calendar.js` choisit le statut et les en-têtes HTTP.
Le module `lib/gitlab/calendar.js` interroge le profil public, contrôle la réponse
et conserve les données valides pendant une heure.

Les tests de contact et de calendrier simulent les services externes.
Les secrets d'environnement restent exclusivement côté serveur.

## Validation et fichiers générés

```bash
npm run check
npm test
npm run build
npm run check:seo
npm run check:performance
```

Les tests couvrent notamment les consentements, les envois de contact, le calendrier,
les pages légales, les URL canoniques et les préchargements. Le build génère le
sitemap, les routes HTML et les ressources Markdown à partir du contenu commun.
Ne pas éditer `dist`, `public/sitemap.xml` ou les Markdown générés directement.
Les images de `public` conservent leurs URL ; les images de `assets` sont traitées
par Vite. Les scripts `images:*` permettent de régénérer les variantes nécessaires.
