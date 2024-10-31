async function oi(page, userContext, events, test) {
  await test.step('Login', async () => {
    //const requestPromise = page.waitForRequest('https://dev.oneid.pagopa.it/login?response_type=CODE&scope=openid&client_id=8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg&state=dev&nonce=11701879fd734d1486b8a6435025b465&redirect_uri=https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb');
    await page.goto('https://dev.oneid.pagopa.it/login?response_type=CODE&scope=openid&client_id=8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg&state=dev&nonce=11701879fd734d1486b8a6435025b465&redirect_uri=https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb', { timeout: 120000 });
    //const req = await requestPromise;
  });
  await test.step('SPID Click', async () => {
    await page.locator('#spidButton').click({ timeout: 120000 });
  });

  await test.step('IdP Click', async () => {
    await page.locator('[id="https://5ucp2co2zvqle6tcyrx4i5se7q0xdkni.lambda-url.eu-south-1.on.aws"]').click({ timeout: 120000 });
    const element = await page.waitForSelector('text=Token e Codici');
   // await expect(element).toBeVisible();
  });
  }

module.exports = {
  oi
};