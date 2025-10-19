# Escape The Web (MAHRACHA ABDELHAKIM)

Un jeu d'énigmes interactif où les joueurs doivent résoudre une série de puzzles pour s'échapper.

## 🚀 Installation et Exécution

1. **Prérequis**
   - Node.js (version 18 ou supérieure)
   - npm (version 9 ou supérieure)

2. **Installation des dépendances**
   ```bash
   npm install
   ```

3. **Lancer le projet en mode développement**
   ```bash
   npm run dev
   ```
   Le projet sera accessible à l'adresse localhost 

4. **Construire le projet pour la production**
   ```bash
   npm run build
   ```

## 🧪 Tests

### Tests Unitaires
Les tests unitaires sont écrits avec Jest et Testing Library.

1. **Lancer les tests unitaires**
   ```bash
   npm test
   ```

2. **Lancer les tests en mode watch**
   ```bash
   npm run test:watch
   ```

3. **Générer un rapport de couverture**
   ```bash
   npm run test:coverage
   ```

### Tests E2E
Les tests end-to-end sont écrits avec Playwright.

1. **Lancer les tests E2E**
   ```bash
   npm run test:e2e
   ```

2. **Lancer les tests E2E avec l'interface utilisateur**
   ```bash
   npm run test:e2e:ui
   ```

## 🎮 Les Énigmes et Leurs Solutions

### 1. Le Coffre-Fort Secret
- **Description** : Trouvez le mot de passe pour déverrouiller le coffre.
- **Indice** : Pensez à ce que vous cherchez à faire dans ce jeu.
- **Solution** : `escape`

### 2. Le Coffre-Fort Numérique
- **Description** : Entrez le code à 4 chiffres pour ouvrir le coffre.
- **Indice** : Le code est une représentation numérique du mot "LEET".
- **Solution** : `1337`

### 3. L'Ordre des Couleurs
- **Description** : Cliquez sur les couleurs dans l'ordre de l'arc-en-ciel.
- **Indice** : "Richard Of York Gave Battle In Vain"
- **Solution** : `rouge` → `orange` → `jaune` → `vert` → `bleu` → `indigo` → `violet`

## 🛠️ Structure du Projet

```
escape-the-web/
├── src/
│   ├── components/
│   │   └── puzzles/
│   │       ├── CodeSecret.tsx
│   │       ├── Labyrinthe.tsx
│   │       └── MotDePasse.tsx
│   ├── styles/
│   │   └── puzzle.css
│   └── App.tsx
├── e2e/
│   └── puzzle.spec.ts
├── __tests__/
│   └── components/
│       └── puzzles/
│           ├── CodeSecret.test.tsx
│           ├── Labyrinthe.test.tsx
│           └── MotDePasse.test.tsx
└── package.json
```

## 📝 Scripts Disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit le projet pour la production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Vérifie le code avec ESLint
- `npm test` : Lance les tests unitaires
- `npm run test:watch` : Lance les tests en mode watch
- `npm run test:coverage` : Génère un rapport de couverture
- `npm run test:e2e` : Lance les tests E2E
- `npm run test:e2e:ui` : Lance les tests E2E avec l'interface utilisateur
- `npm run format` : Formate le code avec Prettier

## 🧪 Détails des Tests

### Tests Unitaires
Les tests unitaires vérifient :
- Le rendu correct des composants
- La gestion des réponses incorrectes
- La progression avec les bonnes réponses
- Le compteur de tentatives
- Les messages d'erreur et de succès

### Tests E2E
Les tests end-to-end vérifient :
- La navigation entre les énigmes
- La saisie et validation des réponses
- L'affichage des messages d'erreur
- La progression vers l'énigme suivante

## 🎨 Technologies Utilisées

- React
- TypeScript
- Vite
- Jest
- Playwright
- Framer Motion
- Tailwind CSS
