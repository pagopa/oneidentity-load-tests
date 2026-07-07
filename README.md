# oneidentity-load-tests

Repository dedicated to load testing for the [pagopa/oneidentity](https://github.com/pagopa/oneidentity) project.

It includes Artillery + Playwright scenarios that can run:

- locally
- on AWS Fargate

## Prerequisites

- Node.js 18+
- dependencies installed with `npm install`
- (for Fargate) AWS credentials configured in your environment

## Client ID configuration

Before running load tests, check and update the `clientId` value in `package.json` if needed.

- Reference: `config.clientId` in [package.json](package.json)
- Runtime override (without editing the file): `CLIENT_ID=<your-client-id> npm run ramp_01`

## Command to run load tests

Standard run on AWS Fargate:

```bash
yarn start
```

or

```bash
npm run test-<number>
```

Always check the scripts declared in [package.json](package.json) file.
