# angular-core

Angular Enterprise Application

- Angular version 20
- RxJS version 7
- TypeScript version 5.8
- Arquitectura standalone components (sin NgModules)
- Detección de cambios sin zonas (zoneless change detection)

## Estructura de Carpetas

El proyecto sigue una **arquitectura basada en características (feature-based)** con el patrón **Container/Presentational**:

### src/app/

```
app/
├── componentes/          # Componentes técnicos y de utilidad
├── core/                 # Infraestructura global y servicios singleton
├── features/             # Componentes presentacionales reutilizables
├── layouts/              # Componentes de diseño (layout wrappers)
├── pages/                # Componentes smart (páginas con rutas)
└── shared/               # Recursos compartidos (componentes, pipes, directivas, utilidades)
```

### componentes/

Directorio para componentes técnicos generales y widgets específicos de la aplicación.

**Contenido actual:**
- `user-panel/` - Panel de usuario con información de sesión

**Propósito:** Componentes globales que no encajan completamente en shared pero son necesarios en varias partes de la aplicación.

### core/

**Módulo Core:** Concentra los servicios singleton y la infraestructura global del sistema. Este módulo se importa **solo en el módulo raíz** de la aplicación para mantener servicios únicos en toda la app.

**Estructura interna:**
- `anotations/` - Decoradores personalizados (@LogMethod, etc.)
- `config/` - Archivos de configuración global
- `enums/` - Enumeraciones globales de la aplicación
- `helpers/` - Funciones de utilidad auxiliares
- `interceptors/` - Interceptores HTTP
  - `auth.interceptor.ts` - Manejo automático de tokens JWT y refresh en errores 403
- `interfaces/` - Interfaces TypeScript globales
- `models/` - Modelos de datos
  - `backend/` - DTOs del backend
  - `frontend/` - Modelos del frontend
  - `role/` - Modelos relacionados con roles
- `services/` - Servicios singleton
  - `api-base.service.ts` - Servicio base para todas las operaciones HTTP
  - `auth-token-storage.service.ts` - Almacenamiento de tokens JWT
  - `error-parser.service.ts` - Manejo global de errores
  - `global-store/` - Wrapper type-safe para localStorage con RxJS
- `states/` - Definiciones de estado global
- `tokens/` - Tokens de inyección
  - `environment.token.ts` - Token para inyectar configuración de entorno
- `types/` - Tipos TypeScript globales

**Servicios clave:**
- **AuthTokenStorageService:** Gestión segura de tokens JWT
- **ApiBaseService:** Clase base para servicios HTTP con configuración común
- **ErrorParserService:** Parsing y manejo centralizado de errores
- **GlobalStoreService:** Almacenamiento persistente con soporte de RxJS Observables
- **authInterceptor:** Añade automáticamente el token Bearer a las peticiones y refresca tokens expirados

**⚠️ IMPORTANTE:** Los servicios de core son **singleton** y no deben importarse en módulos lazy-loaded.

### features/

Contiene **componentes presentacionales (dumb components)** que implementan lógica de visualización para funcionalidades específicas. Estos componentes:
- Reciben datos mediante `@Input`
- Emiten eventos mediante `@Output`
- **No cargan datos directamente** ni tienen dependencias de NgRx
- Son **reutilizables** en múltiples páginas

**Estructura interna de cada feature:**

Cada feature sigue una organización modular completa:
```
features/
└── video/                # Ejemplo de feature
    ├── components/       # Componentes UI de la feature
    ├── enums/           # Enumeraciones específicas
    ├── interfaces/      # Interfaces de la feature
    ├── services/        # Servicios específicos (si es necesario)
    └── states/          # Estados locales (si usa gestión de estado)
```

**Filosofía:** Sigue la arquitectura moderna **feature-based** de Angular, creando módulos independientes y enfocados en una sola responsabilidad para cada funcionalidad importante del proyecto.

### layouts/

Contiene componentes de diseño (layout wrappers) que definen la estructura común de las páginas. Esto evita duplicar header/footer/menú en cada página.

**Estructura interna:**
```
layouts/
└── components/
    ├── body/          # Área de contenido principal
    ├── footer/        # Pie de página
    ├── header/        # Cabecera y navegación principal
    └── sidenav/       # Menú de navegación lateral
```

**Layouts disponibles en shared:**
- `app-layout/` - Layout principal de la aplicación (con header, sidenav, footer)
- `basic-layout/` - Layout básico minimalista (para login, 404, etc.)

**Propósito:** Mejorar la reutilización mediante plantillas comunes en lugar de duplicar estructura en cada página.

### pages/

