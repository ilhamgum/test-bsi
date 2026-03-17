# Warehouse Inventory Dashboard - Technical Test Frontend Engineer

Stock Management Dashboard with a Maker-Checker (Approval) workflow.

## Getting Started

First, build the apps:

```bash
npm run build
```

Then, run the server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

This project uses a Domain-Driven Design (DDD) architecture approach. Means, the project is divided into several domains, each with its own features, models, and hooks. With this approach we can easily maintain and scale the project in the future by adding new domains or modifying existing ones without affecting other parts of the project.

Besides that, atomic design is also implemented inside the component folder to tidy-up the categorization and ensure the reusability of the components. And by using `prettier` and `eslint` we can maintain the quality and uniformity of the code.
