async function oi(page, userContext, events, test) {
  const { step } = test;
  const clientId =
    process.env.CLIENT_ID || "M-wvnk4qoXhHTBCvbbqBRs2HfX2ybrRSuHYI3cMDbDk";
  const loginUrl =
    "https://dev.oneid.pagopa.it/login?response_type=CODE&scope=openid" +
    `&client_id=${clientId}` +
    "&state=dev&nonce=11701879fd734d1486b8a6435025b465" +
    "&redirect_uri=https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb";

  await step("Login", async () => {
    await page.goto(loginUrl, { timeout: 5000 });
  });
  await step("SPID Click", async () => {
    await page.locator("#spidButton").click({ timeout: 5000 });
  });

  await step("IdP Click", async () => {
    await page
      .locator(
        '[id="https://5ucp2co2zvqle6tcyrx4i5se7q0xdkni.lambda-url.eu-south-1.on.aws"]'
      )
      .click({ timeout: 5000 });
    await page.waitForURL(
      "https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb**"
    );
  });
}

module.exports = {
  oi,
};