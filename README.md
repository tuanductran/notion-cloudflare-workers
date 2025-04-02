# Notion Cloudflare Worker

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

**Notion Cloudflare Worker** is a lightweight API designed to fetch book records from Notion Client. It is built using Cloudflare Workers and utilizes `Bun` as the package manager for better performance and efficiency.

## Features

- Fetch book data from Notion.
- Built with TypeScript for type safety.
- Uses `Bun` for fast dependency management.
- Cloudflare Workers integration for serverless deployment.

## Installation

Ensure you have [Bun](https://bun.sh/) installed on your system. Then, clone the repository and install dependencies:

```sh
bun install
```

## Usage

### Development

To start the development server, run:

```sh
bun run dev
```

### Linting and Formatting

To check and fix linting issues:

```sh
bun run lint
```

To format the code:

```sh
bun run format
```

## Scripts

- `bun run build` - Build the project using `bun`.
- `bun run dev` - Start the development server with `wrangler`.
- `bun run deploy` - Deploy the API to Cloudflare Workers.
- `bun run lint` - Run ESLint to check code quality.
- `bun run format` - Format the code using ESLint.
- `bun run type-check` - Perform TypeScript type checking.

## Configuration

Before using the API, ensure that your Notion API credentials are properly set up. This can be configured in your environment variables.

## Deployment

Deploy the API using Cloudflare Workers with the following command:

```sh
bun run deploy
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
