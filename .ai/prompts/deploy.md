# Deploy Prompt

Implement a production-ready deployment configuration for the project.

## Target Platform

Vercel

## Requirements

Do not change project architecture.

Do not introduce unnecessary dependencies.

Keep the project compatible with Next.js 16.

---

# Environment Variables

Verify the project reads the following variables correctly.

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

Do not hardcode credentials.

---

# Build

Ensure the application builds without warnings or errors.

Run

- npm run lint
- npm run build

Resolve build issues before deployment.

---

# Authentication

Verify Supabase authentication works in production.

Protected routes must redirect unauthenticated users.

Authenticated users should reach the dashboard.

Session persistence must work after page refresh.

---

# Database

Verify CRUD operations work against the production Supabase project.

No mock data.

No local JSON files.

---

# UI

Verify

Responsive layout

Dark mode

Loading states

Error states

Empty states

Navigation

---

# Performance

Review unnecessary client components.

Prefer Server Components whenever possible.

Lazy load heavy UI when appropriate.

Avoid unnecessary re-renders.

---

# Accessibility

Check

Labels

Buttons

Keyboard navigation

Dialog accessibility

ARIA attributes when necessary

---

# Production Checklist

- No console.log
- No commented code
- No TODOs
- No unused imports
- No TypeScript errors
- No ESLint errors
- No duplicated code
- No hardcoded secrets

---

# Vercel Configuration

Confirm the project is ready for deployment.

Required environment variables:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

No additional configuration should be required.

---

# Final Review

Produce a deployment checklist.

Report

Files modified

Architecture decisions

Potential improvements

Potential risks

Do not implement unrelated features.

Only make changes required for a successful production deployment.
