# Design System: Torito 1 Millón Expert AI

## Visión General
El diseño de la aplicación debe transmitir un look "premium", profesional y tecnológico, ya que se trata de un asistente de Inteligencia Artificial enfocado en predicciones.

## Colores y Tema
El proyecto utiliza fuertemente un esquema oscuro (Dark Mode) con acentos dorados para resaltar el carácter predictivo y valioso.

### Fondo (Backgrounds)
- **Base:** `bg-slate-900`
- **Superficies (Cards/Header):** `bg-slate-950`, `bg-slate-900/80` (con `backdrop-blur`)
- **Bordes:** `border-slate-800`, con toques sutiles de `border-yellow-600/30`.

### Acentos (Accents)
- **Primario (Dorado):** `yellow-400`, `yellow-500`, `yellow-600`. Se usa para el título, botones principales de acción (CTA), y bolillas del sorteo.
- **Secundario/Estados:**
  - *Caliente/Tendencia:* `red-400`, `red-500`, `red-600`.
  - *Rezagado/Frío:* `blue-400`, `blue-500`, `blue-600`.
  - *Éxito/Validación:* `green-400`, `green-500`.

## Tipografía
- Se utiliza una familia sans-serif (`font-sans`).
- Para elementos numéricos (bolillas de lotería) o títulos, se utiliza un peso `font-black` para maximizar el impacto visual.
- El tracking ajustado (`tracking-tighter`) se emplea en títulos principales.

## Micro-Interacciones y UI
- **Hover/Active:** Los botones deben reaccionar (ej. `hover:from-yellow-300`, `active:scale-95`).
- **Sombras/Glow (Neumorfismo/Glassmorfismo):** Uso intensivo de sombras con colores de acento, ej. `shadow-[0_0_20px_rgba(234,179,8,0.3)]` para darle un look de neón sutil.
- **Animaciones:** Clases de Tailwind para animaciones fluidas (ej. `animate-in`, `fade-in`, `duration-500`, y animaciones personalizadas de rebote `group-hover:-translate-y-3` en los números).

## Componentes Clave
1. **Header:** Fijo (`sticky top-0`), translúcido (`backdrop-blur-md`), con logotipo brillante.
2. **Dropzone (Upload):** Área punteada interactiva que cambia a bordes amarillos y agranda la escala al arrastrar.
3. **Panel Neuronal:** Botones seleccionables para estrategias con avatares icónicos (`lucide-react`).
4. **Visualizador 3D de Bolillas:** Círculos con gradientes radiales (`bg-gradient-to-br`) y sombras múltiples simulando un objeto esférico tridimensional sobre el fondo plano.
