# NexoInventory 📦
¡Bienvenido a NexoInventory! Una aplicación web moderna y ágil diseñada para simplificar la gestión de inventario. Creada con React y Vite, y potenciada por Supabase, esta herramienta ofrece una experiencia de usuario fluida y en tiempo real para el control de stock.

El proyecto se encuentra actualmente en desarrollo.

[Ver Demo en Vivo](https://nexoinventory.netlify.app/)


## ✨ Características Principales
NexoInventory está diseñado para ser intuitivo y potente. Algunas de las funcionalidades actuales y planeadas incluyen:

- Autenticación de Usuarios: Sistema de inicio de sesión seguro gestionado por Supabase Auth.

- Rutas Protegidas: El dashboard y las secciones de gestión solo son accesibles para usuarios autenticados.

- Dashboard Interactivo: Visualiza el estado de tu inventario de un vistazo con gráficos y estadísticas claras (utilizando Chart.js).

- Gestión de Productos (CRUD): Añade, visualiza, edita y elimina productos de tu inventario.

- Gestión de Movimientos: Un registro detallado de todas las entradas y salidas de stock, con el usuario y el producto asociado.

- Filtros y Paginación del Lado del Servidor: La carga de datos está paginada (de 10 en 10) y los filtros/búsquedas consultan directamente la base de datos para un rendimiento óptimo.

## 🛠️ Tecnologías Utilizadas
Este proyecto fue construido utilizando un stack de tecnologías modernas que garantizan velocidad y una excelente experiencia de desarrollo:

- Frontend: React (con Hooks y Context API) y Vite.

- Backend y Base de Datos: Supabase (PostgreSQL, Autenticación y APIs en tiempo real).

- Navegación: React Router.

- Estilos: Tailwind CSS.

- Formularios: Formik y Yup para validaciones robustas.

- Gráficos: Chart.js (integrado con react-chartjs-2).
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart%20js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![PostgrelSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 🚀 Cómo Empezar (Uso Local)
Si deseas ejecutar una copia de este proyecto en tu máquina local, sigue estos sencillos pasos:

Clona el repositorio
```shell 
git clone https://github.com/Maxi2771/NexoInventory.git 
```

Navega al directorio del proyecto

```shell 
cd NexoInventory 
```

Instala las dependencias
El proyecto utiliza pnpm como gestor de paquetes.

```shell 
pnpm install 
```

Configurar Variables de Entorno
```shell 
touch .env.local
```

Y añade tus claves de Supabase (las puedes encontrar en Settings > API en tu proyecto de Supabase):
```shell 
VITE_SUPABASE_URL="url"
VITE_SUPABASE_ANON_KEY="key" 
```

Ejecuta el servidor de desarrollo

```shell 
pnpm run nexo 
```

¡Y listo! La aplicación estará corriendo en http://localhost:5173 (o el puerto que Vite indique).

🌐 Despliegue
Este proyecto está configurado para despliegue continuo en Netlify.

Rama: Main

Comando de Build: pnpm run build

Directorio de Publicación: docs