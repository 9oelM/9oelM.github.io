---
title: "Create a robust E2E Testing with typescript, puppeteer, jest, and docker"
date: "2019-11-18T09:00:00.009Z"
category: "development"
tags: ["development", "e2e", "typescript", "puppeteer", "jest", "docker"]
---

## Setup

In this tutorial, we are going to see how to create a E2E Testing with the following stack:

- typescript
- puppeteer
- jest
  - jest-image-snapshot
  - jest-html-reporters
- docker

The key points are jest-image-snapshot and docker, because I don't think many tutorials cover those. So let us get started!

First, install dependencies:

```bash
yarn add puppeteer jest@24.0 jest-image-snapshot jest-html-reporters typescript dotenv
```

```bash
yarn add -D @types/expect-puppeteer @types/jest@24.0 @types/jest-environment-puppeteer @types/jest-image-snapshot @types/puppeteer ts-jest@24.1
```

Add these files:
