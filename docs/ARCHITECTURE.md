# Architecture

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Supabase
- TanStack Query
- React Hook Form
- Zod

---

# Repository Structure

taskflow

frontend

backend

docs

---

# Frontend Structure

frontend/src

app

components

ui

layout

shared

features

auth

tasks

hooks

lib

providers

services

types

utils

---

# Feature Structure

Each feature owns:

components/

hooks/

schemas/

types/

services/

actions/

---

# Components

Prefer Server Components.

Only use Client Components when required.

Keep components small.

One responsibility per component.

---

# Services

Business logic belongs inside services.

UI components must not communicate directly with Supabase.

For the current MVP, server-side frontend code can use Supabase through dedicated server utilities, actions, and services. A separate backend service should be introduced only when the app needs independent API ownership, complex business workflows, background jobs, or multiple clients.

---

# Forms

Every form uses:

React Hook Form

-

Zod

---

# Validation

Validation exists in:

Client

Server

Database

---

# Styling

Tailwind only.

Use shadcn components.

Avoid custom CSS unless necessary.

---

# Naming

Components

PascalCase

Hooks

useSomething

Files

kebab-case

Types

PascalCase

Constants

UPPER_CASE

---

# Principles

DRY

SOLID

Composition over inheritance

Reusable UI

Readable code

No duplicated logic
