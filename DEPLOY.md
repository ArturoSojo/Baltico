# Guía de Despliegue en Netlify

## Configuración Completada ✅

Tu proyecto ya está configurado para ser desplegado en Netlify con exportación estática.

### Archivos Configurados:

1. **`next.config.ts`** - Configurado con:
   - `output: "export"` - Genera archivos HTML estáticos
   - `images: { unoptimized: true }` - Permite usar imágenes sin optimización server-side
   - `trailingSlash: true` - URLs compatibles con hosting estático

2. **`netlify.toml`** - Configuración de Netlify:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Redirects configurados para SPA

## Pasos para Desplegar en Netlify:

### Opción 1: Desde la Web (Recomendado)

1. Ve a [Netlify](https://app.netlify.com/)
2. Haz clic en "Add new site" → "Import an existing project"
3. Conecta tu repositorio de GitHub
4. Netlify detectará automáticamente la configuración desde `netlify.toml`
5. Haz clic en "Deploy"

### Opción 2: Usando Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Verificación Local

Para verificar que el build funciona correctamente:

```bash
# Generar build
npm run build

# Verificar que se creó la carpeta 'out' con:
ls out/
# Deberías ver: index.html, admin/, menu/, checkout/, reservar/, images/, etc.

# Servir localmente (opcional)
npx serve out
```

## Contenido Generado

Después de `npm run build`, la carpeta `out/` contiene:

- ✅ Archivos HTML para cada página
- ✅ JavaScript y CSS optimizados en `_next/static/`
- ✅ Imágenes copiadas desde `public/images/`
- ✅ Todos los assets estáticos

## Notas Importantes

- Las imágenes se sirven sin optimización (necesario para hosting estático)
- Todas las rutas generan archivos HTML estáticos
- No se pueden usar funcionalidades server-side (API routes, ISR, etc.)