**Componentes Smart (inteligentes):** Páginas de la aplicación que actúan como contenedores (containers). Cada página:
- Está asociada a una **ruta** específica
- Maneja la **lógica de negocio** y carga de datos
- Se conecta al **store de NgRx**
- Utiliza servicios para obtener datos
- Pasa datos a componentes presentacionales de features/shared

**Implementa el patrón Container/Presentational:**
- **Container (Smart):** La página obtiene datos (servicios/NgRx) y maneja acciones
- **Presentational (Dumb):** Componentes de features/shared muestran datos y emiten eventos

**Estructura interna de cada página:**

Cada página puede contener su propia estructura modular:
```
pages/
├── auth/                     # Ejemplo: Página de autenticación
│   ├── components/          # Componentes específicos de auth (formularios de login, etc.)
│   ├── services/            # Servicios de la página
│   │   ├── auth.guard.ts   # Guards de ruta (loggedGuard, redirectLoggedInGuard, isAuthCanMatch)
│   │   └── auth.service.ts # Lógica de autenticación
│   ├── store/               # NgRx feature store
│   │   ├── actionTypes.ts
│   │   ├── user.actions.ts
│   │   ├── user.effects.ts
│   │   ├── user.models.ts
│   │   ├── user.reducer.ts
│   │   └── user.selectors.ts
│   ├── types/               # Tipos específicos de la página
│   └── validators/          # Validadores de formularios
├── basic-example/           # Página de ejemplos
│   ├── components/
│   ├── config/
│   └── store/
├── home/                    # Página principal/dashboard
└── notfound-page/          # Página 404
```

**Características:**
- Cada página tiene su propio **NgRx feature store** registrado en `app.config.ts`
- Soporta **lazy loading** mediante `loadComponent()` en las rutas
- Las páginas pueden incluir: components, services, validators, types, config, store

### shared/

**Módulo Shared:** Recursos reutilizables utilizados en distintas partes de la aplicación. Contiene componentes de presentación (UI) sin lógica de negocio específica.

**⚠️ REGLA IMPORTANTE:** Shared **NO debe contener servicios** para evitar instancias duplicadas en módulos lazy-loaded.

**Estructura completa:**
```
shared/
├── components/                      # Componentes UI reutilizables
│   ├── avatar/                     # Componente de avatar
│   ├── breadcrumbs/                # Navegación breadcrumb
│   ├── button/                     # Botones personalizados
│   ├── calendar/                   # Selector de fechas
│   ├── charts/                     # Componentes de gráficos
│   ├── controls/                   # Controles de formularios personalizados
│   ├── dialog/                     # Modales y diálogos
│   ├── float-label/                # Inputs con etiquetas flotantes
│   ├── message/                    # Componente de mensajes/alertas
│   ├── progress-speener/           # Spinner de carga
│   ├── stepper/                    # Componente de pasos múltiples
│   ├── table/                      # Tablas (usando tabulator-tables)
│   ├── toast/                      # Notificaciones toast
│   ├── tool-tipe/                  # Tooltips
│   └── upload-file/                # Carga de archivos
├── directives/                      # Directivas personalizadas
│   ├── number-only.directive.ts             # Input solo números
│   ├── number-only-decimal.directive.ts     # Input números decimales
│   ├── number-only-copy-past.directive.ts   # Manejo de copiar-pegar números
│   └── number-decimal-copy-past.directive.ts
├── interfaces/                      # Interfaces compartidas
│   ├── automapper/                 # Interfaces para AutoMapper
│   ├── backand/                    # Interfaces del backend
│   └── frontend/                   # Interfaces del frontend
├── layouts/                         # Plantillas de layout
│   ├── app-layout/                 # Layout principal de la aplicación
│   └── basic-layout/               # Layout básico
├── models/                          # Modelos de datos compartidos
│   └── automapper/                 # Modelos para AutoMapper
├── pipes/                           # Pipes personalizados
│   ├── date-time-formater.pipe.ts  # Formateo de fechas/horas
│   ├── number-pipe.pipe.ts         # Formateo de números
│   ├── number-to-decimal.pipe.ts   # Conversión a decimales
│   └── truncate.pipe.ts            # Truncamiento de texto
├── services/                        # ⚠️ Evitar servicios aquí (mejor en core)
├── tokens/                          # Tokens de inyección compartidos
├── types/                           # Tipos TypeScript compartidos
│   ├── backend/                    # Tipos del backend
│   └── frontend/                   # Tipos del frontend
└── utils/                           # Utilidades y funciones auxiliares
    ├── automapper/                 # Servicio AutoMapper
    │   └── automapper.ts          # Utilidad para mapeo DTO ↔ Frontend
    ├── forms/                      # Utilidades de formularios
    │   └── validators/            # Validadores personalizados
    ├── form.ts                     # Funciones auxiliares de formularios
    ├── regex.ts                    # Patrones regex comunes
    └── sortign-strategy.ts         # Estrategias de ordenamiento
```

