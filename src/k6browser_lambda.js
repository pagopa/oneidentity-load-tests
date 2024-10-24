// Comando per eseguire browser: K6_BROWSER_ARGS='no-sandbox' K6_BROWSER_HEADLESS=false k6 run k6browser_lambda.js

import { chromium } from 'k6/experimental/browser'
import { check } from 'k6'
import {browser} from 'k6/experimental/browser'
import {sleep} from 'k6';
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { parseHTML } from "k6/html";
import encoding from 'k6/encoding';


export const options = {
  scenarios: {
    perftest: {
    executor: 'per-vu-iterations',
	  //executor: 'constant-vus',
	  vus: 100, // Numero di utenti virtuali
	  //duration: '5m',
    iterations: 3, // Numero di iterazioni per utente virtuale
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
  const page = browser.newPage();
  page.setDefaultTimeout(120000);
  
  // Apri la pagina iniziale di Login
  await page.goto('https://dev.oneid.pagopa.it/login?response_type=CODE&scope=openid&client_id=8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg&state=dev&nonce=11701879fd734d1486b8a6435025b465&redirect_uri=https%3A%2F%2F442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws%2Fclient%2Fcb');
  //sleep(5);
  
  // Clicca sul pulsante "Entra con SPID"
  const spidButton = page.locator('#spidButton');
  spidButton.click();
  page.waitForNavigation();
  //sleep(5);
  
  // Scelta IdP e Click sul pulsante IdP "Demo
  //const demoButton = page.locator('[id="https://demo.spid.gov.it"]');
  //const demoButton = page.locator('[id="https://5ucp2co2zvqle6tcyrx4i5se7q0xdkni.lambda-url.eu-south-1.on.aws"]');
  const IdPButton = page.locator('[id="https://koz3yhpkscymaqgp4m7ceguu6m0tffuz.lambda-url.eu-south-1.on.aws"]');
  IdPButton.click();
  page.waitForNavigation();
  
  sleep(10);
  //page.close()  
}