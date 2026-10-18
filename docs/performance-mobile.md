# Optimisation mobile — 18 octobre 2026

Comparaison de builds de production locaux sur `/fr`, dans Chrome headless avec
le profil mobile et le ralentissement simulé par défaut de Lighthouse.
La référence utilise le code avant les modifications ; les mesures finales
utilisent le build optimisé. Ces résultats ne constituent pas une mesure du site déployé.

| Mesure | Avant | Après |
| --- | ---: | ---: |
| Score Lighthouse performance | 72 | 88 |
| Premier affichage de contenu (FCP) | 3,8 s | 2,4 s |
| Affichage du contenu principal (LCP) | 5,2 s | 3,5 s |
| Temps de blocage total (TBT) | 70 ms | 40 ms |
| Décalage de mise en page (CLS) | 0,0001 | 0 |
| JavaScript initial, gzip | 510,8 Kio | 230,3 Kio |
| CSS initial, gzip | 62,4 Kio | 37,9 Kio |
| Capture de projet sur écran 390 px, densité 2 | 64,1 Ko | 14,1 Ko |

Les scores et durées fluctuent selon les conditions d’exécution. Les tailles gzip
sont calculées sur les fichiers du build ; le transfert Vercel peut utiliser Brotli.

## Modifications

- Chargement des pages secondaires et de leurs styles à la navigation.
- Regroupements Vite limités au socle React et aux bibliothèques Motion : le PDF,
  les infobulles et le calendrier GitHub restent dans leurs imports différés.
- Import Sass des composants Bootstrap utilisés, en conservant les utilitaires
  responsives et l’ordre de cascade existant.
- Polices en `font-display: swap`, avec préchargement des deux polices principales.
- Variantes WebP 480, 768 et 1024 px pour l’image de présentation ; sélection via
  `srcset` et `sizes`. Dimensions explicites sur le logo de navigation.
- Ciel statique sur mobile, appareils limités et préférence de mouvement réduit.
  Le moteur de particules est chargé après la page sur les autres appareils.
- Suppression de l’observation des mutations d’attributs de toute la page dans
  la barre de progression : le suivi des dimensions reste assuré par ResizeObserver.

## Validation

- Build, ESLint, TypeScript, traductions et contrôle SEO des 68 routes : réussis.
- 21 tests existants : réussis.
- Navigation mobile, formulaire sans envoi, sélection des projets, préférences
  cookies, aperçu PDF à la demande, routes directes, français/anglais/breton : vérifiés dans Chrome.
- Absence de débordement horizontal et d’erreurs JavaScript sur les parcours testés.
- Particules présentes sur ordinateur et absentes avec mouvement réduit : vérifié.
- Comparaison des dimensions et styles des principaux blocs avec le build de référence,
  sur mobile et ordinateur : pas de différence sur les éléments comparés.
- Les audits Lighthouse d’images surdimensionnées et sans dimensions passent.

Il reste des styles partagés inutilisés sur une page donnée et des mesures de
mise en page liées aux animations ; tous les avertissements Lighthouse ne sont
pas supprimés. Relancer l’audit sur Vercel après déploiement pour mesurer l’effet réel.

Pour prévenir les régressions : `npm run build`, puis `npm run check:performance`
et `npm run check:seo`. Après remplacement de la capture d’accueil, régénérer ses
variantes avec `npm run images:home` et vérifier les largeurs déclarées dans `srcset`.
