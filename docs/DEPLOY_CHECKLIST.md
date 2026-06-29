Quiero agregar un checklist de deploy para la entrega del proyecto.

Contexto:

- Estoy en la rama `chore/delivery-docs`.
- Ya actualicé README.md.
- El proyecto TaskFlow se desplegará en Vercel.
- Usa Next.js en el workspace frontend y Supabase.
- No quiero inventar URL de producción ni valores secretos.

Objetivo:
Crear `docs/DEPLOY_CHECKLIST.md`.

Contenido requerido:

1. Pre-deploy local:
   - format:check
   - lint
   - typecheck
   - test
   - coverage
   - build
2. Configuración en Vercel:
   - importar repo
   - root directory: frontend
   - configurar variables de entorno
   - deploy
3. Variables de entorno:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Validación de autenticación:
   - register
   - login
   - logout
   - rutas protegidas
5. Validación de CRUD:
   - crear tarea
   - editar tarea
   - completar/reabrir tarea
   - eliminar tarea
   - filtros
6. Validación de RLS:
   - usuario A no ve tareas de usuario B
   - usuario A no puede modificar/eliminar tareas de usuario B
7. Validación responsive:
   - login
   - dashboard
   - tasks
   - settings
   - navegación mobile
8. Post-deploy:
   - completar URL de producción en README
   - agregar capturas reales
   - verificar consola sin errores críticos

Requisitos:

- Crear sólo `docs/DEPLOY_CHECKLIST.md`.
- No modificar README.md todavía.
- No inventar URLs ni secretos.
- No hacer commit.
