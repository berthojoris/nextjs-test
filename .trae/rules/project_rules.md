# TRAE AI Development Rules

This document outlines the required rules and guidelines that TRAE AI must follow when generating or editing code in this project.

## 🔧 Project Stack

- **Framework**: Next.js v15 (App Router)
- **UI Components & Layout**: Shadcn UI (based on Radix UI and Tailwind CSS)
- **Database**: MySQL
- **Styling**: Tailwind CSS (no external UI libraries except Shadcn UI)
- **Language**: TypeScript (strict mode enabled)


## 🧠 General Guidelines

1. **Next.js v15 Compliance**:
   - Use the **App Router**.
   - Organize pages under the `/app` directory.
   - Utilize **Server Actions**, **Middleware**, **Edge functions**, and **Streaming** where appropriate.
   - Prefer **Server Components** by default. Use **Client Components** only when necessary.

2. **Shadcn UI**:
   - All UI components must use [Shadcn UI](https://ui.shadcn.com/).
   - Custom components should extend or compose Shadcn components.
   - Do not mix with other UI libraries (e.g., MUI, Bootstrap, Chakra).

3. **Database (MySQL)**:
   - Use a modern ORM like **Prisma** or a lightweight query builder such as **Drizzle ORM**.
   - Always sanitize inputs to avoid SQL injection.
   - Structure schema for relational integrity and indexing for performance.


## ⚙️ Performance & Optimization

1. **Memory Efficiency**:
   - Avoid memory leaks (e.g., large object references or unclosed DB connections).
   - Reuse objects where possible.
   - Paginate or lazy-load data when rendering large datasets.

2. **Efficient Data Fetching**:
   - Use `getServerSideProps`, `getStaticProps`, or **Server Actions** for efficient data loading.
   - Cache responses using built-in Next.js caching strategies.
   - Use streaming when rendering large server components.

3. **Client Performance**:
   - Minimize client bundle size.
   - Split code and lazy load components.
   - Optimize images and use `next/image`.



## 🧪 Error Handling

1. **Exception Safety**:
   - All functions (server or client) must have **try/catch** blocks or proper exception handling logic.
   - Server functions must handle database errors gracefully (e.g., connection failure, query error).
   - Return meaningful error messages and log detailed stack traces (never expose to the user).

2. **API Routes & Actions**:
   - Always validate request payloads (e.g., with Zod or Yup).
   - Handle all HTTP errors with proper status codes.


## 🔐 Security

1. **Input Validation**:
   - Sanitize and validate all user inputs, both client and server side.

2. **Authentication/Authorization**:
   - Protect sensitive routes with middleware.
   - Secure cookies and session data.
   - Use encrypted tokens for auth flows.

3. **Database Security**:
   - Use environment variables for secrets and DB connections.
   - Limit DB user privileges.

4. **Environment Variables (.env)**:
   - All sensitive values (e.g., API keys, DB credentials, secrets) **must** be stored in the `.env` file.
   - Do **not** hardcode secrets or sensitive config into the source code.
   - Environment variables must **only** be accessed from **Server Components**, API routes, or Server Actions.
   - Never expose `.env` variables to the client side via `NEXT_PUBLIC_` prefix unless absolutely necessary and safe.


## 📁 Project Structure

/app - App Router structure
/components - Reusable components (Shadcn-based)
/lib - Utilities and helper functions
/db - DB config and Prisma/ORM setup
/middleware.ts - App-wide middleware logic
/types - Type definitions


## ✅ Best Practices

- Use **TypeScript** with strict typing.
- Avoid any **console.log** in production code.
- Maintain clean, readable, and documented code.
- Follow **conventional commit** format.
- Write reusable and composable components.
- Use `.env` for config and never hardcode secrets.


## 📦 Recommended Libraries

- `prisma` or `drizzle-orm` – Database access
- `zod` – Schema validation
- `@shadcn/ui` – UI components
- `tailwindcss` – Styling
- `next-auth` – Authentication (if needed)
- `eslint`, `prettier` – Linting and formatting

## 📘 Documentation

- Each page, component, and API route must include a top-level comment describing its purpose and expected inputs/outputs.

By following these rules, TRAE AI ensures the application remains scalable, secure, and production-ready with clean, efficient, and maintainable code.