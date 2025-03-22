# Sistema-web-Bisuteria-Rosmar
Proyecto para la materia de "Proyecto Integrador" de 6to semestre en ISW
Se elabora un sitio web para un catalogo en linea de venta de bisutería 

## Equipo:
  - José Karim Franco Valencia - Backend
  - José Angel Huerta Amparán - Frontend - Alias "Wacho"
  - Víctor Humberto Encinas Guzmán - Frontend 
  - Pablo Cesar Flores Bautista - Frontend

### Estructura del backend de proyecto
```
proyecto/
├── src/                      # Código fuente
│   ├── config/               # Configuraciones de la aplicación
│   │   ├── database.ts       # Configuración de base de datos
│   │   ├── middleware.ts     # Configuraciones de middlewares
│   │   └── index.ts          # Exporta todas las configuraciones
│   ├── controllers/          # Controladores que manejan las peticiones
│   │   ├── user.controller.ts
│   │   └── ...
│   ├── middleware/           # Middlewares personalizados
│   │   ├── auth.middleware.ts
│   │   └── ...
│   ├── entities/               # Modelos de datos o interfaces
│   │   ├── user.model.ts
│   │   └── ...
│   ├── routes/               # Definición de rutas de la API
│   │   ├── user.routes.ts
│   │   ├── index.ts          # Archivo principal de rutas
│   │   └── ...
│   ├── services/             # Lógica de negocio
│   │   ├── user.service.ts
│   │   └── ...
│   ├── utils/                # Utilidades y helpers
│   │   ├── logger.ts
│   │   └── ...
│   └── server.ts             # Punto de entrada de la aplicación
├── .env                      # Variables de entorno
├── .gitignore                # Archivo generado arriba
├── tsconfig.json             # Configuración de TypeScript
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación
```