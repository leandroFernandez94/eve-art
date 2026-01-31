# 🚀 Inicio Rápido - Setup en 5 minutos

## Paso 1: Instalar dependencias (1 min)

```bash
cd watercolor-portfolio
npm install
```

## Paso 2: Crear cuenta en Contentful (2 min)

1. Ve a https://www.contentful.com/sign-up/
2. Crea una cuenta gratuita
3. Crea un nuevo Space (cualquier nombre)
4. Anota el **Space ID** que aparece en Settings > General Settings

## Paso 3: Obtener las API Keys (1 min)

### Content Delivery API Token
1. Settings > API keys
2. Copia el **Content Delivery API - access token**

### Management API Token (para el script)
1. Settings > API keys > Content management tokens
2. "Generate personal token"
3. Dale un nombre (ej: "Setup")
4. Copia el token (¡solo se muestra una vez!)

## Paso 4: Configurar variables de entorno (30 seg)

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=tu_space_id_aqui
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=tu_delivery_token_aqui
CONTENTFUL_MANAGEMENT_TOKEN=tu_management_token_aqui
```

## Paso 5: Ejecutar script de setup (30 seg)

```bash
npm run setup:contentful
```

Verás algo como:

```
🚀 Iniciando configuración de Contentful...

✅ Conectado al space: Mi Portfolio

📝 Creando content type: Artwork...
   ✅ Creado y publicado
📝 Creando content type: Collection...
   ✅ Creado y publicado
📝 Creando content type: Blog Post...
   ✅ Creado y publicado
📝 Creando content type: About Page...
   ✅ Creado y publicado
📝 Creando content type: Site Settings...
   ✅ Creado y publicado

🎉 ¡Configuración completada!
```

## Paso 6: Agregar contenido en Contentful (5-10 min)

1. Ve a https://app.contentful.com
2. Ve a **Content**
3. Crea las entradas necesarias:

### Mínimo recomendado:
- [ ] **1 About Page** - Tu biografía y foto
- [ ] **1 Site Settings** - Nombre del sitio y email
- [ ] **1 Collection** - Ej: "Mis Obras"
- [ ] **2-3 Artworks** - Tus primeras obras

### Opcional:
- [ ] **Blog Posts** - Tus publicaciones

## Paso 7: Ejecutar el proyecto (10 seg)

```bash
npm run dev
```

Abre http://localhost:3000

## 🎉 ¡Listo!

Tu portfolio está funcionando. Ahora puedes:
- Agregar más obras en Contentful
- Personalizar colores en `tailwind.config.ts`
- Modificar textos en los componentes
- Hacer deploy en Vercel

---

## Siguiente: Deploy a producción

Cuando estés listo:

```bash
# Opción 1: Deploy con Vercel (recomendado)
npm install -g vercel
vercel

# Opción 2: Build local
npm run build
npm run start
```

Ver guía completa de deploy en [README.md](./README.md#deploy-en-vercel)

---

## ¿Problemas?

- **No funciona el script:** Verifica que el Management Token sea correcto
- **No veo contenido:** Asegúrate de dar "Publish" a las entradas en Contentful
- **Errores de conexión:** Verifica que el Space ID y Access Token sean correctos

Documentación completa:
- [README.md](./README.md) - Guía general
- [CONTENTFUL_SETUP.md](./CONTENTFUL_SETUP.md) - Detalles de Contentful
- [scripts/README.md](./scripts/README.md) - Uso del script
