# Configuración de Contentful

Este documento te guiará en la configuración de Contentful para tu portfolio de acuarelas.

## 1. Crear una cuenta en Contentful

1. Ve a [contentful.com](https://www.contentful.com) y crea una cuenta gratuita
2. Crea un nuevo Space (espacio) para tu proyecto
3. Anota el **Space ID** que aparece en Settings > General Settings

## 2. Obtener las API Keys

1. Ve a Settings > API keys
2. Crea un nuevo API key o usa el existente
3. Anota:
   - **Space ID**
   - **Content Delivery API - access token**
   - **Content Preview API - access token** (opcional, para preview)

## 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id_aqui
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_access_token_aqui
CONTENTFUL_PREVIEW_ACCESS_TOKEN=tu_preview_token_aqui
```

## 4. Crear Content Models

### 4.1 Artwork (Obra de Arte)

**Content type ID:** `artwork`

| Field Name | Field ID | Type | Required | Details |
|------------|----------|------|----------|---------|
| Title | `title` | Short text | ✓ | Título de la obra |
| Slug | `slug` | Short text | ✓ | URL-friendly, único |
| Main Image | `mainImage` | Media (Image) | ✓ | Imagen principal |
| Additional Images | `additionalImages` | Media (Images) | ✗ | Múltiples imágenes |
| Description | `description` | Rich text | ✗ | Descripción detallada |
| Technique | `technique` | Short text | ✗ | Ej: "Acuarela sobre papel" |
| Dimensions | `dimensions` | Short text | ✗ | Ej: "30x40 cm" |
| Year | `year` | Integer | ✗ | Año de creación |
| Price | `price` | Integer | ✗ | Precio en tu moneda |
| Available for Sale | `availableForSale` | Boolean | ✓ | Default: false |
| Collection | `collection` | Reference (Collection) | ✗ | Una referencia |
| Featured | `featured` | Boolean | ✓ | Default: false |
| Order | `order` | Integer | ✗ | Para ordenar obras |

**Validations importantes:**
- Slug: Pattern `^[a-z0-9]+(?:-[a-z0-9]+)*$`, Unique
- Main Image: Accept only images, Max file size 10MB

### 4.2 Collection (Colección)

**Content type ID:** `collection`

| Field Name | Field ID | Type | Required | Details |
|------------|----------|------|----------|---------|
| Name | `name` | Short text | ✓ | Nombre de la colección |
| Slug | `slug` | Short text | ✓ | URL-friendly, único |
| Description | `description` | Rich text | ✗ | Descripción de la colección |
| Cover Image | `coverImage` | Media (Image) | ✓ | Imagen de portada |
| Artworks | `artworks` | References (Artwork) | ✗ | Múltiples referencias |

**Validations importantes:**
- Slug: Pattern `^[a-z0-9]+(?:-[a-z0-9]+)*$`, Unique

### 4.3 Blog Post

**Content type ID:** `blogPost`

| Field Name | Field ID | Type | Required | Details |
|------------|----------|------|----------|---------|
| Title | `title` | Short text | ✓ | Título del post |
| Slug | `slug` | Short text | ✓ | URL-friendly, único |
| Content | `content` | Rich text | ✓ | Contenido del post |
| Featured Image | `featuredImage` | Media (Image) | ✓ | Imagen destacada |
| Publish Date | `publishDate` | Date and time | ✓ | Fecha de publicación |
| Excerpt | `excerpt` | Long text | ✓ | Resumen (max 300 chars) |

**Validations importantes:**
- Slug: Pattern `^[a-z0-9]+(?:-[a-z0-9]+)*$`, Unique
- Excerpt: Max 300 characters

### 4.4 About Page

**Content type ID:** `aboutPage`

| Field Name | Field ID | Type | Required | Details |
|------------|----------|------|----------|---------|
| Biography | `biography` | Rich text | ✓ | Biografía de la artista |
| Profile Photo | `profilePhoto` | Media (Image) | ✗ | Foto de perfil |
| Creative Process | `creativeProcess` | Rich text | ✗ | Descripción del proceso |
| Exhibitions | `exhibitions` | Rich text | ✗ | Exposiciones y logros |

**Nota:** Solo debes crear UNA entrada de este tipo.

### 4.5 Site Settings (Opcional)

**Content type ID:** `siteSettings`

| Field Name | Field ID | Type | Required | Details |
|------------|----------|------|----------|---------|
| Site Name | `siteName` | Short text | ✓ | Nombre del sitio |
| Logo | `logo` | Media (Image) | ✗ | Logo del sitio |
| Social Media | `socialMedia` | Long text | ✗ | Enlaces a redes (JSON) |
| Contact Email | `contactEmail` | Short text | ✓ | Email de contacto |
| Welcome Text | `welcomeText` | Long text | ✗ | Texto de bienvenida |

**Nota:** Solo debes crear UNA entrada de este tipo.

## 5. Crear Contenido de Ejemplo

### Crear una Colección

1. Ve a Content > Add Entry > Collection
2. Completa:
   - Name: "Paisajes"
   - Slug: "paisajes"
   - Description: Escribe una descripción
   - Cover Image: Sube una imagen
3. Publish

### Crear una Obra de Arte

1. Ve a Content > Add Entry > Artwork
2. Completa:
   - Title: "Atardecer en la montaña"
   - Slug: "atardecer-en-la-montana"
   - Main Image: Sube una imagen
   - Description: Escribe una descripción
   - Technique: "Acuarela sobre papel"
   - Dimensions: "30x40 cm"
   - Year: 2024
   - Price: 150 (opcional)
   - Available for Sale: ✓
   - Collection: Selecciona "Paisajes"
   - Featured: ✓ (si quieres que aparezca en la página principal)
3. Publish

### Crear un Post de Blog

1. Ve a Content > Add Entry > Blog Post
2. Completa todos los campos requeridos
3. Publish

### Crear About Page

1. Ve a Content > Add Entry > About Page
2. Completa la biografía y sube una foto
3. Publish

## 6. Configurar Webhooks (Opcional)

Para que Vercel regenere el sitio automáticamente cuando publiques contenido:

1. Ve a Settings > Webhooks en Contentful
2. Add webhook
3. Name: "Deploy to Vercel"
4. URL: Tu webhook URL de Vercel (lo obtienes en Vercel > Settings > Git > Deploy Hooks)
5. Triggers: Selecciona "Publish" y "Unpublish"
6. Content type: Selecciona todos los tipos
7. Save

## 7. Tips y Best Practices

### Imágenes

- **Formato recomendado:** JPG o PNG
- **Tamaño recomendado:** 2000px en el lado más largo
- **Peso:** Máximo 5-10 MB por imagen
- **Orientación:** Para obras, preferiblemente vertical (3:4)

### Slugs

- Usar solo minúsculas
- Usar guiones en lugar de espacios
- Ejemplo: `"Mi Obra Favorita"` → `"mi-obra-favorita"`

### Rich Text

En los campos Rich Text puedes:
- Formatear texto (negritas, itálicas)
- Crear listas
- Agregar enlaces
- Insertar imágenes (se subirán a Contentful)
- Agregar encabezados (H1, H2, H3)

### Orden de Obras

Usa el campo "Order" para controlar el orden en que aparecen las obras:
- 1 = Primera
- 2 = Segunda
- etc.

Si no especificas orden, se ordenarán por fecha de creación.

## 8. Troubleshooting

### No veo mis cambios en el sitio

1. Verifica que hayas dado "Publish" (no solo "Save")
2. Espera 1-2 minutos para que se regenere la página (ISR)
3. Limpia la caché del navegador

### Error al cargar imágenes

1. Verifica que el tamaño sea menor a 10 MB
2. Verifica que sea una imagen válida (JPG, PNG, WebP)
3. En Contentful, ve a Media > Assets y verifica que la imagen se haya subido correctamente

### Error de API Key

1. Verifica que las variables de entorno estén correctamente configuradas
2. Verifica que estés usando el **Content Delivery API** token (no el Management API)
3. Reinicia el servidor de desarrollo después de cambiar variables de entorno

## 9. Recursos Adicionales

- [Documentación oficial de Contentful](https://www.contentful.com/developers/docs/)
- [Contentful + Next.js Guide](https://www.contentful.com/developers/docs/javascript/tutorials/integrate-contentful-with-nextjs/)
- [Rich Text Renderer](https://www.contentful.com/developers/docs/javascript/tutorials/rendering-contentful-rich-text-with-javascript/)
