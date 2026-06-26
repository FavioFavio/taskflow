# TaskFlow

TaskFlow is organized as a small monorepo with separated frontend and backend folders.

```text
taskflow/
  frontend/   Next.js app
  backend/    Reserved for a future dedicated backend service
  docs/       Project documentation
```

## Getting Started

From the project root, install dependencies and run the frontend:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also run commands directly inside the frontend workspace:

```bash
cd frontend
npm run dev
```

## Backend Strategy

There is no separate Spring Boot backend yet. Today, server-side behavior is handled by Next.js and Supabase in the frontend app.

That is a valid architecture for this stage. Add a Spring Boot service under `backend/` when the project needs a dedicated API layer, complex business rules, background processing, or integrations that should not live in the Next.js app.

## Common Commands

```bash
npm run dev
npm run build
npm run lint
```

These commands are defined at the root and delegated to the `frontend` workspace.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
