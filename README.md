# Yuhi

Yuhi es una aplicación web de comparación y descubrimiento de productos enfocada en merchandising, alimentación, ropa y literatura. La experiencia está pensada para explorar catálogo, comparar precios, guardar favoritos y revisar el carrito desde una interfaz moderna construida con React y Vite.

## Funcionalidades

- Catálogo curado por categorías.
- Comparación de precios entre proveedores desde SerpApi.
- Listas de deseos y carrito con estado compartido.
- Vista de ofertas, catálogo API y comparador de productos.
- Navegación responsive con React Router.
- Persistencia local de productos consultados durante la sesión.

## Stack técnico

- React 19
- Vite 6
- React Router DOM 7
- Tailwind CSS 4
- ESLint 9
- Vercel Serverless Functions para el proxy de SerpApi

## Requisitos

- Node.js 20.x
- npm
- Una clave válida de SerpApi para habilitar la búsqueda en producción

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

La aplicación se ejecuta en modo desarrollo con Vite.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: previsualiza la build localmente.
- `npm run lint`: ejecuta ESLint sobre el proyecto.

## Variables de entorno

La aplicación usa una función serverless en `api/serpapi.js` para proteger la clave de SerpApi.

Configura esta variable en tu entorno de despliegue:

```bash
SERPAPI_KEY=tu_clave_de_serpapi
```

## Despliegue

El proyecto está preparado para desplegarse en Vercel.

1. Conecta el repositorio a Vercel.
2. Añade `SERPAPI_KEY` en la configuración de variables de entorno.
3. Usa el comando de build `npm run build`.
4. Despliega la app.

## Estructura del proyecto

- `src/components`: componentes reutilizables de interfaz.
- `src/context`: contextos globales de carrito y wishlist.
- `src/data`: catálogo y metadatos de tiendas.
- `src/pages`: páginas principales de la aplicación.
- `src/services`: capa de acceso a APIs y caché local.
- `api/serpapi.js`: proxy serverless para consultar SerpApi sin exponer la clave.

## Notas de uso

- El catálogo inicial incluye productos de ejemplo para merchandising, alimentación, ropa y literatura.
- Las búsquedas en vivo dependen de la API configurada; si no hay resultados, la app puede seguir mostrando contenido cacheado.
- Algunos enlaces del catálogo pueden requerir completar URLs reales de afiliación antes de una publicación final.

## Licencia

Proyecto privado. Ajusta esta sección si decides publicarlo con una licencia específica.
