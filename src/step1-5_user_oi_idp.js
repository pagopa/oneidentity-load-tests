import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { parseHTML } from "k6/html";
import encoding from 'k6/encoding';

export let options = {
  // virtual users
  vus: 10,
  // duration: '60s',
  stages: [
    { duration: "2s", target: 10 },
  ]  
};

const apiVersion = 'v1'
const throttling = new Counter('throttling');

export default function () {

  const url = new URL('https://dev.oneid.pagopa.it/oidc/authorize');

  url.searchParams.append('idp','https://demo.spid.gov.it');
  url.searchParams.append('client_id','8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg');
  url.searchParams.append('response_type','CODE');
  url.searchParams.append('redirect_uri','https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb');
  url.searchParams.append('scope','openid');
  url.searchParams.append('state','dev');
  url.searchParams.append('nonce','11701879fd734d1486b8a6435025b465');


  var params = {
    headers: {
      'X-Forwarded-For': '192.168.0.1'
    },
  };

  var payload = JSON.stringify(
    {
    'idp': 'https://demo.spid.gov.it',
		'client_id': '8U61NU_F8NMFDnTdW5zUt04MJ7wYRD_WgQbihbeenFg',
		'response_type': 'CODE',
		'redirect_uri': 'https://442zl6z6sbdqprefkazmp6dr3y0nmnby.lambda-url.eu-south-1.on.aws/client/cb',
		'scope': 'openid',
		'state': 'dev',
		'nonce': '11701879fd734d1486b8a6435025b465'
    }
);

  //var r = http.post(url, payload, params);
  const r = http.get(url.toString(),params);

  console.log(`Status ${r.status}`);  
  //console.log(r.body.toString());

  check(r, {
    'status is 200': (r) => r.status === 200,
  });
  if (r.status === 429) {
    throttling.add(1);
  }
  
  let doc = parseHTML(r.body);

    // Trova il modulo con l'id 'SAMLRequestForm'
    let form = doc.find('form#SAMLRequestForm');

    // Trova l'input nascosto con il nome 'SAMLRequest'
    let samlRequestInput = form.find('input[name="SAMLRequest"]');

    // Estrai il valore della SAMLRequest
    let samlRequest = samlRequestInput.attr('value');
	
	// Converti la SAMLRequest in Base64
    let samlRequestDec = encoding.b64decode(samlRequest);
	
    // Converti l'ArrayBuffer in una stringa
    let samlRequestStr = arrayBufferToString(samlRequestDec);
    // console.log(`Decoded SAMLRequest: ${samlRequestStr}`);

    // Estrai il SAMLRequest ID mediante regular expression
    let samlRequestIdMatch = samlRequestStr.match(/ID="([^"]+)"/);
	let samlRequestId = samlRequestIdMatch[1];
	
	console.log(`RequestID: ${samlRequestId}`);
  
  sleep(0.5);
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
