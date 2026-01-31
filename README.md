# Portfolio de Acuarelas

Un portfolio moderno y elegante para artistas de acuarela, construido con Next.js 14, TypeScript, Tailwind CSS y Contentful CMS.

## Características

- Diseño responsive con estética artística/orgánica
- Sistema de gestión de contenido (CMS) con Contentful
- Galería de obras con vista masonry
- Sistema de colecciones para organizar obras
- Blog integrado
- Página de tienda con consulta de disponibilidad
- Formulario de contacto
- Optimización de imágenes automática
- SEO optimizado
- Generación estática de páginas (SSG)
- Regeneración incremental estática (ISR)

## Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **CMS:** Contentful
- **Animaciones:** Framer Motion
- **Galería:** React Masonry CSS
- **Lightbox:** Yet Another React Lightbox
- **Hosting:** Vercel (recomendado)
- **Formularios:** Formspree

## Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- Cuenta en Contentful (gratuita)
- Cuenta en Formspree (opcional, para formulario de contacto)

## Instalación

### 1. Clonar el repositorio

```bash
cd watercolor-portfolio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=tu_preview_token
NEXT_PUBLIC_FORMSPREE_FORM_ID=tu_formspree_id
```

### 4. Configurar Contentful

**Opción A: Configuración Automática (Recomendado)** ⚡

```bash
npm run setup:contentful
```

Este script crea automáticamente todos los content models en Contentful. Solo necesitas:
1. Obtener el Management Token de Contentful
2. Agregarlo a `.env.local`
3. Ejecutar el script

Ver guía detallada en [scripts/README.md](./scripts/README.md)

**Opción B: Configuración Manual**

Sigue la guía completa en [CONTENTFUL_SETUP.md](./CONTENTFUL_SETUP.md) para:
- Crear los content models manualmente
- Configurar las API keys
- Agregar contenido de ejemplo

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
watercolor-portfolio/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── about/             # Página sobre la artista
│   │   ├── blog/              # Blog y posts
│   │   ├── collections/       # Colecciones de obras
│   │   ├── contact/           # Página de contacto
│   │   ├── gallery/           # Galería de obras
│   │   ├── shop/              # Tienda
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página de inicio
│   │   ├── robots.ts          # Robots.txt
│   │   └── sitemap.ts         # Sitemap XML
│   ├── components/            # Componentes React
│   │   ├── Gallery/           # Componentes de galería
│   │   │   ├── ImageCard.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   └── MasonryGrid.tsx
│   │   ├── ui/                # Componentes UI
│   │   │   └── RichText.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── lib/                   # Utilidades y configuración
│   │   ├── api.ts             # Funciones de Contentful
│   │   ├── contentful.ts      # Cliente de Contentful
│   │   └── types.ts           # Tipos TypeScript
│   └── styles/
│       └── globals.css        # Estilos globales
├── public/                    # Archivos estáticos
├── .env.example               # Ejemplo de variables de entorno
├── CONTENTFUL_SETUP.md        # Guía de configuración de Contentful
├── next.config.js             # Configuración de Next.js
├── package.json
├── tailwind.config.ts         # Configuración de Tailwind
└── tsconfig.json              # Configuración de TypeScript
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

## Configuración de Formspree

1. Ve a [formspree.io](https://formspree.io) y crea una cuenta
2. Crea un nuevo formulario
3. Copia el Form ID
4. Agrégalo a `.env.local` como `NEXT_PUBLIC_FORMSPREE_FORM_ID`

Alternativamente, puedes usar cualquier otro servicio de formularios o implementar tu propia API.

## Deploy en Vercel

### Opción 1: Deploy con Git (Recomendado)

1. Sube tu código a GitHub/GitLab/Bitbucket
2. Ve a [vercel.com](https://vercel.com) y crea una cuenta
3. Importa tu repositorio
4. Configura las variables de entorno en Vercel
5. Deploy automático

### Opción 2: Deploy con Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

### Variables de Entorno en Vercel

En Vercel > Settings > Environment Variables, agrega:

- `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`
- `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
- `NEXT_PUBLIC_FORMSPREE_FORM_ID`

### Webhooks de Contentful

Para regenerar el sitio automáticamente cuando publiques contenido:

1. Ve a Vercel > Settings > Git > Deploy Hooks
2. Crea un nuevo Deploy Hook
3. Copia la URL
4. Ve a Contentful > Settings > Webhooks
5. Crea un webhook con la URL de Vercel
6. Selecciona triggers: Publish y Unpublish

## Personalización

### Colores

Edita `tailwind.config.ts` para cambiar la paleta de colores:

```typescript
colors: {
  watercolor: { /* tus colores */ },
  sage: { /* tus colores */ },
}
```

### Tipografía

Las fuentes se configuran en `src/app/layout.tsx`:

```typescript
const inter = Inter({ /* config */ });
const playfair = Playfair_Display({ /* config */ });
```

### Información del Sitio

Edita `src/app/layout.tsx` para cambiar metadata general.
Edita `src/components/Footer.tsx` para cambiar email y redes sociales.

### Dominio Personalizado

1. Compra un dominio
2. En Vercel > Settings > Domains, agrega tu dominio
3. Configura los DNS según las instrucciones de Vercel
4. Actualiza las URLs en:
   - `src/app/sitemap.ts`
   - `src/app/robots.ts`

## Optimización de Imágenes

Next.js optimiza automáticamente las imágenes. Para mejores resultados:

- Sube imágenes de alta calidad a Contentful (2000px+)
- Usa formato JPG para fotografías
- Usa PNG para ilustraciones con transparencia
- Contentful Image API transformará las imágenes automáticamente

## Performance

El sitio está optimizado con:

- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR) - regenera cada hora
- Image optimization de Next.js
- Code splitting automático
- Lazy loading de imágenes
- Prefetching de páginas

## SEO

Incluido:

- Metadata optimizada en cada página
- Open Graph images
- Sitemap.xml generado dinámicamente
- Robots.txt configurado
- URLs amigables (slugs)
- Semantic HTML

## Soporte de Navegadores

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## Problemas Comunes

### Las imágenes no cargan

- Verifica que Contentful esté correctamente configurado
- Verifica que las URLs de imágenes estén en `next.config.js` > `remotePatterns`
- Verifica la conexión a internet

### El sitio no se actualiza con nuevo contenido

- Espera 1 hora (tiempo de ISR) o redeploy manualmente
- Verifica que hayas dado "Publish" en Contentful
- Limpia la caché del navegador

### Error de variables de entorno

- Verifica que `.env.local` exista
- Verifica que los nombres sean exactos (incluido `NEXT_PUBLIC_`)
- Reinicia el servidor de desarrollo

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Contentful](https://www.contentful.com/developers/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Guía de Deploy en Vercel](https://vercel.com/docs)

## Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## Autor

Desarrollado con pasión para artistas de acuarela.

---

¡Disfruta mostrando tu arte al mundo! 🎨
