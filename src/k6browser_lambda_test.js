// Comando per eseguire browser: K6_BROWSER_ARGS='no-sandbox' K6_BROWSER_HEADLESS=false k6 run k6browser_lambda.js

import {browser} from 'k6/browser'
import { Counter } from 'k6/metrics';


export const options = {
  scenarios: {
    perftest: {
      executor: 'ramping-vus',
      startVUs: 500,
      stages: [
               { duration: '60s', target: 500 },
               { duration: '60s', target: 1000 },
               { duration: '60s', target: 1000 },
               { duration: '60s', target: 500 },
               ],

      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}

const apiVersion = 'v1'
const throttling = new Counter('throttling');

export default async function() {
  
  // k6 browser
  const page = await browser.newPage();
  
  // Apri la pagina iniziale di Login
  await page.goto('https://dev.oneid.pagopa.it/login?response_type=CODE&scope=openid&client_id=8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg&state=dev&nonce=11701879fd734d1486b8a6435025b465&redirect_uri=https%3A%2F%2F442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws%2Fclient%2Fcb');
  //sleep(5);
  
  // Clicca sul pulsante "Entra con SPID"
  await page.locator('#spidButton').click();
  
  // Scelta IdP e Click sul pulsante IdP "Demo
  await page.locator('[id="https://koz3yhpkscymaqgp4m7ceguu6m0tffuz.lambda-url.eu-south-1.on.aws"]').click();
  
  //sleep(20);
  page.close()  
}