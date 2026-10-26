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

**Prompt 3 – Estructura inicial del explorador (Alex):**
> "Actúa como mi desarrollador principal para el proyecto académico 'Explorador interactivo de información'… El repositorio ya está creado y configurado como público. NO vuelvas a crearlo ni cambies su nombre… Inspecciona el estado actual del repositorio antes de modificarlo… Crea o completa index.html con una estructura semántica… Usa el mensaje: 'feat: crear estructura inicial del explorador'… No afirmes que has realizado un commit si no aparece efectivamente en el repositorio."

Este prompt dio origen al commit `feat: crear estructura inicial del explorador`.

<details>
<summary>Ver el texto completo del Prompt 3</summary>

```text
Actúa como mi desarrollador principal para el proyecto académico "Explorador interactivo de información".
REPOSITORIO EXISTENTE:
https://github.com/jilderdionisio-cloud/proyecto-web-ia
IMPORTANTE: El repositorio ya está creado y configurado como público. NO vuelvas a crearlo ni cambies su nombre. Debes continuar desde su estado actual.
OBJETIVO:
Desarrollar una aplicación web que consuma la API pública de Rick and Morty y permita explorar personajes de forma interactiva.
API:
https://rickandmortyapi.com/documentation
Endpoint principal:
https://rickandmortyapi.com/api/character
TECNOLOGÍAS OBLIGATORIAS:
- HTML
- CSS
- JavaScript puro
- fetch()
- localStorage
- GitHub Pages
No utilices React, Vue, Angular, frameworks ni dependencias innecesarias.
MI FORMA DE TRABAJO:
Utilizo GitHub y su editor web para modificar archivos. No quiero depender de Visual Studio Code ni de una terminal local. Si necesitas realizar cambios mediante herramientas disponibles en Codex, debes explicarme cómo quedarán reflejados en GitHub y qué pasos debo realizar desde la web cuando sea necesario.
PRIMERA FASE:
1. Inspecciona el estado actual del repositorio antes de modificarlo.
2. Identifica los archivos que ya existen y revisa si hay código que deba conservarse.
3. No sobrescribas trabajo existente sin justificarlo.
4. Crea o completa index.html con una estructura semántica para:
   - Encabezado y navegación.
   - Buscador por nombre.
   - Filtros por estado y especie.
   - Controles para ordenar resultados.
   - Zona de mensajes de carga y errores.
   - Contenedor de tarjetas de personajes.
   - Sección de favoritos.
   - Botón para alternar el tema claro y oscuro.
   - Pie de página.
5. Conecta correctamente style.css y script.js mediante rutas relativas.
6. No escribas personajes manualmente: los datos deben proceder de la API.
GESTIÓN DE VERSIONES:
- Realiza un commit real de este avance, si tienes acceso autorizado para hacerlo.
- Usa el mensaje: "feat: crear estructura inicial del explorador".
- Si no puedes hacer el commit directamente, entrégame los pasos exactos para guardarlo desde GitHub.
- No afirmes que has realizado un commit si no aparece efectivamente en el repositorio.
Al terminar, explícame qué archivos modificaste, qué contiene cada uno y qué debo comprobar en GitHub. No avances todavía a la implementación completa de todas las funcionalidades. Primero deja la estructura inicial correctamente guardada.
```

</details>

**Prompt adicional – Planteamiento inicial del proyecto (Alex):**
> "Actúa como un desarrollador web que enseña a principiantes. Vamos a desarrollar un proyecto académico llamado 'Explorador interactivo de información' utilizando exclusivamente el editor web de GitHub… MI RESPONSABILIDAD: Comenzar el proyecto desde cero y crear index.html… Explícame cada sección con palabras sencillas para que pueda defender el proyecto en clase."

<details>
<summary>Ver el texto completo del prompt adicional</summary>

