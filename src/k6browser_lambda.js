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
      //executor: 'per-vu-iterations',
	  //executor: 'constant-vus',
	  //vus: 1, // Numero di utenti virtuali
	  //duration: '30s',
      //iterations: 2, // Numero di iterazioni per utente virtuale
	  
	  //constant-arrival-rate: Mantiene un tasso costante di nuove iterazioni per un periodo di tempo.
	  //executor: 'constant-arrival-rate',
    //rate: 3, //  iterazioni al secondo
    //duration: '3m',
    //preAllocatedVUs: 5, // Numero di VU preallocati
	  //
	  
	  //ramping-arrival-rate: Aumenta o diminuisce gradualmente il tasso di nuove iterazioni
      executor: 'ramping-arrival-rate',
      startRate: 10, // Inizia con 5 iterazioni al secondo
      timeUnit: '1s', // Unità di tempo per il rate
      preAllocatedVUs: 200, // Numero di VU preallocati
      maxVUs: 400, // Numero massimo di VU
      stages: [
               { duration: '60s', target: 20 }, // Raggiunge 50 iterazioni al secondo in 5 minuti
               { duration: '60s', target: 50 }, // Mantiene 50 iterazioni al secondo per 10 minuti
               { duration: '60s', target: 20 }, // Riduce a 0 iterazioni al secondo in 5 minuti
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
  //const IdPButton = page.locator('[id="https://5ucp2co2zvqle6tcyrx4i5se7q0xdkni.lambda-url.eu-south-1.on.aws"]');
  const IdPButton = page.locator('[id="https://koz3yhpkscymaqgp4m7ceguu6m0tffuz.lambda-url.eu-south-1.on.aws"]');
  IdPButton.click();
  page.waitForNavigation();  
  
  //sleep(20);
  //page.close()  
}