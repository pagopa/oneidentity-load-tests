// Comando per eseguire browser: K6_BROWSER_ARGS='no-sandbox' K6_BROWSER_HEADLESS=false k6 run script.js

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
	  vus: 5, // Numero di utenti virtuali
      iterations: 1, // Numero di iterazioni per utente virtuale
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
  
  // Chiamata API Authorize One Identity
  // const url = new URL('https://dev.oneid.pagopa.it/oidc/authorize');

  // url.searchParams.append('idp','https://demo.spid.gov.it');
  // url.searchParams.append('client_id','8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg');
  // url.searchParams.append('response_type','CODE');
  // url.searchParams.append('redirect_uri','https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb');
  // url.searchParams.append('scope','openid');
  // url.searchParams.append('state','dev');
  // url.searchParams.append('nonce','11701879fd734d1486b8a6435025b465');

  // var params = {
    // headers: {
      // 'X-Forwarded-For': '192.168.0.1'
    // },
  // };

  // var payload = JSON.stringify(
    // {
    // 'idp': 'https://demo.spid.gov.it',
	// 'client_id': '8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg',
	// 'response_type': 'CODE',
	// 'redirect_uri': 'https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb',
	// 'scope': 'openid',
	// 'state': 'dev',
	// 'nonce': '0011701879fd734d1486b8a6435025b465'
    // }
  // );

  // const r = http.get(url.toString(),params);

  // //console.log(`Status ${r.status}`);  

  // check(r, {
    // 'status is 200': (r) => r.status === 200,
  // });
  // if (r.status === 429) {
    // throttling.add(1);
  // }

  // let doc = parseHTML(r.body);

  // // Trova il modulo con l'id 'SAMLRequestForm'
  // let form = doc.find('form#SAMLRequestForm');

  // // Trova l'input nascosto con il nome 'SAMLRequest'
  // let samlRequestInput = form.find('input[name="SAMLRequest"]');

  // // Estrai il valore della SAMLRequest
  // let samlRequest = samlRequestInput.attr('value');

  // // Converti la SAMLRequest in Base64
  // let samlRequestDec = encoding.b64decode(samlRequest);

  // // Converti l'ArrayBuffer in una stringa
  // let samlRequestStr = arrayBufferToString(samlRequestDec);
  // // console.log(`Decoded SAMLRequest: ${samlRequestStr}`);

  // // Estrai il SAMLRequest ID mediante regular expression
  // let samlRequestIdMatch = samlRequestStr.match(/ID="([^"]+)"/);
  // let samlRequestId = samlRequestIdMatch[1];

  // console.log(`RequestID: ${samlRequestId}`);

  // sleep(5);



  // k6 browser
  const page = browser.newPage();
  
  // Apri la pagina iniziale di Login
  await page.goto('https://dev.oneid.pagopa.it/login?response_type=CODE&scope=openid&client_id=8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg&state=dev&nonce=011701879fd734d1486b8a6435025b465&redirect_uri=https%3A%2F%2F442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws%2Fclient%2Fcb');
 
  
  // Clicca sul pulsante "Entra con SPID"
  const spidButton = page.locator('#spidButton');
  spidButton.click();
  page.waitForNavigation();
  
  // Scelta IdP e Click sul pulsante IdP "Demo"
  const demoButton = page.locator('[id="https://demo.spid.gov.it"]');
  demoButton.click();
  page.waitForNavigation();

  sleep(10);
  
  // Inserimento credenziali username e password
  page.locator('[name="username"]').type('cleopatra')
  page.locator('[name="password"]').type('password123')
  
  // Clicca sul pulsante "Entra con SPID"
  const entraButton = page.locator('[class="italia-it-button italia-it-button-size-m button-spid spacer-top-1"]');
  entraButton.click();
  page.waitForNavigation();
  sleep(4);
  
  // Clicca sul pulsante "Conferma" per l'invio dei dati
  const confermaButton = page.locator('[value="Conferma"]');
  confermaButton.click();
  page.waitForNavigation();
  
  sleep(5);
  //page.close()  
}

// Funzione per convertire ArrayBuffer in stringa
function arrayBufferToString(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}