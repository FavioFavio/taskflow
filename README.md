# TaskFlow

TaskFlow es una aplicación web de gestión personal de tareas. El proyecto está organizado como un monorepo npm con una aplicación frontend en Next.js.

La carpeta `backend/` existe, pero está reservada para posibles implementaciones futuras. En el estado actual del proyecto, la lógica server-side vive en Next.js y Supabase.

## Tecnologías utilizadas

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui / Radix UI
- Supabase con `@supabase/ssr`
- React Hook Form
- Zod
- Vitest + Testing Library
- ESLint
- Prettier
- GitHub Actions CI
- Vercel como destino de despliegue

## Arquitectura del proyecto

```text
taskflow/
  frontend/   Aplicación Next.js
  backend/    Reservado para posibles implementaciones futuras
  docs/       Documentación del proyecto
```

Estructura principal del frontend:

```text
frontend/src/
  app/          Rutas, layouts y páginas de Next.js App Router
  components/   Componentes UI, layout y componentes compartidos
  features/     Módulos funcionales de auth, dashboard, settings y tasks
  lib/          Utilidades compartidas e integración con Supabase
```

Módulos implementados en `features/`:

- `auth`: registro, inicio de sesión, cierre de sesión, schemas y componentes.
- `dashboard`: resumen de tareas.
- `tasks`: CRUD, filtros, schemas, services, actions, types y componentes.
- `settings`: preferencias de tema, idioma, cuenta y restablecimiento de contraseña.

## Funcionalidades implementadas

- Registro, login, logout y sesión persistente con Supabase.
- Rutas protegidas.
- Dashboard con total de tareas, tareas pendientes y tareas completadas.
- CRUD de tareas.
- Completar y reabrir tareas.
- Filtros por búsqueda, estado y prioridad.
- Settings con:
  - Email del usuario autenticado.
  - Fecha de creación de la cuenta si Supabase la entrega.
  - Logout.
  - Tema claro, oscuro o sistema.
  - Idioma español.
  - Versión de la aplicación.
  - Opción de restablecimiento de contraseña.
- Interfaz en español.
- Dark mode.
- Loading states.
- Empty states.
- Error states.
- Toast notifications.
- Diálogo de confirmación para eliminar tareas.

## Variables de entorno

El frontend usa estas variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

No se deben commitear valores reales de variables de entorno.

## Instalación

Desde la raíz del proyecto:

```bash
npm install
```

Para correr la aplicación en desarrollo:

```bash
npm run dev
```

Abrir `http://localhost:3000`.

También se puede correr directamente desde el workspace frontend:

```bash
cd frontend
npm run dev
```

## Scripts disponibles

Scripts disponibles desde la raíz:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run coverage
npm run format
npm run format:check
npm run prepare
```

## Tests

Para ejecutar los tests:

```bash
npm run test
```

El proyecto usa Vitest y Testing Library.

## Cobertura

Para ejecutar la cobertura:

```bash
npm run coverage
```

La cobertura se genera desde el workspace `frontend`.

## CI/CD

El workflow de GitHub Actions está definido en `.github/workflows/ci.yml`.

Se ejecuta en:

- `push` a `main`
- `pull_request`

Pasos configurados:

```bash
npm ci
npm run format:check
npm run test
npm run coverage
npm run lint
npm run typecheck
npm run build
```

## Deploy

La aplicación está desplegada en Vercel:

https://taskflow-omega-ebon.vercel.app/

## Checklist de validación

- Instalar dependencias con `npm install`.
- Configurar variables de entorno del frontend.
- Ejecutar `npm run format:check`.
- Ejecutar `npm run lint`.
- Ejecutar `npm run typecheck`.
- Ejecutar `npm run test`.
- Ejecutar `npm run coverage`.
- Ejecutar `npm run build`.
- Probar registro, login y logout.
- Probar creación, edición, eliminación, completar y reabrir tareas.
- Probar filtros por búsqueda, estado y prioridad.
- Probar dashboard.
- Probar settings.
- Probar dark mode.
- Probar responsive en desktop y mobile.
