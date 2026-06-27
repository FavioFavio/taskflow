# CODEX_INSTRUCTIONS.md

# Project Overview

You are contributing to a production-quality web application called **TaskFlow**.

The goal is NOT to generate random code.

The goal is to produce clean, maintainable and scalable code following the architecture below.

Always prioritize readability over cleverness.

---

# Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Supabase
- React Hook Form
- Zod
- TanStack Query

Never replace these technologies.

---

# Architecture

Use this folder structure.

src/

app/

components/

ui/

layout/

shared/

features/

auth/

tasks/

hooks/

lib/

providers/

services/

types/

utils/

Never create duplicated folders.

---

# Code Style

- Functional components only.
- Strict TypeScript.
- No any.
- Reusable components.
- Small files.
- Clear naming.
- No unnecessary comments.

Prefer composition over inheritance.

---

# UI Rules

The design must feel like a modern SaaS dashboard.

Use shadcn/ui components whenever possible.

Spacing should be consistent.

Responsive first.

Support dark mode.

---

# Forms

Always use:

React Hook Form

-

Zod

Validation must be client side.

Display validation errors.

---

# Authentication

Use Supabase Authentication.

Do not store tokens manually.

Use @supabase/ssr.

Protect authenticated routes.

Redirect unauthenticated users to /login.

---

# Database

Current table

tasks

Columns

- id
- title
- description
- priority
- status
- due_date
- user_id
- created_at

Never change database schema without asking.

---

# Tasks Module

Features

Create task

Edit task

Delete task

List tasks

Filter tasks

Sort tasks

Dashboard statistics

---

# Components

Prefer creating reusable components.

Example

TaskCard

TaskForm

TaskList

StatsCard

EmptyState

Navbar

Sidebar

PageHeader

---

# Styling

Use Tailwind utilities.

Avoid inline styles.

Do not introduce CSS frameworks.

---

# Accessibility

Use semantic HTML.

Buttons must have type.

Inputs need labels.

Dialogs must be keyboard accessible.

---

# Performance

Use Server Components whenever possible.

Client Components only when necessary.

Avoid unnecessary re-renders.

---

# Git

Every logical feature should correspond to one commit.

Examples

feat: implement authentication

feat: add dashboard statistics

feat: implement task CRUD

refactor: extract reusable components

fix: correct authentication flow

---

# Important

Do not invent APIs.

Do not change dependencies.

Do not create mock data if Supabase exists.

Do not leave TODOs.

Return production-ready code.
