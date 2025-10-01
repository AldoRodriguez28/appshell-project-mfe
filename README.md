# AppShell Monorepo

Monorepo Angular que orquesta un shell y cuatro microfrontends (dashboard, tareas, IAM y marketing) usando Native Federation y TailwindCSS.

## Requisitos previos

- Node.js ^20.19 o ^22.12 (Native Federation y CLI lo requieren)
- npm 10+

## Proyectos incluidos

| Proyecto | Tipo | Puerto dev | Descripción |
| --- | --- | --- | --- |
| `app-shell` | Host | `4200` | Layout principal con header, sidebar, theming y carga diferida de remotes. |
| `mfe-dashboard` | Remote | `4300` | KPI y actividad reciente. |
| `mfe-tasks` | Remote | `4301` | Tabla de tareas mock. |
| `mfe-iam` | Remote | `4302` | Gestión de usuarios y roles. |
| `mfe-marketing` | Remote | `4303` | Campañas y métricas de marketing. |
| `ui` | Librería | — | Iconos, cards, botones y skeletons compartidos. |

## Scripts principales

```bash
npm run serve:shell       # http://localhost:4200
npm run serve:dashboard   # http://localhost:4300
npm run serve:tasks       # http://localhost:4301
npm run serve:iam         # http://localhost:4302
npm run serve:marketing   # http://localhost:4303

npm run build:shell       # build host
npm run build:dashboard   # build remote dashboard
# ... build:tasks, build:iam, build:marketing

npm run test              # tests del shell (ChromeHeadless)
# ... test:dashboard, test:tasks, test:iam, test:marketing

npm run lint              # ESLint (todas las apps)
```

Levanta cada remote en su terminal y arranca el shell para verlos montados. Las rutas `/dashboard`, `/tasks`, `/iam` y `/marketing` cargan cada MFE de forma lazy e incluyen skeleton + fallback ante errores de carga.

## Federación nativa

- Configurada con `@angular-architects/native-federation` (esbuild).
- Remotes expuestos como `RemoteEntryComponent` en `federation.config.js`.
- El host inicializa con `initFederation(environment.remotes)`.
- Puedes sobreescribir URLs en producción definiendo `window.__appShellRemotes__ = { 'mfe-dashboard': 'https://.../remoteEntry.json', ... };` antes de cargar el bundle.

> **Cambiar a Module Federation (webpack)**: reemplaza `@angular-architects/native-federation` por `@angular-architects/module-federation`, reconfigura `angular.json` para usar el builder webpack y ajusta los `module-federation.config.js`. El README mantiene esta nota como referencia.

## Tailwind & UI

- Tailwind configurado globalmente (`tailwind.config.js`, `postcss.config.cjs`).
- `@tailwind` directives añadidas a los estilos de cada app.
- Librería `@appshell/ui` expone `IconComponent`, `CardComponent`, `ButtonComponent` y `SkeletonComponent` reutilizados por shell y remotes.
- Google Material Symbols enlazados en todos los `index.html`. Usa `<ui-icon name="menu"></ui-icon>` para renderizar iconos accesibles.

## Añadir un nuevo microfrontend

1. Genera la app:
   ```bash
   ng g application mfe-reports --project-root=apps/mfe-reports --standalone --routing --style=css
   ```
2. Ejecuta:
   ```bash
   node ./node_modules/@angular/cli/bin/ng add @angular-architects/native-federation --project mfe-reports --type=remote --port 4304
   ```
3. Crea `remote-entry/remote-entry.component.ts` y expórtalo en `federation.config.js` (`'./Component': './apps/mfe-reports/src/app/remote-entry/remote-entry.component.ts'`).
4. Implementa el contenido y un test similar a los remotes existentes.
5. Agrega scripts en `package.json` (`serve:reports`, `build:reports`).
6. Actualiza `environment.development.ts` y `environment.ts` con la nueva URL y el host `app.routes.ts` con `remoteRoute('reports', 'mfe-reports', 'Reports', 'analytics')`.

Tiempo estimado: < 5 minutos siguiendo los pasos.

## Añadir elementos compartidos

- Crea componentes en `libs/ui/src/lib/<nombre>/<nombre>.component.ts` y exporta desde `libs/ui/src/public-api.ts`.
- Usa `@appshell/ui` para importarlos en shell o remotes.

## Versionar contratos compartidos

- Centraliza interfaces en `libs/ui` (o crea una librería `libs/contracts` si crecen).
- Versiona cambios usando `CHANGELOG` o etiquetas en git. Al actualizar un contrato, incrementa la versión del paquete (si publicas) o documenta el cambio en el README.

## Testing

- Cada remote incluye un `remote-entry.component.spec.ts` que valida el render inicial.
- Ejecuta pruebas con `npm run test -- --browsers=ChromeHeadless` (requiere Chrome o Chromium). Si no cuentas con un navegador headless instalado, puedes instalar `chromium` o ajustar Karma para usar `FirefoxHeadless`.

## Theming y accesibilidad

- `ThemeService` persiste el modo claro/oscuro y aplica la clase `dark` al `<html>`.
- Navegación lateral con `aria-current="page"`, botones con `aria-label`, foco visible y layout responsive (`md` colapsable, `lg` fijo).

## Troubleshooting

- **CORS / URLs remotas**: verifica los remotes registrados en `environment.(development).ts` o sobreescribe `window.__appShellRemotes__`.
- **Native Federation en entornos legacy**: si necesitas Webpack Module Federation, sigue las instrucciones en la sección anterior.
- **Node versión no soportada**: actualiza a la versión indicada arriba para evitar errores de CLI/esbuild.

¡Feliz hacking! ✨
