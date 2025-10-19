# Test info

- Name: Tests des puzzles >> Mot de Passe - Saisie et validation de réponse
- Location: C:\Users\abdel\Desktop\Bachelor 3 Dev\test et qualité\EscapeTheWeb\escape-the-web\e2e\puzzle.spec.ts:4:3

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('h2:has-text("Le Coffre-Fort Secret")') to be visible

    at C:\Users\abdel\Desktop\Bachelor 3 Dev\test et qualité\EscapeTheWeb\escape-the-web\e2e\puzzle.spec.ts:9:16
```

# Page snapshot

```yaml
- heading "Escape The Web" [level=1]
- heading "Progression" [level=2]
- text: 1 Le Coffre-Fort 2 Le Mot Caché 3 L'Ordre des Couleurs
- heading "Le Coffre-Fort Numérique" [level=2]
- button "Voir l'indice"
- button "1"
- button "2"
- button "3"
- button "4"
- button "5"
- button "6"
- button "7"
- button "8"
- button "9"
- button "C"
- button "0"
- button "←"
- button "Valider" [disabled]
- paragraph: "Tentatives : 0/3"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Tests des puzzles', () => {
   4 |   test('Mot de Passe - Saisie et validation de réponse', async ({ page }) => {
   5 |     // 1. Accéder à la page d'accueil
   6 |     await page.goto('/');
   7 |     
   8 |     // 2. Attendre que le puzzle du mot de passe soit chargé
>  9 |     await page.waitForSelector('h2:has-text("Le Coffre-Fort Secret")');
     |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   10 |     
   11 |     // 3. Vérifier que le champ de saisie est présent
   12 |     const input = page.getByPlaceholder('Entrez le mot de passe');
   13 |     await expect(input).toBeVisible();
   14 |     
   15 |     // 4. Saisir une réponse
   16 |     await input.fill('test123');
   17 |     await expect(input).toHaveValue('test123');
   18 |     
   19 |     // 5. Vérifier que le bouton de validation est présent
   20 |     const validateButton = page.getByRole('button', { name: 'Valider' });
   21 |     await expect(validateButton).toBeVisible();
   22 |     
   23 |     // 6. Cliquer sur le bouton de validation
   24 |     await validateButton.click();
   25 |     
   26 |     // 7. Vérifier que le message d'erreur s'affiche (car la réponse est incorrecte)
   27 |     const errorMessage = page.locator('.error-message').first();
   28 |     await expect(errorMessage).toBeVisible();
   29 |     
   30 |     // 8. Saisir la bonne réponse
   31 |     await input.fill('escape');
   32 |     await expect(input).toHaveValue('escape');
   33 |     
   34 |     // 9. Cliquer sur le bouton de validation
   35 |     await validateButton.click();
   36 |     
   37 |     // 10. Attendre que le coffre s'ouvre (3 secondes)
   38 |     await page.waitForTimeout(3000);
   39 |     
   40 |     // 11. Vérifier que le message de succès s'affiche
   41 |     const successMessage = page.locator('.success-message').first();
   42 |     await expect(successMessage).toBeVisible();
   43 |     
   44 |     // 12. Attendre que le puzzle suivant se charge (4 secondes)
   45 |     await page.waitForTimeout(4000);
   46 |     
   47 |     // 13. Vérifier que nous sommes sur le puzzle suivant
   48 |     await expect(page.locator('h2')).toContainText('Le Coffre-Fort Numérique');
   49 |   });
   50 |
   51 |   test('Mot de Passe - Message d\'erreur avec réponse incorrecte', async ({ page }) => {
   52 |     // 1. Accéder à la page d'accueil
   53 |     await page.goto('/');
   54 |     
   55 |     // 2. Attendre que le puzzle du mot de passe soit chargé
   56 |     await page.waitForSelector('h2:has-text("Le Coffre-Fort Secret")');
   57 |     
   58 |     // 3. Vérifier que le champ de saisie est présent
   59 |     const input = page.getByPlaceholder('Entrez le mot de passe');
   60 |     await expect(input).toBeVisible();
   61 |     
   62 |     // 4. Saisir une réponse incorrecte
   63 |     await input.fill('mauvais_mot_de_passe');
   64 |     await expect(input).toHaveValue('mauvais_mot_de_passe');
   65 |     
   66 |     // 5. Vérifier que le bouton de validation est présent
   67 |     const validateButton = page.getByRole('button', { name: 'Valider' });
   68 |     await expect(validateButton).toBeVisible();
   69 |     
   70 |     // 6. Cliquer sur le bouton de validation
   71 |     await validateButton.click();
   72 |     
   73 |     // 7. Vérifier que le message d'erreur s'affiche
   74 |     const errorMessage = page.locator('.error-message').first();
   75 |     await expect(errorMessage).toBeVisible();
   76 |     await expect(errorMessage).toContainText('Mot de passe incorrect');
   77 |     
   78 |     // 8. Vérifier que le champ de saisie est vidé
   79 |     await expect(input).toHaveValue('');
   80 |     
   81 |     // 9. Vérifier que le compteur de tentatives est incrémenté
   82 |     const attemptsCounter = page.locator('text=Tentatives : 1');
   83 |     await expect(attemptsCounter).toBeVisible();
   84 |   });
   85 |
   86 |   test('Mot de Passe - Progression vers l\'énigme suivante avec la bonne réponse', async ({ page }) => {
   87 |     // 1. Accéder à la page d'accueil
   88 |     await page.goto('/');
   89 |     
   90 |     // 2. Attendre que le puzzle du mot de passe soit chargé
   91 |     await page.waitForSelector('h2:has-text("Le Coffre-Fort Secret")');
   92 |     
   93 |     // 3. Vérifier que le champ de saisie est présent
   94 |     const input = page.getByPlaceholder('Entrez le mot de passe');
   95 |     await expect(input).toBeVisible();
   96 |     
   97 |     // 4. Saisir la bonne réponse
   98 |     await input.fill('escape');
   99 |     await expect(input).toHaveValue('escape');
  100 |     
  101 |     // 5. Vérifier que le bouton de validation est présent
  102 |     const validateButton = page.getByRole('button', { name: 'Valider' });
  103 |     await expect(validateButton).toBeVisible();
  104 |     
  105 |     // 6. Cliquer sur le bouton de validation
  106 |     await validateButton.click();
  107 |     
  108 |     // 7. Attendre que le coffre s'ouvre (3 secondes)
  109 |     await page.waitForTimeout(3000);
```