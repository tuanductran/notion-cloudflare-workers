# Notion Cloudflare Workers

A simple API to fetch books from Notion Client.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [License](#license)

## Overview

**Notion Cloudflare Workers** is a lightweight API designed to fetch book records from Notion Client. It is built using Cloudflare Workers and utilizes `PNPM` as the package manager for better performance and efficiency.

## Features

- Fetch book data from Notion.
- Built with TypeScript for type safety.
- Uses `PNPM` for fast dependency management.
- Cloudflare Workers integration for serverless deployment.

## Installation

Ensure you have [PNPM](https://pnpm.io/) installed on your system. Then, clone the repository and install dependencies:

```sh
pnpm install
```

## Usage

### Development

To start the development server, run:

```sh
pnpm watch
```

### Linting and Formatting

To check and fix linting issues:

```sh
pnpm lint
```

To format the code:

```sh
pnpm format
```

## Scripts

- `pnpm build` - Build the project using `tsup`.
- `pnpm dev` - Start the development server with `tsup`.
- `pnpm wrangler:dev` - Start the development server with `wrangler`.
- `pnpm deploy` - Deploy the API to Cloudflare Workers.
- `pnpm lint` - Run ESLint to check code quality.
- `pnpm format` - Format the code using ESLint.
- `pnpm type-check` - Perform TypeScript type checking.
- `pnpm watch` - Start the development server with `tsup` and `wrangler`.

## Configuration

Before using the API, ensure that your Notion API credentials are properly set up. This can be configured in your environment variables.

## Deployment

Deploy the API using Cloudflare Workers with the following command:

```sh
pnpm deploy
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
