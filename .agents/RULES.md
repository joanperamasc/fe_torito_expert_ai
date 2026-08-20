# Project Rules: Torito 1 Millón Expert AI

## Stack Tecnológico
- Astro (Core y Enrutamiento)
- React (Componentes Interactivos)
- Tailwind CSS (Estilos)
- TypeScript (Tipado fuerte)

## Reglas de Desarrollo

### 1. Astro y React (Islands Architecture)
- **Archivos `.astro`:** Úsalos para Layouts, páginas principales (routes) y componentes estáticos (ej. Header estático, Footer).
- **Archivos `.tsx`:** Úsalos estrictamente para componentes que requieran interactividad (`useState`, `useEffect`, eventos de usuario).
- Al incluir un componente React dentro de Astro que deba ser interactivo, SIEMPRE utiliza `client:load` (o `client:visible` si está debajo del fold), de lo contrario, Astro no enviará el JS al cliente.
  Ejemplo correcto: `<ToritoExpert client:load />`

### 2. Tailwind CSS
- Utiliza utilidades en línea en los archivos `.tsx` y `.astro` para aprovechar el autocompletado y evitar CSS excesivo y personalizado.
- Respeta los colores del Design System (slate, yellow, red, blue, green). No utilices colores genéricos por defecto (ej. azul genérico o gris claro).
- No uses la directiva `@apply` en CSS a menos que sea estrictamente necesario para reutilizar estilos globales masivos, prefiere crear componentes React reutilizables.

### 3. TypeScript
- Define interfaces claras para todas las props (ej. `interface PredictionResult { ... }`).
- Evita el uso de `any` a toda costa. Define tipos específicos.

### 4. Estructura de Archivos
- `src/pages/`: Contendrá las rutas (ej. `index.astro`).
- `src/components/`: Contendrá todos los componentes React y Astro. Se pueden separar en subcarpetas (ej. `ui`, `layouts`) si crece demasiado.
- `src/styles/`: Archivos base CSS (ej. `global.css`).
- `src/utils/` o `src/lib/`: Lógica de predicción, formateo de texto, o utilidades que no dependan directamente de un componente.
