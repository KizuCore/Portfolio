# Portfolio Théo Guérin

Portfolio personnel de Théo Guérin, développeur full-stack basé à Rennes. Le site présente le profil, les expériences, les projets, le CV et un formulaire de contact sécurisé.

Site en production : [theo-guerin.fr](https://theo-guerin.fr/)

## Stack

- **Frontend** : React 18, TypeScript, Vite, React Router, React Bootstrap
- **Animations** : Framer Motion, tsparticles, React CountUp
- **Internationalisation** : i18next / react-i18next
- **SEO** : React Helmet, balises canonical/hreflang, Schema.org, sitemap généré
- **Contact** : API Vercel Serverless, Resend, Google reCAPTCHA v3
- **Consentement** : Google Analytics 4 avec Consent Mode v2
- **Déploiement** : Vercel

## Fonctionnalités

- Pages portfolio : accueil, à propos, expériences, projets, contact et CV.
- Routes localisées en `fr`, `en`, `es` et `bzh`.
- Métadonnées SEO par page, Open Graph, Twitter Cards et données structurées.
- Fichiers `llms.txt`, `llms-fr.txt` et `llms-en.txt`.
- Sitemap XML généré automatiquement depuis la configuration SEO.
- Formulaire de contact avec validation, reCAPTCHA v3, rate limit côté API et envoi via Resend.
- Bandeau cookies et panneau de préférences pour le consentement analytics.
- Accessibilité renforcée sur la navigation, le menu mobile et le sélecteur de langue.

## Prérequis

- Node.js 18 ou plus récent
- npm 9 ou plus récent

## Installation

```bash
npm install
```

Créez ensuite un fichier `.env` à partir de `.env.template` :

```bash
cp .env.template .env
```

Sous Windows PowerShell :

```powershell
Copy-Item .env.template .env
```

## Variables d'environnement

Variables requises :

```env
RESEND_API_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_MIN_SCORE=0.5
VITE_RECAPTCHA_SITE_KEY=
```

Variables optionnelles utiles en production :

```env
CONTACT_EMAIL=theo.guerin35000@gmail.com
RESEND_FROM=Portfolio <contact@votre-domaine.fr>
VITE_SITE_URL=https://theo-guerin.fr
```

`RESEND_FROM` doit utiliser un domaine autorisé dans Resend. En local, l'adresse par défaut `onboarding@resend.dev` peut suffire pour tester.

## Scripts

```bash
npm run dev               # Lance le serveur de développement
npm run build             # Génère le sitemap, compile TypeScript et build Vite
npm run preview           # Prévisualise le build de production
npm run lint              # Lance ESLint
npm run i18n:check        # Vérifie la cohérence des clés de traduction
npm run i18n:sync         # Synchronise les clés i18n manquantes
npm run sitemap:generate  # Régénère public/sitemap.xml
```

Le script `npm run build` exécute automatiquement `npm run sitemap:generate` via `prebuild`.

## Structure

```text
api/                 API serverless Vercel pour le formulaire de contact
public/              Assets publics, manifest, robots.txt, sitemap et fichiers llms
scripts/             Scripts de maintenance, i18n et sitemap
src/assets/          Images, médias et styles regroupés par fonctionnalité
src/components/      Composants React par domaine
src/components/Layout/ Composants d'infrastructure communs à toutes les pages
src/config/          Configuration globale du site et du SEO
src/hooks/           Hooks React réutilisables
src/locales/         Traductions JSON
src/routes/          Définition des routes applicatives
src/services/        Services côté frontend
src/utils/           Utilitaires navigateur sans rendu React
```

## SEO et internationalisation

La configuration SEO principale se trouve dans `src/config/seo.ts`.

Les routes localisées sont générées à partir des routes applicatives et des langues supportées. Les pages légales utilisent un fallback de contenu :

- `fr` utilise le contenu français.
- `en` et `es` utilisent le contenu anglais.

Le sitemap est généré depuis la même configuration afin d'éviter les écarts entre les routes réelles, les balises `hreflang` et `public/sitemap.xml`.

## Contact

Le formulaire appelle `/api/sendEmail`, qui :

- nettoie et limite la longueur des champs ;
- vérifie les champs requis et le format de l'adresse e-mail ;
- applique un rate limit simple par IP ;
- vérifie le token Google reCAPTCHA v3 ;
- envoie l'e-mail via Resend.

## Déploiement

Le projet est prévu pour Vercel. Le fichier `vercel.json` contient les règles de cache et les rewrites nécessaires au routing côté client, tout en laissant passer `/api`, `robots.txt`, `sitemap.xml`, les fichiers `llms` et les assets publics.

Avant déploiement :

```bash
npm run lint
npm run i18n:check
npm run build
```

## Auteur

Théo Guérin  
Portfolio : [theo-guerin.fr](https://theo-guerin.fr/)  
GitHub : [KizuCore](https://github.com/KizuCore)  
LinkedIn : [theo-guerin35](https://www.linkedin.com/in/theo-guerin35/)
