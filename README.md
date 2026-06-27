# 🌱 UrbanGrow Famille — Application mobile

Application mobile du potager connecté **UrbanGrow**, **version Famille**.
Projet autonome construit sur la branche `claude/family-mobile-app-build-a1m5ux`
(le site marketing reste, lui, sur `main`).

L'app reprend l'expérience du tableau de bord du potager connecté, en y ajoutant
trois axes pensés pour les familles :

- 🧺 **Activités à faire en famille** (qui remplacent les recettes) : chaque
  activité est un bloc cliquable qui ouvre un **tutoriel pas à pas** avec
  matériel, étapes cochables et astuce.
- 🎮 **Jeux d'apprentissage** pour que l'enfant joue sur l'app *en apprenant* :
  memory des plantes, quiz de la nature et jeu de comptage — tous jouables.
- 🔐 **Page de connexion** avec distinction **Famille / Enseignant**. Le rôle est
  défini **en interne** (rattaché au compte), et détermine les pages affichées.

> Cette itération livre la **version Famille** complète. La version Enseignant
> (suivi de classe, fiches pédagogiques…) fera l'objet d'une prochaine itération
> et n'affiche pour l'instant qu'un écran d'attente.

## Pages

| Section | Description |
| --- | --- |
| **Connexion** | E-mail / mot de passe + connexion rapide de démo. Routage selon le rôle. |
| **Accueil** | Potager actif (plantes, stades, progression), capteurs en direct, conseils, impact. |
| **Activités** | Liste filtrable de blocs cliquables → tutoriel détaillé pas à pas. |
| **Jeux** | Memory, quiz, comptage — jeux d'apprentissage interactifs. |
| **Contenu** | Articles pédagogiques courts (sans recettes). |
| **Famille** | Fil communautaire : publier, aimer, partager. |
| **Favoris / Profil** | Favoris persistants, profil et déconnexion. |

## Comptes de démo

| Rôle | E-mail | Mot de passe |
| --- | --- | --- |
| Famille | `famille@urbangrow.fr` | `famille` |
| Enseignant | `prof@urbangrow.fr` | `prof` |

Des boutons de connexion rapide sont aussi disponibles sur l'écran de connexion.

## Stack technique

React 19 · React Router 7 · Vite 6 · Tailwind CSS 4 · lucide-react.
Aucune dépendance back-end : les données vivent dans `src/data.ts`, l'auth et les
favoris sont persistés en `localStorage`.

## Lancer en local

**Prérequis :** Node.js

```bash
npm install   # installer les dépendances
npm run dev   # démarrer en développement (http://localhost:3000)
npm run build # build de production
npm run lint  # vérification TypeScript
```

L'app est pensée mobile : sur grand écran, elle s'affiche dans un cadre type
téléphone centré.
