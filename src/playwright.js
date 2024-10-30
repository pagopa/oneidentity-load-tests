// npx playwright test --headed --workers=2 --repeat-each=2
const { test, expect } = require('@playwright/test');

test('get started link', async ({ page }) => {
  await page.goto('https://dev.oneid.pagopa.it/login?response_type=CODE&scope=openid&client_id=8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg&state=dev&nonce=11701879fd734d1486b8a6435025b465&redirect_uri=https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb');
  //await page.waitForURL('**/login**');
  // Clicca sul pulsante "Entra con SPID"
  await page.locator('#spidButton').click();
  await expect(page.getByText('Scegli il tuo Identity Provider')).toBeVisible({ timeout: 1000000 });
  await page.locator('[id="https://koz3yhpkscymaqgp4m7ceguu6m0tffuz.lambda-url.eu-south-1.on.aws"]').click();
  //await expect(page).toHaveText(/Token e Codici/);  
  await expect(page.getByText('Token e Codici')).toBeVisible({ timeout: 1000000 });
});