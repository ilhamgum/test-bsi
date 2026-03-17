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

This project uses a **Domain-Driven Design (DDD)** architecture approach. Means, the project is divided into several domains, each with its own features, models, and hooks.

## Remark

This project is built using Next.js 16.1.6 with TypeScript. It uses Tailwind CSS for styling and Zustand for state management. The project follows a Domain-Driven Design (DDD) architecture approach and uses Atomic Design for component organization. It also uses Prettier and ESLint for code quality and uniformity.

> This project is built with the help of AI assistance, especially the components and styling. But, me as a human still review and modify it to make sure it meets the requirements and standards. And, here is the things I concern when reviewing the code:

### 1. Separating Logic and Presentation

I am using Domain-Driven Design (DDD) architecture approach to separate the logic and presentation. This approach helps to keep the code organized and easy to maintain. It also makes it easier to scale the project in the future by adding new domains or modifying existing ones without affecting other parts of the project.

### 2. Atomic Design

I am using Atomic Design for components to get the clear purpose of each component based on it's responsibility and size.

### 3. Code Quality

I am using `Prettier` (with it's plugins) and `ESLint` to maintain the code quality and uniformity. Therefore it will easily to be maintained and scaled for future maintainers.

### 4. Code Structure

I am avoiding using `else` for if-statements and using early returns instead. It makes the code logic more human-readable and easier to debug.

### 5. (Most Important) Understand What Each Line Does

Even though I use AI assistance to generate the code, I always make sure that I understand what each line of code does. If I don't understand something, I will try to understand it first before using it. 


