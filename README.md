# Explorador interactivo de información

Aplicación web que consulta la **Rick and Morty API** para buscar personajes, filtrarlos, ordenarlos y guardar favoritos. Es un proyecto académico hecho con HTML, CSS y JavaScript puros, con apoyo de herramientas de inteligencia artificial.

> Las secciones marcadas con **✏️ Por completar** necesitan información que solo el equipo conoce. No se rellenaron para no inventar experiencias.

## 1. Objetivo

Practicar el consumo de una API pública con `fetch`, la manipulación del DOM, el uso de `localStorage` y el diseño adaptable, trabajando en equipo con Git y GitHub.

## 2. Funcionalidades

- **Carga de personajes** desde la API al abrir la página.
- **Búsqueda por nombre** (se envía a la API como `?name=`).
- **Filtros** por estado (vivo, muerto, desconocido) y especie.
- **Orden** por nombre (A-Z, Z-A) o por identificador.
- **Favoritos**: agregar y quitar; se guardan en `localStorage` y se conservan al recargar.
- **Modo claro y oscuro** (funcionalidad extra): botón "Modo oscuro" en el encabezado; la elección se guarda en `localStorage`. Si no hay elección guardada, se usa la preferencia del sistema.
- **Mensajes** de carga, error y "sin resultados".
- **Diseño adaptable** para celular, tableta y computadora, con indicadores de color por estado del personaje.

## 3. Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura y accesibilidad (etiquetas, `aria-*`) |
| CSS3 puro | Diseño, temas con variables CSS, `grid` y `flexbox`, media queries |
| JavaScript (ES2020) | `fetch`, `async/await`, DOM, `localStorage` |
| Git y GitHub | Control de versiones, Issues, Pull Requests, GitHub Pages |

No se usan frameworks ni dependencias externas.

## 4. API

- **Rick and Morty API**: <https://rickandmortyapi.com/>
- **Documentación**: <https://rickandmortyapi.com/documentation>
- Endpoint usado: `https://rickandmortyapi.com/api/character` (con `?name=` para buscar).
- Datos usados de cada personaje: `id`, `name`, `image`, `species`, `status`, `origin.name`.
- Cuando no hay coincidencias la API responde **404**; el explorador lo muestra como "No se encontraron personajes".

## 5. Estructura de archivos

```
proyecto-web-ia/
├── index.html   # Estructura de la página
├── style.css    # Estilos, temas claro/oscuro y diseño adaptable
├── script.js    # Lógica: API, búsqueda, filtros, orden, favoritos y tema
├── README.md    # Esta documentación
└── .gitignore
```

## 6. Instrucciones de uso

1. Descarga o clona el repositorio:
   `git clone https://github.com/jilderdionisio-cloud/proyecto-web-ia.git`
2. Abre `index.html` en el navegador (doble clic) o usa la versión publicada en GitHub Pages.
3. Escribe un nombre (por ejemplo, "Rick") y pulsa **Buscar**.
4. Usa los menús **Estado**, **Especie** y **Ordenar por**. **Limpiar controles** vuelve al inicio.
5. Pulsa **☆ Agregar a favoritos** en una tarjeta; aparecerá en **Mis favoritos**.
6. Pulsa **Modo oscuro** para cambiar el tema; se recordará al volver.

Se necesita conexión a internet para consultar la API.

## 7. Publicación con GitHub Pages

Requiere permisos de administración (dueño del repositorio). Ver Issue #4.

1. En GitHub: **Settings → Pages**.
2. **Source**: *Deploy from a branch*.
3. **Branch**: `main` y carpeta **`/ (root)`** → **Save**.
4. Esperar 1 o 2 minutos y abrir: <https://jilderdionisio-cloud.github.io/proyecto-web-ia/>

La carpeta correcta es `/ (root)` porque `index.html`, `style.css` y `script.js` están en la raíz y se enlazan con rutas relativas (`href="style.css"`, `src="script.js"`).

## 8. Prompts importantes usados

**Prompt 1 – Diseño visual (Marjorie):**
> "Eres la desarrolladora responsable del diseño visual del proyecto… Desarrollar y mejorar style.css para obtener una interfaz moderna, clara y adaptable… Estilo visual inspirado en el universo de ciencia ficción de Rick and Morty… Utiliza CSS puro… No modifiques la lógica de script.js salvo que detectes un problema indispensable…"

**Prompt 2 – Funcionalidad extra, pruebas y entrega (Marjorie):**
> "Completar la funcionalidad extra, las pruebas, la documentación y la preparación de la entrega… Implementa un modo claro y oscuro que… mantenga la preferencia del usuario mediante localStorage… No afirmes haber probado comportamientos que no hayas ejecutado."

**Prompt 3 – ✏️ Por completar (`jilderdionisio-cloud`):** pegar aquí un prompt real usado para crear la estructura, la consulta a la API, la búsqueda o los favoritos.

## 9. Una respuesta de IA que necesitó correcciones

