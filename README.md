<h2 align="center">
  Portfolio Website – v3.0.0<br/>
  <a href="https://theo-guerin.fr/" target="_blank">theo-guerin.fr</a>
</h2>

---

## 🚀 Technologies utilisées

- **Frontend** : React, Vite, Bootstrap, CSS3
- **i18n** : react-i18next (FR / EN / ES)
- **Sécurité** : hCaptcha
- **Mesure d’audience** : Google Analytics 4 (Consent Mode v2, bannière de consentement)
- **Backend/API** : Axios, Resend
- **Déploiement** : Vercel

---

## 📦 Prérequis

- **Node.js** ≥ 18 (recommandé)
- **npm** ≥ 9

---

## ⚙️ Lancer le projet en local

1. **Copier le fichier `.env.template` en `.env`** :

   ```bash
   cp .env.template .env
   ```

   > Renseignez les variables d’environnement nécessaires (voir plus bas).

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :

   ```bash
   npm run dev
   ```

   Le projet sera accessible à l’adresse : http://localhost:5173

---

## 🛠️ Scripts utiles

```bash
npm run dev       # Démarrer en développement
npm run build     # Build de production
npm run preview   # Prévisualiser le build localement
```

---

## 🔐 Variables d’environnement

> Adaptez les clés à votre configuration.

```
RESEND_API_KEY=          # Clé API Resend
HCAPTCHA_SECRET_KEY=     # Clé API Hcaptcha
```

---

## ✨ Fonctionnalités principales

- Portfolio + **CV téléchargeable**
- Formulaire de contact sécurisé via **hCaptcha**
- **Interface multilingue** (FR / EN / ES)
- **Mentions légales** & **Politique de confidentialité** accessibles en footer
- **Bannière cookies** (GA4) avec **Consent Mode v2** et panneau « Gérer mes cookies »
- Déploiement **Vercel**

---

## 🧭 Pages légales

- `/mentions-legales`
- `/politique-de-confidentialite`

> La bannière de consentement bloque Google Analytics tant que l’utilisateur n’a pas accepté (Consent Mode).  
> L’utilisateur peut modifier son choix via **« Gérer mes cookies »** en footer.

---

## 👨‍💻 À propos

Ce portfolio a été conçu pour mettre en avant mes compétences en développement web ainsi que mes projets personnels et professionnels.

💬 Ouvert aux opportunités & collaborations  
📧 [Me contacter](mailto:theo-guerin35000@gmail.com)
