# User Posts Hub

Aplicación en **React + TypeScript** que consume la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com): lista los usuarios con búsqueda por nombre, muestra las publicaciones del usuario elegido y permite crear nuevas con un formulario validado.

## Funcionalidades

- **Usuarios:** lista con avatar e iniciales, y búsqueda por nombre que ignora mayúsculas y tildes ("jose" encuentra "José"), con botón para limpiarla.
- **Publicaciones:** al elegir un usuario se cargan sus publicaciones. Si se cambia de usuario antes de que lleguen, la petición anterior se cancela.
- **Nueva publicación:** título y texto obligatorios (solo espacios cuenta como vacío). Los errores aparecen al salir del campo o al publicar. La publicación creada aparece la primera de la lista, aunque la API no la guarda de verdad.
- **Estados visibles:** esqueletos de carga con la forma del contenido, errores con botón para reintentar, listas vacías y aviso de publicación creada.
- **Idiomas:** inglés y español, con selector EN/ES. Se usa el idioma del navegador y la elección se guarda para la próxima visita.
- **Responsive:** dos columnas en escritorio, con el panel de usuarios fijo mientras se recorren las publicaciones. En móvil los paneles se apilan y, al elegir un usuario, la página baja hasta sus publicaciones.
- **Accesibilidad:** paneles como regiones con nombre, contadores que se anuncian al cambiar, `aria-current` en el usuario elegido, `aria-invalid` en los campos con error y etiquetas en los botones de solo icono.

## Cómo ejecutarlo

Requisitos: Node.js y npm (probado con Node 24.22 y npm 11.19).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando              | Qué hace                                                           |
| -------------------- | ------------------------------------------------------------------ |
| `npm run dev`        | Servidor de desarrollo                                             |
| `npm test`           | Tests con Vitest (una pasada)                                      |
| `npm run test:watch` | Tests en modo observación                                          |
| `npm run lint`       | oxlint (incluye un máximo de 250 líneas por archivo)               |
| `npm run typecheck`  | Comprobación de tipos con `tsc`                                    |
| `npm run format`     | Formatea el código con Prettier                                    |
| `npm run check`      | Formato + lint + tipos + tests. Se pasa antes de cada commit       |
| `npm run build`      | Build de producción en `dist/`                                     |
| `npm run docs`       | Documentación de la API a partir del JSDoc con TypeDoc, en `docs/` |

## Stack

React 19, Vite 8, TypeScript 7 (modo `strict`), MUI 9 + Emotion, Vitest 5, Testing Library, MSW 3, oxlint, Prettier y TypeDoc.

## Estructura

```
src/
├─ api/            httpClient (fetch + HttpError), usersApi, postsApi
├─ hooks/          useFetch (carga, error, reintento y cancelación), useLanguage, useUiTexts
│  └─ api/         useUsers, usePostsByUser, useCreatePost
├─ components/     compartidos: PanelContainer, ErrorState, EmptyState, LanguageSwitch, AppLogo
├─ pages/UsersPostsPage/
│  ├─ hooks/       useSelectedUser, useScrollToPosts, useUsersPostsPage
│  └─ components/
│     ├─ UsersPanel/   container + useUsersPanel, lista, búsqueda, esqueleto
│     └─ PostsPanel/   container + usePostsPanel, lista, tarjeta, formulario, esqueleto
├─ providers/      AppProviders (tema de MUI e idioma)
├─ types/  utils/  constants/  theme/
└─ test/           setup, renderWithProviders y servidor MSW con fixtures
```

El flujo de datos va siempre en un sentido: **`api/` → hooks de datos → hooks de negocio de cada componente → componentes**. Los containers (`UsersPanel`, `PostsPanel`) piden los datos a su hook y los reparten como props; los componentes de presentación solo pintan.

## Decisiones

