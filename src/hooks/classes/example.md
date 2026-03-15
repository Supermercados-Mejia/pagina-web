## Documentación del uso de `useManagmentRead` para consultas de datos

El siguiente fragmento de código muestra cómo utilizar el hook personalizado `useManagmentRead` para ejecutar una consulta de lectura con filtros, paginación y ordenamiento, gestionando automáticamente la cancelación de peticiones previas.

```tsx
const manager = useManagmentRead();

const payload: RequestPayload = {
  table: config.table,
  filtros: {
    selects: config.selects,
    ...(filtrosAnd.length > 0 && { FiltrosAnd: filtrosAnd }),
    ...(filtrosOr.length > 0 && { FiltrosOr: filtrosOr }),
    ...(orderRules.length > 0 && { Order: orderRules }),
  },
  page: currentPage,
  pageSize: pageSize,
};
const { promise } = manager.execute(payload);
const response = await promise;
if (response.error) {
  if (response.error.name === "AbortError") return;
  setTableError(response.error.message || "Error al cargar datos");
} else {
  setDataTable(response.data?.data || []);
  setTotalRecords(
    response.data?.totalRecords || response.data?.totalEstimated || 0,
  );
  setCurrentPage(response.data?.page || 1);
}
```

### Propósito

Este código se encarga de obtener datos desde una API (endpoint `getData`) utilizando el gestor `ManagmentRead`. El gestor encapsula la lógica de cancelación de peticiones en curso, evitando condiciones de carrera y mejorando el rendimiento en componentes que se montan/desmontan frecuentemente o que cambian sus parámetros de consulta.

### Descripción de los elementos

#### Hook `useManagmentRead`

- **Origen**: Definido en `api.ts` (archivo proporcionado).
- **Retorna**: Una instancia de la clase `ManagmentRead` asociada al mutation `useGetMasivoWithFiltersMutation`.
- **Comportamiento**:
  - La instancia se crea una sola vez por componente (gracias a `useRef`).
  - Al desmontarse el componente, se ejecuta automáticamente `cancelAll()` para abortar todas las peticiones pendientes.

#### Clase `ManagmentRead`

- **Método `execute(payload)`**:
  - **Parámetro**: `payload` de tipo `Omit<RequestPayload, "signal">`. El objeto `signal` se añade internamente.
  - **Retorna**: Un objeto con dos propiedades:
    - `promise`: `Promise<ApiResponse<T>>` – la promesa que resuelve con la respuesta de la API.
    - `cancel`: `() => void` – función que permite abortar manualmente esta petición específica.
  - **Mecanismo interno**: Cada llamada a `execute` genera un `AbortController` único, asociado a un `requestId`. Si se ejecuta una nueva petición antes de que finalice la anterior, se puede cancelar la anterior usando el método `cancel` correspondiente. Además, el gestor mantiene un mapa de controladores activos y los aborta automáticamente al desmontar el componente.

#### Objeto `RequestPayload`

Estructura utilizada para definir la consulta:

| Propiedad  | Tipo                | Descripción                                                                |
| ---------- | ------------------- | -------------------------------------------------------------------------- |
| `table`    | `string`            | Nombre de la tabla o entidad a consultar.                                  |
| `filtros`  | `object`            | Objeto que contiene los criterios de selección, filtros y ordenamiento.    |
| `page`     | `number` (opcional) | Número de página solicitado.                                               |
| `pageSize` | `number` (opcional) | Cantidad de registros por página.                                          |
| `signal`   | `AbortSignal`       | Se añade internamente; no debe incluirse en el payload pasado a `execute`. |

**Estructura de `filtros`** (basada en `RequestPayload`):

- `selects`: `Array<{ Key: string; Alias?: string }>` – Campos a seleccionar.
- `agregaciones`: `Array<{ Key: string; Alias: string; Operation: string }>` – Agregaciones (sum, count, etc.).
- `FiltrosAnd`: `Array<{ Filtros: Array<{ Key: string; Operator: string; Value: any }>; OperadorLogico: "AND" \| "OR" }>` – Filtros combinados con AND.
- `FiltrosOr`: `Array<...>` – Filtros combinados con OR.
- `Order`: `Array<{ Key: string; Direction: string }>` – Criterios de ordenamiento.

