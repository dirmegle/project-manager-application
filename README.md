# Project Manager App

A simple and straight-forward app for project management. Created for individual freelancers and small business owners.

## Project justification

The app is intended to bridge the gap between complex project management websites and the needs of individual freelancers/small business owners. The app is meant to provide the target audience with simple methods to get an overview of project/order states, their income, clients and invoices.

Many popular project/task management platforms come with features that are usually intended for enterprises, which often results in a steep learning curve and an overwhelming experience for individual freelancers and small business owners. These platforms, while powerful, are frequently cluttered with functionalities that are not necessarily beneficial to a smaller scale operation, leading to inefficiency and potential disuse.

This app seeks to eliminate these challenges by focusing on a streamlined, user-friendly interface that caters specifically to the needs of freelancers and small businesses.

In addition to that, the app is also useful for people who need to track their work for portfolio/reference reasons.

## Project scope

The application offers or will soon offer the following features:
- **Dashboard:** quick summary of ongoing and completed projects and income, presented in a clear and understandable way.
- **Project overview:** allows users to add their projects, provides a view of completed and ongoing projects.
- **Project detail overview:** users can view details of each specific project. They also can add line items (products, services) to each project, getting immediate overview of planned income.
- **Client overview:** ability to add new clients, overview of existing clients.
- **Invoicing: <span style="color: red">(not implemented yet)</span>** ability to generate and share PDF invoices based on projects - line items and client details.
- **Tax calculator: <span style="color: red">(not implemented yet)</span>** an integrated calculator that shows the amount of taxes to be allocated, based on the Lithuanian tax system.

## Planned improvements

Due to lack of time, the application is not withouts its limitations and drawbacks. These are the improvements planned that should increase user experience:

**Onboarding & personalization:**
- With the first initialization of the app, provide a stepper with the information on application features.
- Gather information from the user to increase app personalization (name, logo, also billing information and address for the future invoicing feature)

**Project/order management:**
- Addition of deadlines to each project. This would allow creation of notifications in the dashboard about upcoming deadlines.
- Add further filtering of projects: by deadline, by client.
- Add default unit and price for project to increase ease-of-use.
- Add key navigation, especially in project detail view while adding line items.

**Client management:**
- Add ability to edit client information.

**Additional features:**
- Implement the remaining invoicing and tax calculation features.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
