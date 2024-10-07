import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export let options = {
  stages: [
    { duration: '5s', target: 1 }, // Simula 20 utenti per 30 secondi
    { duration: '10s', target: 2 },  // Riduce a 10 utenti per 1 minuto
    { duration: '3s', target: 1 },  // Riduce a 0 utenti in 10 secondi
  ],
};

export default function () {
  let res = http.get('https://dev.oneid.pagopa.it/idps');
  check(res, {
    'status was 200': (r) => r.status == 200,
    'response time was less than 500ms': (r) => r.timings.duration < 5000,
  });
  sleep(1);
}

export function handleSummary(data) {
    return {
        'TestSummaryReport.html': htmlReport(data, { debug: true })
    };
}