**Utilidades destacadas:**

**AutoMapper Service** (`shared/utils/automapper/automapper.ts`):
- Utilidad de mapeo personalizada para transformaciones Backend ↔ Frontend
- Métodos: `createMap()`, `map()`, `mapReverse()`
- Soporta: mapeo de arrays, propiedades anidadas, transformaciones personalizadas, funciones lambda

**Directivas de validación:**
- Validación de inputs numéricos con manejo especial de copiar-pegar
- Soporte para números enteros y decimales

**Pipes de formateo:**
- Formateo de fechas y horas
- Formateo de números (decimales, truncamiento)

### Gestión de Estado (NgRx)

El proyecto utiliza **NgRx** siguiendo el modelo Redux para gestión de estado:

**Organización del Store:**
- Cada página/feature tiene su propio **NgRx feature store** en `pages/<feature>/store/`
- **No hay carpeta store/ global** - el estado está distribuido por features
- Estructura de cada store:
  - `actionTypes.ts` - Tipos de acciones
  - `*.actions.ts` - Definición de acciones
  - `*.effects.ts` - Efectos secundarios (llamadas API, etc.)
  - `*.reducer.ts` - Reducers (estado y transformaciones)
  - `*.selectors.ts` - Selectores para acceder al estado
  - `*.models.ts` - Modelos de estado

**Configuración:**
- Features registrados en `app.config.ts` usando `createFeature()`
- Estado del router sincronizado vía `@ngrx/router-store`
- Redux DevTools habilitado en desarrollo

**Ejemplo:**
- Store de login: `pages/auth/store/user.{actions,effects,reducer,selectors}.ts`
- Store de ejemplos: `pages/basic-example/store/basic-example.{actions,effects,reducer,selectors}.ts`

## Aliases de Rutas (Path Aliases)

El proyecto utiliza aliases de TypeScript para imports limpios (definidos en `tsconfig.json` y `jest.config.ts`):

```typescript
import { AuthService } from '@core/services';        // en lugar de '../../../core/services'
import { LoginComponent } from '@pages/auth';        // en lugar de '../../pages/auth'
import { AutoMapper } from '@shared/utils';          // en lugar de '../../../shared/utils'
```

**Aliases disponibles:**
- `@app/*` → `src/app/*`
- `@pages/*` → `src/app/pages/*`
- `@core/*` → `src/app/core/*`
- `@layouts/*` → `src/app/layouts/*`
- `@features/*` → `src/app/features/*`
- `@components/*` → `src/app/components/*`
- `@shared/*` → `src/app/shared/*`

**⚠️ IMPORTANTE:** Siempre usar estos aliases en lugar de rutas relativas.

## Tecnologías y Librerías

### Gestión de Estado

**NgRx** - https://ngrx.io/
- Arquitectura Redux para Angular
- Store distribuido por features en `pages/<feature>/store/`
- Router state sincronizado con `@ngrx/router-store`
- Redux DevTools para debugging

### Librerías de Componentes UI

**PrimeNG** - https://primeng.org/
- Biblioteca principal de componentes UI
- Tema Aura configurado en `app.config.ts`
- Iconos: `primeicons` package

**Taiga UI** - https://taiga-ui.dev/
- Componentes UI complementarios
- Iconos desde Lucide: https://lucide.dev/icons/

### Internacionalización (i18n)

**@ngx-translate/core** - https://github.com/ngx-translate/core
- Traducción dinámica de la aplicación
- Idioma por defecto: `'sp'` (Español)
- Archivos de traducción cargados vía `HttpLoader`
- `TranslateService` provisto en `CORE_PROVIDERS`

**Uso:**
```typescript
// En componentes
{{ 'COMMON.SAVE' | translate }}

// En servicios/componentes
this.translate.get('MESSAGES.SUCCESS').subscribe(text => ...)
```

### Autenticación

**@auth0/angular-jwt** - https://www.npmjs.com/package/@auth0/angular-jwt
- Manejo automático de tokens JWT
- Almacenamiento vía `AuthTokenStorageService`
- Interceptor `authInterceptor` añade Bearer token automáticamente
- Refresh automático de tokens en errores 403

**Flujo de autenticación:**
1. Login → Obtención de access y refresh tokens
2. Tokens almacenados en localStorage (via `AuthTokenStorageService`)
3. `authInterceptor` añade token a cada request HTTP
4. En error 403 → Refresh automático del access token usando refresh token
5. Guards protegen rutas:
   - `loggedGuard` - Protege rutas autenticadas
   - `redirectLoggedInGuard` - Redirige usuarios autenticados desde /login

