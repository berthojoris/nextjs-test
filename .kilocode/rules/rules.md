# AI Coding Guidelines for Next.js 15 Project

This document outlines the rules and best practices to be followed when adding, modifying, or fixing bugs in this project. This project is built with the following stack:

- **Framework**: Next.js v15
- **Language**: TypeScript
- **UI and Styling**: Tailwind CSS + shadcn UI
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Data Fetching**: React Server Components
- **Query Management**: TanStack Query (React Query)

---

## 1. File Structure and Conventions

- Use `app/` directory routing structure (App Router).
- Organize server components inside `app/`, keeping business logic separated in `lib/` or `services/`.
- Place UI components in the `components/ui/` folder.
- Use PascalCase for component names and camelCase for variables and functions.
- Each file should have a clear responsibility; avoid large, multi-purpose files.

## 2. TypeScript Guidelines

- Use strong typing wherever possible. Avoid using `any`.
- Prefer `type` over `interface` unless extending.
- Always type function parameters and return types.
- Use `zod` or similar for runtime validation if needed.

## 3. React Server Components (RSC)

- Fetch data inside server components using async functions.
- Avoid `useEffect` for data fetching unless inside a client component.
- Use `cache()` from `react` to memoize data when appropriate.
- Do **not** pass database clients or connections into client components.

## 4. Tailwind CSS Usage

- Use utility-first classes and responsive modifiers.
- Prefer reusable classes or components for common UI patterns.
- Avoid inline styles unless necessary.
- Follow mobile-first design principles.

## 5. shadcn UI

- Always use components from `@/components/ui/` unless you need to extend.
- Override styles using Tailwind classes, not direct CSS.
- When customizing, create a wrapper or variant in a separate component.

## 6. Environment Variables

- All sensitive information (API keys, secrets, DB credentials, etc.) must be stored in `.env` files.
- Never commit `.env` files or sensitive data to version control.
- Use `process.env` to access values securely in server-side code.

## 7. Database Access (MySQL + Prisma)

- Use Prisma ORM for all database interactions.
- Define Prisma models in `prisma/schema.prisma`.
- Use parameterized queries and proper data validation.
- Do not access the database in client components.
- Always run `npx prisma generate` after modifying schema.
- Place database access functions in `lib/prisma.ts` or `services/db/`.

## 8. Authentication (NextAuth.js)

- Use NextAuth.js for user authentication.
- Store authentication configuration in `app/api/auth/[...nextauth]/route.ts`.
- Use secure providers and encrypted JWT tokens.
- Login sessions must be configured to **expire after 1 hour**; user must re-authenticate after expiration.
- Store session settings and secrets in `.env`.

## 9. Performance Optimization

- All code must be written with **minimal logic and memory usage**.
- Prefer optimized algorithms and avoid unnecessary state or computation.
- Reduce component re-renders and avoid heavy client-side JavaScript.
- Minimize bundle size by tree-shaking unused libraries and using dynamic imports where applicable.
- Goal: the website must be **extremely lightweight and fast to access**, especially on low-end devices or slow networks.

## 10. Query Monitoring (TanStack Query)

- Use **TanStack Query (React Query)** for managing and monitoring client-side queries.
- Configure `QueryClient` and `QueryClientProvider` at the root of the app where needed.
- Leverage `useQuery` and `useMutation` for data fetching and mutation logic in client components.
- Always define `queryKey`s clearly and use caching wisely.
- Enable Devtools for query inspection during development (never in production).

## 11. Adding New Features

- Place feature-related components in a new folder under `app/feature-name/`.
- Use server components by default.
- Extract logic into reusable helpers or services in `lib/` or `services/`.
- Ensure types and interfaces are exported if reused.

## 12. Modifying Existing Code

- Ensure backward compatibility.
- Update relevant types/interfaces and tests.
- Run `tsc`, lint, and format code before committing.
- Use descriptive commit messages: `fix:`, `feat:`, `refactor:`, etc.

## 13. Bug Fixes

- Always include a test case or reproduction when fixing bugs.
- Trace bugs using logs or stack traces in server functions.
- Refactor duplicated or error-prone logic into reusable functions.

## 14. Commit & Documentation

- Follow Conventional Commits format.
- Update or create `README.md` or `feature-name.md` files for new features.
- Document new endpoints, queries, and mutations clearly.
- Add comments to complex or non-obvious logic blocks.

## 15. AI-Specific Instruction

- Always review the context of the codebase before generating changes.
- Do not remove existing logic unless explicitly told.
- Prefer minimal, readable, and safe code changes.
- Explain any assumptions when generating or modifying logic.