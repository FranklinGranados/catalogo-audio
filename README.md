# Catalogo de Audio

Landing page de un catálogo de productos de audio (parlantes, subwoofers, torres de sonido) de marcas como JBL, Sony, Bose, Behringer y Xiaomi. Construida con Next.js 16 (App Router) y Supabase como base de datos y backend serverless.

## Caracteristicas implementadas

- Listado de productos consumido desde Supabase (Server Components)
- 2 rutas dinámicas: `/productos/[slug]` (detalle de producto) y `/marcas/[marca]` (productos filtrados por marca)
- Row Level Security (RLS) configurado en Supabase: lectura pública, sin escritura desde el cliente
- Diseño responsive con Tailwind CSS
- Loading state personalizado
- Manejo de errores (a nivel de página y a nivel de aplicación con `error.tsx`)

## Tecnologias

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + API + RLS)
- Vercel (despliegue)

## Instalacion local

1. Clonar el repositorio:
   \`\`\`bash
   git clone https://github.com/FranklinGranados/catalogo-audio.git
   cd catalogo-audio
   \`\`\`

2. Instalar las dependencias:
   \`\`\`bash
   npm install
   \`\`\`

3. Crear un archivo `.env.local` en la raiz del proyecto, basandose en `.env.example`, y completalo con sus propias credenciales de Supabase:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   \`\`\`

4. Correr el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Abrir [http://localhost:3000](http://localhost:3000) en su navegador.

## Variables de entorno necesarias

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (anon/publishable) del proyecto de Supabase |

## Estructura de la base de datos

Tabla `productos` con columnas: `id`, `nombre`, `marca`, `categoria`, `modelo`, `precio`, `descripcion`, `slug` (único), `imagen_url`, `stock`, `created_at`. Protegida con una política RLS que permite lectura pública (`SELECT`) y bloquea escritura desde el cliente.