En el ejemplo, se construyen dinámicamente `FiltrosAnd`, `FiltrosOr` y `Order` solo si los arrays correspondientes tienen elementos.

#### Manejo de la respuesta

- Se utiliza `await promise` para obtener el objeto `response` de tipo `ApiResponse<T>`.
- La respuesta tiene la forma:
  ```ts
  interface ApiResponse<T = any> {
    data?: {
      data: T[];
      totalRecords?: number;
      totalEstimated?: number;
      page?: number;
      // otros metadatos
    };
    error?: {
      name: string;
      message: string;
    };
  }
  ```
- **Verificación de error**:
  - Si `response.error` existe, se evalúa su `name`.
  - Si el error es `"AbortError"`, se ignora (se retorna sin actualizar el estado de error). Esto evita mostrar errores falsos cuando la petición fue cancelada intencionalmente.
  - En caso contrario, se actualiza el estado de error con el mensaje correspondiente.
- **Actualización exitosa**:
  - `setDataTable` recibe los registros (`response.data?.data` o array vacío).
  - `setTotalRecords` establece el total de registros (usando `totalRecords` o `totalEstimated` según lo que devuelva la API).
  - `setCurrentPage` actualiza la página actual (útil si la API puede devolver una página diferente a la solicitada).

### Consideraciones importantes

1. **Cancelación automática**: Al usar `useManagmentRead`, todas las peticiones iniciadas con `execute` se cancelan cuando el componente se desmonta. Esto evita fugas de memoria y actualizaciones de estado en componentes desmontados.
2. **Múltiples peticiones**: Si se llama a `execute` varias veces seguidas (por ejemplo, al cambiar filtros), cada una genera un nuevo `AbortController`. Es responsabilidad del llamante cancelar la petición anterior si lo desea (usando la función `cancel` devuelta). El gestor no lo hace automáticamente, pero proporciona las herramientas para hacerlo.
3. **Manejo de errores**: Siempre verificar `response.error` antes de acceder a `response.data`. El caso especial de `AbortError` debe manejarse para no mostrar mensajes de error al usuario.
4. **Tipado**: Se puede especificar el tipo de datos esperado usando genéricos: `manager.execute<MiTipo>(payload)`.

### Ejemplo de uso completo en un componente

```tsx
import { useState, useEffect } from "react";
import { useManagmentRead, RequestPayload } from "./api";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

const MiComponente = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pagina, setPagina] = useState(1);
  const manager = useManagmentRead();

  useEffect(() => {
    const cargaProductos = async () => {
      const payload: RequestPayload = {
        table: "productos",
        filtros: {
          selects: [{ Key: "id" }, { Key: "nombre" }, { Key: "precio" }],
          FiltrosAnd: [
            {
              Filtros: [{ Key: "activo", Operator: "=", Value: true }],
              OperadorLogico: "AND",
            },
          ],
          Order: [{ Key: "nombre", Direction: "ASC" }],
        },
        page: pagina,
        pageSize: 10,
      };

      const { promise, cancel } = manager.execute<Producto>(payload);
      const resp = await promise;

      if (resp.error) {
        if (resp.error.name !== "AbortError") {
          setError(resp.error.message);
        }
        return;
      }

      setProductos(resp.data?.data ?? []);
      setTotal(resp.data?.totalRecords ?? 0);
    };

    cargaProductos();

    // Opcional: cancelar la petición si cambian los filtros antes de que termine
    // return () => cancel();
  }, [pagina, manager]);

  // ... renderizado
};
```

### Resumen

El fragmento proporcionado ilustra el patrón recomendado para consumir datos con `ManagmentRead`: construir el payload según la configuración, ejecutar la consulta, manejar el posible error de cancelación y actualizar el estado del componente con los datos recibidos. Este enfoque garantiza peticiones controladas y una experiencia de usuario fluida.
