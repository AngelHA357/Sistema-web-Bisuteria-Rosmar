# Pasos para la configuracion del back
 1. 'npm install -g typescript ts-node' para instalar typescript y el ejecutador de typescript, en caso de no tenerlo.
 2. 'cd .\Backend\' para posicionarse en la carpeta del backend.
 3. 'npm install' para instalar todas las dependencias del proyecto.
 4. Crear el archivo .env con las variables de entorno (Se explica abajo cuales son).
 5. "npm run mapeo": para mapear la base de datos.
 6. "npm run dev": Para ejecutar el servidor.
 7. Disfrutar y ser feliz.

## Configuración del documento .env
```
DB_PORT= Puerto de la base de datos
DB_NAME= Nombre de la base de datos
DB_PASSWORD= Contraseña de la base de datos
DB_HOST= Host de la base de datos
DB_USER= Usuario de la base de datos de PostgreSQL


API_PREFIX= Prefijo de la api deseable
SERVER_PORT= Puerto en el que correrá el servidor

KEY_HASH= Llave que permite configurar el hasheo de las contraseñas
CLAVE_SUPER_SECRETOSA= Clave para la creación de los jwt
```

### Estructura del backend de proyecto
```
proyecto/
├── src/                      # Código fuente
│   ├── config/               # Configuraciones de la aplicación
│   │   ├── database.ts       # Configuración de base de datos
│   │   ├── ImageFolder.ts    # Configuraciones de las carpetas que se agregan automaticamente
│   │   └── mapeo.ts          # Configuración del mapeo, resetea todo e inserta varios valores
│   │   └── ...
│   ├── controllers/          # Controladores que manejan las peticiones
│   │   ├── ClienteController.ts
│   │   └── ...
│   ├── domain/           # Schemas de zod, dto y mappers
│   │   ├──── productos/
│   │   |      ├──── productos.dto.ts/     # Objetos de transferencia de datos para ocultar información
│   │   |      ├──── productos.schema.ts/  # Configuración de los valores que se esperan en los endpoints
│   │   |      ├──── productos.mapper.ts/  # Ayuda a transformar los dtos a entidades y viceversa
│   │   └── ...
│   ├── entities/               # Modelos de datos o interfaces
│   │   ├── Cliente.ts
│   │   ├── Producto.ts
│   │   └── ...
│   ├── error/          # Errores personalizados
│   │   ├── ServiceError.ts
│   │   └── ...
│   ├── middleware/           # Middlewares personalizados
│   │   ├── auth.middleware.ts
│   │   └── ...
│   ├── routes/               # Definición de rutas de la API
│   │   ├── ClienteRoutes.ts
│   │   └── ...
│   ├── services/             # Lógica de negocio
│   │   ├── ClienteService.ts
│   │   └── ...
│   ├── utils/                # Utilidades y helpers
│   │   ├── encrypt.ts
│   │   └── ...
│   └── server.ts             # Punto de entrada de la aplicación
├── .env                      # Variables de entorno
├── .gitignore                # Archivo generado arriba
├── tsconfig.json             # Configuración de TypeScript
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación
```