### Testing

**Jest** - Framework de testing
- Configuración en `jest.config.ts`
- Soporte para path aliases
- Coverage reports habilitados

### Otras Librerías

**Tabulator Tables** - Componente de tablas avanzadas
- Ubicación: `shared/components/table/`

## Configuración del Entorno

### Variables de Entorno

- **Desarrollo:** `src/environments/environment.ts`
- **Producción:** `src/environments/environment.prod.ts`
- Inyección vía token `ENV` (ver `core/tokens/environment.token.ts`)

### Proxy de Desarrollo

Configurado en `proxy-conf.json` para llamadas API durante desarrollo.

### Configuración de Aplicación

**app.config.ts** - Configuración centralizada con grupos de providers:
- `CORE_PROVIDERS` - Servicios core
- `MODULE_PROVIDERS` - Módulos de terceros
- `ANGULAR_PROVIDERS` - Features de Angular
- `ROUTER_PROVIDERS` - Configuración de router
- `NGRX_PROVIDERS` - Configuración de store

## Routing

- Rutas definidas en `app.routes.ts`
- **Lazy loading** para todas las páginas vía `loadComponent()`
- Ruta por defecto: `/` → redirige a `/dashboard`
- Rutas protegidas con `canActivate: [loggedGuard]`
- Manejo de 404 con wildcard route (`**`) → `NotfoundPageComponent`

**Ejemplo de ruta protegida:**
```typescript
{
  path: 'dashboard',
  loadComponent: () => import('@pages/home/home.component'),
  canActivate: [loggedGuard]
}
```

## Instalación

### Requisitos

- **Node.js:** version 22.0.0 o superior
- **pnpm:** última versión (package manager del proyecto)

```bash
# Instalar pnpm globalmente (si no está instalado)
npm install -g pnpm

# Instalar dependencias
pnpm install
```

**⚠️ Nota:** Aunque `angular.json` menciona "yarn", el proyecto usa **pnpm** (ver `package.json`).

## Comandos

### Desarrollo

```bash
# Iniciar servidor de desarrollo (puerto 4200 por defecto)
pnpm start

# Alternativa
ng serve
```

### Build

```bash
# Build de producción (output: dist/nttdata)
ng build

# Build de desarrollo
ng build --configuration development
```

### Testing

```bash
# Ejecutar todos los tests
pnpm test

# Tests en modo watch
pnpm test:watch

# Tests con reporte de coverage
pnpm test:coverage

# Ejecutar un archivo de test específico
jest path/to/file.spec.ts
```

## Características Avanzadas

### Zoneless Change Detection

El proyecto utiliza detección de cambios sin zonas (`provideZonelessChangeDetection()`), mejorando el rendimiento al eliminar la dependencia de Zone.js.

### Standalone Components

Arquitectura completamente standalone sin NgModules (excepto imports legacy necesarios).

### Signals

El proyecto utiliza **Signals** de Angular junto con RxJS para reactividad moderna.

### Decoradores Personalizados

Disponibles en `core/anotations/`:
- `@LogMethod()` - Logging automático de métodos
- Otros decoradores personalizados según necesidad

### GlobalStoreService

Servicio wrapper type-safe para localStorage con RxJS:

```typescript
// Guardar datos
globalStore.set('user', userData);

// Leer datos como Observable
globalStore.select('user').subscribe(user => ...);

// Actualizar parcialmente
globalStore.patchState({ theme: 'dark' });

// Actualizar con función
globalStore.updateStore('cart', cart => [...cart, newItem]);
```

**Características:**
- Persistencia automática a localStorage
- Verificación de cuota de almacenamiento
- Filtrado de campos sensibles
- Estados observables con RxJS

## Mejores Prácticas

### Organización de Código

1. **Core:** Solo servicios singleton, importar solo en app root
2. **Shared:** Sin servicios (usar core para servicios)
3. **Pages:** Componentes smart con lógica de negocio y NgRx
4. **Features:** Componentes dumb/presentacionales sin NgRx
5. **Path Aliases:** Siempre usar `@core/*`, `@shared/*`, etc.

### State Management

- Un store NgRx por página/feature en `pages/<feature>/store/`
- Registrar features en `app.config.ts`
- Usar selectores para acceder al estado
- Effects para operaciones asíncronas

### Formularios

- Controles personalizados en `shared/components/controls/`
- Validadores en `shared/utils/forms/validators/`
- Directivas para inputs numéricos
- Usar ReactiveFormsModule para formularios complejos

### Seguridad

- Tokens JWT almacenados de forma segura
- Refresh automático de tokens
- Guards en rutas protegidas
- Validación de inputs con directivas personalizadas