En la primera versión de `style.css`, la IA generó un encabezado fijo (*sticky*) que en un celular de 360 px ocupaba **tres filas (unos 155 px)**. Además, las tarjetas se mostraban en una sola columna con imágenes muy grandes. El problema se detectó al revisar capturas de pantalla a 360 px de ancho, antes de entregar.

Corrección aplicada: en pantallas pequeñas el encabezado deja de ser fijo y ocupa dos filas, y las tarjetas pasan a formato horizontal (imagen a la izquierda, datos a la derecha). Además, se redujo el texto del botón de favoritos, que se partía en dos líneas en tableta.

✏️ Si el equipo tuvo otras respuestas de IA que corregir, pueden agregarlas aquí.

## 10. Un error real y cómo se resolvió

**Error:** el botón "Cambiar tema" existía en el HTML, pero no hacía nada (Issue #2). Al revisar `script.js` se vio que no había ningún `addEventListener` para `#boton-tema`.

**Solución:** se añadió la lógica del tema en `script.js` (ver sección 11) y el botón pasó a llamarse "Modo oscuro" con `aria-pressed`.

**Error de proceso:** al intentar subir la rama de estilos con la herramienta de IA, GitHub respondió **HTTP 403**, porque la app de Claude para GitHub no estaba instalada en el repositorio. Se resolvió cuando el dueño del repositorio la instaló; después el `push` funcionó.

## 11. Modificación de código explicada

Este es el fragmento que activa el modo oscuro en `script.js`:

```js
function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;          // <html data-tema="oscuro">
  elementos.botonTema.setAttribute("aria-pressed", String(tema === "oscuro"));
}

elementos.botonTema.addEventListener("click", () => {
  const temaActual = document.documentElement.dataset.tema;
  const nuevoTema = temaActual === "oscuro" ? "claro" : "oscuro";
  aplicarTema(nuevoTema);
  guardarTema(nuevoTema);                                // localStorage.setItem(...)
});
```

Cómo funciona:

1. Al hacer clic, se lee el tema actual en el atributo `data-tema` de `<html>` y se elige el contrario.
2. `aplicarTema` cambia ese atributo. En `style.css`, la regla `:root[data-tema="oscuro"]` redefine las variables de color (`--color-fondo`, `--color-texto`…), así que **toda la página cambia sin tocar cada sección por separado**.
3. `guardarTema` guarda la elección en `localStorage`. Al cargar la página, `obtenerTemaInicial()` la lee; si no existe, usa `prefers-color-scheme`.
4. `aria-pressed="true"` avisa a los lectores de pantalla que el modo oscuro está activo.

## 12. Reflexión sobre el uso de IA

✏️ **Por completar por el equipo, con sus propias palabras.** Preguntas que pueden guiarles:

- ¿En qué tareas les ahorró más tiempo la IA?
- ¿Qué tuvieron que revisar o corregir de lo que generó?
- ¿Por qué es importante probar el código en lugar de confiar en la respuesta?
- ¿Qué aprendieron que ahora podrían explicar sin ayuda?

## 13. Contribuciones

Tomadas del historial de commits del repositorio.

**`jilderdionisio-cloud`** ✏️ *(agregar nombre completo)*
- Configuración inicial del repositorio.
- Estructura HTML del explorador.
- Consulta a la API y creación de tarjetas.
- Búsqueda, filtros y orden.
- Favoritos con `localStorage`.

**Marjorie Alejandra Xeque Pech (`Marjoxp`)**
- Diseño visual completo en `style.css`: paleta, temas, tarjetas, indicadores de estado y diseño adaptable (PR #1).
- Modo claro y oscuro con `localStorage`, y atributos `data-estado` / `data-favorito` para los estilos.
- Pruebas, Issues (#2, #3, #4) y esta documentación.

## 14. Pruebas realizadas

| # | Prueba | Resultado | Cómo se probó |
|---|---|---|---|
| 1 | Carga de personajes | ✅ | API real (consulta directa) y página con datos simulados |
| 2 | Búsqueda por nombre | ✅ | API real: `?name=smith` → 19 resultados; página con datos simulados |
| 3 | Filtros estado y especie | ✅ | Datos simulados (individuales y combinados) |
| 4 | Orden A-Z y Z-A | ✅ | Datos simulados |
| 5 | Agregar y quitar favoritos | ✅ | Datos simulados |
| 6 | Favoritos tras recargar | ✅ | Datos simulados |
| 7 | Tema tras recargar | ✅ | Claro → oscuro → recarga → oscuro; vuelta a claro también persiste |
| 8 | Error y sin resultados | ✅ | API real: búsqueda sin coincidencias responde 404; error 500 simulado |
| 9 | Diseño adaptable | ✅ | 320, 375, 768, 1024 y 1440 px, sin scroll horizontal |
| 10 | Errores de JavaScript | ✅ | Ningún error de JavaScript durante las pruebas |

Las pruebas de la página se ejecutaron automáticamente con Playwright (Chromium) y respuestas simuladas con el mismo formato que la API real. **Falta probar en celulares reales y en Firefox o Safari**, y repetir las pruebas en la URL de GitHub Pages.

Limitación conocida: los filtros solo actúan sobre los primeros 20 personajes que devuelve la API (Issue #3).
