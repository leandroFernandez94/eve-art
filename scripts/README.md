# Script de Configuración Automática de Contentful

Este script crea automáticamente todos los content models necesarios en Contentful.

## Requisitos

1. Cuenta en Contentful (gratuita)
2. Space creado en Contentful
3. Management API Token

## Pasos para usar el script

### 1. Obtener las credenciales de Contentful

#### Space ID
1. Ve a [app.contentful.com](https://app.contentful.com)
2. Selecciona tu space
3. Ve a **Settings > General Settings**
4. Copia el **Space ID**

#### Content Delivery API Token
1. Ve a **Settings > API keys**
2. Selecciona "Add API key" o usa uno existente
3. Copia el **Content Delivery API - access token**

#### Management API Token
1. Ve a **Settings > API keys**
2. Haz clic en la pestaña **Content management tokens**
3. Clic en **Generate personal token**
4. Dale un nombre (ej: "Setup Script")
5. Copia el token (¡solo se muestra una vez!)

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus valores:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id_aqui
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_delivery_token_aqui
CONTENTFUL_MANAGEMENT_TOKEN=tu_management_token_aqui
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el script

```bash
npm run setup:contentful
```

## ¿Qué hace el script?

El script crea automáticamente estos 5 content models:

1. **Artwork** - Para las obras de arte
   - Title, Slug, Images, Description, Technique, Dimensions, Year, Price, etc.

2. **Collection** - Para organizar obras en colecciones
   - Name, Slug, Description, Cover Image, Artworks

3. **Blog Post** - Para publicaciones del blog
   - Title, Slug, Content, Featured Image, Publish Date, Excerpt

4. **About Page** - Información sobre la artista
   - Biography, Profile Photo, Creative Process, Exhibitions

5. **Site Settings** - Configuración general del sitio
   - Site Name, Logo, Social Media, Contact Email, Welcome Text

## Después de ejecutar el script

1. Ve a [app.contentful.com](https://app.contentful.com)
2. Selecciona tu space
3. Verás los nuevos content types en **Content model**
4. Ve a **Content** para empezar a crear entradas

## Contenido de ejemplo recomendado

### Crear primero:
1. **About Page** (solo 1 entrada)
   - Agrega tu biografía y foto

2. **Site Settings** (solo 1 entrada)
   - Configura nombre del sitio y email

### Luego crear:
3. **Collection** (1 o más)
   - Ej: "Paisajes", "Retratos", "Abstracto"

4. **Artwork** (varias)
   - Tus obras, asignadas a colecciones

5. **Blog Post** (opcional)
   - Tus publicaciones

## Solución de problemas

### Error: "Faltan variables de entorno"
- Verifica que `.env.local` exista
- Verifica que los nombres sean exactos
- Reinicia el proceso

### Error: "Invalid access token"
- El Management Token debe ser un **Personal Access Token**
- No uses el Content Delivery API token para este script
- Genera un nuevo token si es necesario

### Error: "Space not found"
- Verifica el Space ID
- Asegúrate de tener acceso al space

### "Ya existe - saltando"
- El content type ya fue creado
- Esto es normal si ejecutas el script múltiples veces
- El script no sobrescribirá los existentes

## Notas de seguridad

⚠️ **IMPORTANTE:**
- El Management Token tiene permisos completos
- No lo compartas ni lo subas a Git
- `.env.local` está en `.gitignore` por seguridad
- Puedes eliminar el token después del setup si quieres

## ¿Necesitas ayuda?

Revisa la documentación completa en [CONTENTFUL_SETUP.md](../CONTENTFUL_SETUP.md)