```text
Actúa como un desarrollador web que enseña a principiantes. Vamos a desarrollar un proyecto académico llamado "Explorador interactivo de información" utilizando exclusivamente el editor web de GitHub, sin Visual Studio Code, terminal, Git Bash ni instalaciones locales.
El proyecto utilizará la API pública de Rick and Morty: https://rickandmortyapi.com/documentation
REQUISITOS:
- HTML, CSS y JavaScript puro.
- Archivos obligatorios: index.html, style.css, script.js y README.md.
- Mostrar personajes reales obtenidos de la API.
- Buscador, filtros, favoritos y localStorage.
- Mensajes de carga, errores y resultados vacíos.
- Diseño adaptable a computadoras y celulares.
- Publicación mediante GitHub Pages.
- Al menos 6 commits reales, 2 Issues y 1 Pull Request.
- Contribuciones identificables de dos integrantes.
- Una funcionalidad extra que implementaremos posteriormente.
MI RESPONSABILIDAD:
Comenzar el proyecto desde cero y crear index.html. Primero, explícame brevemente cómo crear el repositorio público proyecto-web-ia desde la web de GitHub y cómo comprobar que estoy usando mi propia cuenta.
Después, entrégame únicamente el código completo de index.html, con una estructura semántica, encabezado, navegación, buscador, controles de filtros, zona de mensajes, contenedor para tarjetas de personajes, sección de favoritos y pie de página.
Conecta los archivos style.css y script.js mediante sus rutas relativas correctas. No escribas los personajes manualmente en HTML: JavaScript los obtendrá de la API.
INDICACIONES:
1. Dame instrucciones paso a paso para crear el archivo usando el editor web de GitHub.
2. Indícame qué mensaje de commit debo utilizar.
3. Debo guardar este primer avance antes de continuar con los demás archivos.
4. No generes todavía una solución completa en un solo archivo.
5. Explícame cada sección con palabras sencillas para que pueda defender el proyecto en clase.
Comencemos únicamente con la creación del repositorio y el primer archivo.
```

</details>

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

### Marjorie Alejandra Xeque Pech (`Marjoxp`)

La inteligencia artificial me parece una herramienta magnífica y de gran ayuda. Potencia nuestros trabajos y proyectos, como este explorador.

Me ayudó a avanzar mucho más rápido en tareas que me habrían llevado bastante tiempo: diseñar todo el `style.css` con los temas claro y oscuro, implementar el modo oscuro con `localStorage`, ejecutar pruebas en distintos tamaños de pantalla y redactar la documentación.

También aprendí que la IA no sustituye nuestra revisión:

- **No siempre acierta a la primera.** La primera versión del diseño móvil tenía un encabezado demasiado grande y tarjetas enormes. Lo corregimos al revisar las capturas.
- **Hay que comprobar lo que dice.** Cuando el agente de mi compañero indicó que debía reconectar GitHub, verificamos en el repositorio que el cambio ya se había subido correctamente.
- **Una prueba con datos simulados no es igual que una con datos reales.** Por eso repetimos las pruebas en la URL pública con la API real y en mi celular.

Lo más valioso fue que no solo obtuve el código: también entendí cómo funciona y puedo explicarlo, por ejemplo cómo el atributo `data-tema` y las variables de CSS cambian el color de toda la página.

Para mí, la IA funciona mejor cuando le damos instrucciones claras, revisamos sus respuestas y la usamos como apoyo para aprender, no solo para terminar más rápido.

### Alex Dionisio Rojas (`jilderdionisio-cloud`)

✏️ **Por completar con sus propias palabras.**

## 13. Contribuciones

Tomadas del historial de commits del repositorio.

**Alex Dionisio Rojas (`jilderdionisio-cloud`)**
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

Se hicieron tres rondas de pruebas:

- **A. Automáticas (Playwright, Chromium):** con respuestas simuladas con el mismo formato que la API real.
- **B. URL pública con la API real:** en https://jilderdionisio-cloud.github.io/proyecto-web-ia/ (25/10/2026), desde un navegador de escritorio.
- **C. Celular real:** Motorola Edge 50 Pro con Chrome, en la URL pública.

| # | Prueba | Resultado | Dónde |
|---|---|---|---|
| 1 | Carga de personajes | ✅ | A, B (20 personajes), C |
| 2 | Búsqueda por nombre | ✅ | A, B ("smith" → 19 resultados) |
| 3 | Filtros estado y especie | ✅ | A (individuales y combinados), B ("smith" + Muerto) |
| 4 | Orden A-Z y Z-A | ✅ | A, B |
| 5 | Agregar y quitar favoritos | ✅ | A, B (agregar), C (favoritos visibles) |
| 6 | Favoritos tras recargar | ✅ | A, B |
| 7 | Tema y su persistencia | ✅ | A, B (claro ↔ oscuro y recarga), C (modo oscuro activo) |
| 8 | Error y sin resultados | ✅ | B ("zzzz" → mensaje sin resultados), A (error 500 simulado) |
| 9 | Diseño adaptable | ✅ | A (320, 375, 768, 1024 y 1440 px), B (375 px emulado), C (vertical y horizontal) |
| 10 | Errores de JavaScript | ✅ | A, B: ningún error de JavaScript; solo el aviso de red 404, esperado en la búsqueda sin resultados |

**Pendiente:** probar en Firefox y Safari (iPhone).

Limitación conocida: los filtros solo actúan sobre los primeros 20 personajes que devuelve la API (Issue #3).
