# oneidentity-load-tests

Repository dedicated to load testing for the [pagopa/oneidentity](https://github.com/pagopa/oneidentity) project.

It includes Artillery + Playwright scenarios that can run:

- locally
- on AWS Fargate

## Prerequisites

- Node.js 18+
- pnpm enabled with `corepack enable pnpm`
- dependencies installed with `pnpm install`
- (for Fargate) AWS credentials configured in your environment

## Client ID configuration

Before running load tests, check and update the `clientId` value in `package.json` if needed.

- Reference: `config.clientId` in [package.json](package.json)
- Runtime override (without editing the file): `CLIENT_ID=<your-client-id> pnpm run ramp_01`

## Command to run load tests

Standard run on AWS Fargate:

```bash
pnpm install
```

```bash
pnpm start
```

or

```bash
pnpm run ramp_01
```

Always check the scripts declared in [package.json](package.json) file.
