#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const contentfulManagement = require('contentful-management');

// Verificar variables de entorno
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Error: Faltan variables de entorno');
  console.error('');
  console.error('Necesitas agregar a tu .env.local:');
  console.error('- NEXT_PUBLIC_CONTENTFUL_SPACE_ID');
  console.error('- CONTENTFUL_MANAGEMENT_TOKEN');
  console.error('');
  console.error('Para obtener el Management Token:');
  console.error('1. Ve a https://app.contentful.com');
  console.error('2. Settings > API keys > Content management tokens');
  console.error('3. Generate personal token');
  process.exit(1);
}

const client = contentfulManagement.createClient({
  accessToken: MANAGEMENT_TOKEN,
});

// Content Models Definitions
const contentModels = {
  artwork: {
    name: 'Artwork',
    description: 'Una obra de arte en acuarela',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          { unique: true },
          { regexp: { pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } },
        ],
      },
      {
        id: 'mainImage',
        name: 'Main Image',
        type: 'Link',
        linkType: 'Asset',
        required: true,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'additionalImages',
        name: 'Additional Images',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Asset',
          validations: [
            {
              linkMimetypeGroup: ['image'],
            },
          ],
        },
        required: false,
        localized: false,
      },
      {
        id: 'description',
        name: 'Description',
        type: 'RichText',
        required: false,
        localized: false,
      },
      {
        id: 'technique',
        name: 'Technique',
        type: 'Symbol',
        required: false,
        localized: false,
      },
      {
        id: 'dimensions',
        name: 'Dimensions',
        type: 'Symbol',
        required: false,
        localized: false,
      },
      {
        id: 'year',
        name: 'Year',
        type: 'Integer',
        required: false,
        localized: false,
      },
      {
        id: 'price',
        name: 'Price',
        type: 'Integer',
        required: false,
        localized: false,
      },
      {
        id: 'availableForSale',
        name: 'Available for Sale',
        type: 'Boolean',
        required: true,
        localized: false,
      },
      {
        id: 'collection',
        name: 'Collection',
        type: 'Link',
        linkType: 'Entry',
        required: false,
        localized: false,
        validations: [
          {
            linkContentType: ['collection'],
          },
        ],
      },
      {
        id: 'featured',
        name: 'Featured',
        type: 'Boolean',
        required: true,
        localized: false,
      },
      {
        id: 'order',
        name: 'Order',
        type: 'Integer',
        required: false,
        localized: false,
      },
    ],
  },

  collection: {
    name: 'Collection',
    description: 'Una colección de obras',
    displayField: 'name',
    fields: [
      {
        id: 'name',
        name: 'Name',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          { unique: true },
          { regexp: { pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } },
        ],
      },
      {
        id: 'description',
        name: 'Description',
        type: 'RichText',
        required: false,
        localized: false,
      },
      {
        id: 'coverImage',
        name: 'Cover Image',
        type: 'Link',
        linkType: 'Asset',
        required: true,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'artworks',
        name: 'Artworks',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            {
              linkContentType: ['artwork'],
            },
          ],
        },
        required: false,
        localized: false,
      },
    ],
  },

  blogPost: {
    name: 'Blog Post',
    description: 'Una publicación de blog',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          { unique: true },
          { regexp: { pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$' } },
        ],
      },
      {
        id: 'content',
        name: 'Content',
        type: 'RichText',
        required: true,
        localized: false,
      },
      {
        id: 'featuredImage',
        name: 'Featured Image',
        type: 'Link',
        linkType: 'Asset',
        required: true,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'publishDate',
        name: 'Publish Date',
        type: 'Date',
        required: true,
        localized: false,
      },
      {
        id: 'excerpt',
        name: 'Excerpt',
        type: 'Text',
        required: true,
        localized: false,
        validations: [
          {
            size: { max: 300 },
          },
        ],
      },
    ],
  },

  aboutPage: {
    name: 'About Page',
    description: 'Página sobre la artista (solo crear una entrada)',
    displayField: 'biography',
    fields: [
      {
        id: 'biography',
        name: 'Biography',
        type: 'RichText',
        required: true,
        localized: false,
      },
      {
        id: 'profilePhoto',
        name: 'Profile Photo',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'creativeProcess',
        name: 'Creative Process',
        type: 'RichText',
        required: false,
        localized: false,
      },
      {
        id: 'exhibitions',
        name: 'Exhibitions',
        type: 'RichText',
        required: false,
        localized: false,
      },
    ],
  },

  siteSettings: {
    name: 'Site Settings',
    description: 'Configuración general del sitio (solo crear una entrada)',
    displayField: 'siteName',
    fields: [
      {
        id: 'siteName',
        name: 'Site Name',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'logo',
        name: 'Logo',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'socialMedia',
        name: 'Social Media',
        type: 'Text',
        required: false,
        localized: false,
      },
      {
        id: 'contactEmail',
        name: 'Contact Email',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            regexp: {
              pattern: '^\\w[\\w.-]*@([\\w-]+\\.)+[\\w-]+$',
              flags: null,
            },
          },
        ],
      },
      {
        id: 'welcomeText',
        name: 'Welcome Text',
        type: 'Text',
        required: false,
        localized: false,
      },
    ],
  },
};

async function setupContentful() {
  console.log('🚀 Iniciando configuración de Contentful...\n');

  try {
    const space = await client.getSpace(SPACE_ID);
    console.log(`✅ Conectado al space: ${space.name}\n`);

    const environment = await space.getEnvironment('master');

    // Crear cada content type
    for (const [contentTypeId, definition] of Object.entries(contentModels)) {
      console.log(`📝 Creando content type: ${definition.name}...`);

      try {
        // Verificar si ya existe
        try {
          await environment.getContentType(contentTypeId);
          console.log(`   ⚠️  Ya existe - saltando`);
          continue;
        } catch (error) {
          // No existe, continuar con la creación
        }

        // Crear el content type
        const contentType = await environment.createContentTypeWithId(contentTypeId, {
          name: definition.name,
          description: definition.description,
          displayField: definition.displayField,
          fields: definition.fields,
        });

        // Publicar el content type
        await contentType.publish();
        console.log(`   ✅ Creado y publicado`);
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
      }
    }

    console.log('\n🎉 ¡Configuración completada!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Ve a https://app.contentful.com');
    console.log('2. Selecciona tu space');
    console.log('3. Ve a Content y comienza a crear entradas');
    console.log('\nContent types creados:');
    console.log('- Artwork (obras de arte)');
    console.log('- Collection (colecciones)');
    console.log('- Blog Post (publicaciones)');
    console.log('- About Page (sobre la artista) - crear solo 1 entrada');
    console.log('- Site Settings (configuración) - crear solo 1 entrada');
  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

// Ejecutar
setupContentful();