- **Sin Redux.** El estado es pequeño (la lista, la búsqueda y el usuario elegido) y vive en hooks.
- **`useFetch` propio en vez de TanStack Query**, para no añadir una dependencia en algo de este tamaño. Cancela con `AbortController` la petición anterior al cambiar de usuario, así una respuesta tardía nunca pisa los datos nuevos. `loading` se calcula comparando la petición actual con la del resultado guardado, sin `setState` dentro del efecto.
- **Ids locales para las publicaciones creadas.** JSONPlaceholder responde siempre con `id: 101`, así que dos publicaciones nuevas tendrían el mismo id. Cada una recibe un id local negativo (-1, -2…), que es único y no choca con los de la API. Hay un test que crea dos seguidas.
- **La búsqueda solo mira el nombre**, como pide el enunciado; un test lo fija.
- **Container / presentational y especialización.** Cuando un caso es distinto se crea un componente propio (por ejemplo `UserListSkeleton` y `PostListSkeleton`) en vez de llenar uno base de props condicionales.
- **i18n propio en vez de i18next.** Con dos idiomas y unos 50 textos, cada `*UiTexts.ts` tiene un diccionario `{ en, es }` tipado: si falta una traducción, TypeScript da error. Si crecieran los idiomas o hubiera traductores, cada diccionario pasaría a ser un _namespace_ de i18next.
- **MSW en los tests** en vez de simular `fetch`, para probar los componentes contra respuestas HTTP reales, incluidos los errores.
- **Reglas que se comprueban solas.** `npm run check` reúne formato, lint, tipos y tests, y oxlint impide archivos de más de 250 líneas. La plantilla de Vite no activaba `strict` en TypeScript, así que se activó.
- **TypeDoc con `npx`.** TypeScript 7 ya no expone la API de JavaScript que necesita TypeDoc, así que el script lo ejecuta con TypeScript 6 sin tocar las dependencias del proyecto.

## Tests

47 tests en 15 archivos, con Vitest, Testing Library y MSW:

- **Hooks de datos:** carga, error, reintento y creación de publicaciones.
- **Reglas puras:** búsqueda por nombre, validación del formulario, iniciales del avatar y detección del idioma.
- **Componentes:** estados del panel de usuarios y del de publicaciones, validación y envío del formulario, flujo de creación (también con error de la API) y regiones accesibles.
- **Página completa:** elegir un usuario y ver sus publicaciones, el scroll en móvil y en escritorio, y el recorrido completo en español.

## Qué haría con más tiempo

- **TanStack Query**, para tener caché, reintentos automáticos y mutaciones optimistas.
- **Rutas** (`/users/:id`), para poder compartir el enlace a un usuario.
- **Paginación o virtualización**, si las listas fueran grandes.
- **Tests E2E con Playwright** en varios navegadores. Las pruebas visuales de diseño responsive se hicieron a mano con Playwright, pero no forman parte de la suite.
- **CI en GitHub Actions** que pase `npm run check` en cada push, y husky + commitlint en local.
- **Storybook** para los componentes de presentación.
- **Despliegue** en Vercel o GitHub Pages.
- **i18next**, si se añadieran más idiomas.

## Uso de la IA

Usé asistentes de IA, **Claude Code y Codex**, durante todo el desarrollo. No incluyo los prompts: son parte de mi forma de trabajar, que he ido afinando con el tiempo.

**Qué le pedí:**

- Montar el proyecto y las herramientas (Vite, Vitest, MSW, Prettier, oxlint, MUI) y el script `check`.
- Implementar cada paso con micro-commits en inglés siguiendo Conventional Commits.
- Respetar mis reglas de arquitectura: flujo de datos por capas, container / presentational, especialización, responsabilidad única, JSDoc, estilos en un `styled.ts` por carpeta, textos y `testIds` en constantes, y un máximo de 250 líneas por archivo.
- Añadir el soporte en inglés y español, el logo y una prueba visual del diseño responsive.

**Qué acepté:** la configuración propuesta de las herramientas, la separación en capas, el `useFetch` propio, el diseño del tema, la estructura de carpetas, los ids locales para las publicaciones nuevas y el i18n propio frente a i18next.

**Qué corregí o hice corregir:**

- El idioma de los primeros commits (los reescribí en inglés) y que no llevaran la línea `Co-Authored-By`.
- Un commit que se subió con el build roto (`f20ada6`). Se arregló en `ddd7bd2` y desde entonces solo se commitea si pasa `npm run check`.
- Las iniciales de "Mrs. Dennis Schulist" salían "MD". Se arregló en `5866578`, con un test que usa nombres reales de la API.
- Errores de tipos por cambios de MUI 9 (las _system props_ de `Box` y `styled(Paper)`).
- El scroll a las publicaciones en móvil se quedaba a medias (`c5ac325`). Los tests con jsdom no podían detectarlo; lo encontró la prueba visual que pedí y se arregló en `6a8ee65`.
- En escritorio la lista de usuarios se cortaba y dejaba un hueco vacío. Lo detecté revisando la app y se arregló en `82d1b51`, con el panel de usuarios fijo y las tarjetas más compactas.
- El favicon seguía siendo el de Vite y el título no estaba centrado. Se cambió por un logo propio.
- La documentación JSDoc la revisé y completé yo.

Hay un error que se quedó en el historial: el cuerpo del commit `aca51c3` muestra un `\n` literal. Corregirlo obligaba a reescribir el historial ya subido, y preferí no hacerlo.

## Tiempo invertido

Unas **2 horas y 20 minutos**: del primer commit (15/11, 23:37) al commit de este README (16/11, 01:56).
