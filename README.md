# Frontend Angular

Este proyecto es un frontend desarrollado en Angular para interactuar con un backend Node.js y MongoDB para la gestión de tareas.

## Funcionalidad del Proyecto:

El objetivo principal de este proyecto es permitir a los usuarios gestionar sus tareas de manera eficiente. Las características principales incluyen:

- **Agregar Tareas:** Los usuarios pueden agregar nuevas tareas especificando un título obligatorio, una descripción opcional y una fecha de vencimiento.
  
- **Estado de las Tareas:** Las tareas recién agregadas comienzan con el estado "Pendiente". Una vez que se inician, su estado cambia a "En Progreso" y, finalmente, a "Completada" cuando se marca como terminada.

## Mejoras para Futuros Desarrollos:

Para futuras iteraciones del proyecto, se podrían considerar las siguientes mejoras:

- **Lista de Tareas Completadas:** Implementar una lista separada para mostrar todas las tareas completadas.
  
- **Priorización y Notificaciones:** Permitir a los usuarios establecer prioridades para las tareas y enviar notificaciones para recordatorios de vencimiento.

## Estructura de Directorios y Archivos:


frontend/
│
├── .angular/ # Archivos de configuración del Angular CLI
├── .vscode/ # Configuraciones de Visual Studio Code
├── node_modules/ # Dependencias del proyecto
├── public/ # Archivos públicos de la aplicación
├── src/
│ ├── app/
│ │ ├── add-task-modal/ # Componente modal para añadir tareas
│ │ ├── alert-dialog/ # Componente de diálogo de alerta
│ │ ├── confirm-dialog/ # Componente de diálogo de confirmación
│ │ ├── edit-task-dialog/ # Componente modal para editar tareas
│ │ ├── my-tasks/ # Componente para mostrar lista de tareas
│ │ ├── navbar/ # Componente de barra de navegación
│ │ ├── services/ # Servicios Angular para interacción con el backend
│ │ └── tasks/ # Componente para mostrar detalles de tareas
│ ├── index.html # Página HTML principal
│ ├── main.server/ # Configuraciones de servidor Angular Universal
│ ├── style.css # Estilos globales de la aplicación
│ └── ... # Otros archivos del Angular
├── .editorconfig # Configuración del editor
├── angular.json # Configuraciones del Angular CLI
├── package-lock.json # Bloqueo de versiones de dependencias npm
├── package.json # Manifiesto del proyecto Node.js
├── README.md # Documentación del proyecto (este archivo)
├── server.ts # Archivo de inicialización del servidor (Angular Universal)
├── tsconfig.app.json # Configuraciones TypeScript para compilación de la aplicación
├── tsconfig.json # Configuraciones TypeScript del proyecto


- **`src/`**: Directorio principal del código fuente del frontend Angular.
- **`app/`**: Contiene todos los componentes, servicios y módulos de la aplicación.
- **`components/`**: Componentes reutilizables de la aplicación.
- **`models/`**: Define los modelos de datos, como `task.model.ts` para las tareas.
- **`services/`**: Contiene los servicios Angular, como `task.service.ts` para realizar peticiones HTTP al backend.
- **`app.module.ts`**: Módulo raíz de la aplicación Angular.
- **`app-routing.module.ts`**: Configuración de enrutamiento de la aplicación Angular.
- **`environments/`**: Contiene archivos de configuración de entorno para desarrollo (`environment.ts`) y producción (`environment.prod.ts`).
- **`assets/`**: Directorio para archivos estáticos como imágenes, iconos, etc.
- **`index.html`**: Página HTML principal de la aplicación Angular.
- **`styles.css`**: Hojas de estilo globales para la aplicación Angular.
- **`main.ts`**: Punto de entrada de la aplicación Angular.

## Tecnologías Utilizadas:

- **Angular**: Framework de desarrollo frontend.
- **TypeScript**: Lenguaje de programación para Angular.
- **HTML**: Para estructurar las vistas de la aplicación.
- **CSS**: Para estilizar los componentes y páginas.

## Instrucciones para Clonar y Ejecutar el Frontend:

1. **Clonar el Repositorio:**
   ```bash
   git clone <url-de-su-repositorio>

2. **Instalar Dependencias:**
    cd frontend
    npm install

3. **Configurar Variables de Entorno:**
- En el archivo src/environments/environment.ts, asegúrese de configurar la URL del backend:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/tasks'
};

4. **Ejecutar la Aplicación:**
    ng serve

Esto compilará la aplicación y la ejecutará en un servidor de desarrollo. Navegue a http://localhost:4200/ para ver la aplicación en funcionamiento.

