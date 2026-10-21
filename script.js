"use strict";

const API_URL = "https://rickandmortyapi.com/api/character";
const CLAVE_FAVORITOS = "explorador-rick-morty-favoritos";

const elementos = {
  formularioBusqueda: document.querySelector("#formulario-busqueda"),
  buscador: document.querySelector("#buscador"),
  filtroEstado: document.querySelector("#filtro-estado"),
  filtroEspecie: document.querySelector("#filtro-especie"),
  ordenarPor: document.querySelector("#ordenar-por"),
  botonLimpiar: document.querySelector("#boton-limpiar"),
  contenedorPersonajes: document.querySelector("#contenedor-personajes"),
  contenedorFavoritos: document.querySelector("#contenedor-favoritos"),
  mensajeCarga: document.querySelector("#mensaje-carga"),
  mensajeError: document.querySelector("#mensaje-error"),
  mensajeVacio: document.querySelector("#mensaje-vacio"),
};

let personajes = [];
let favoritos = cargarFavoritos();
let huboErrorEnConsulta = false;

function textoSeguro(valor, textoAlternativo = "No disponible") {
  return typeof valor === "string" && valor.trim() ? valor : textoAlternativo;
}

function obtenerUrlImagenSegura(url) {
  try {
    const urlImagen = new URL(url);
    return urlImagen.protocol === "https:" ? urlImagen.href : "";
  } catch {
    return "";
  }
}

function normalizarPersonaje(personaje) {
  if (!personaje || !Number.isInteger(personaje.id)) {
    return null;
  }

  return {
    id: personaje.id,
    name: textoSeguro(personaje.name),
    image: obtenerUrlImagenSegura(personaje.image),
    species: textoSeguro(personaje.species),
    status: textoSeguro(personaje.status),
    origin: {
      name: textoSeguro(personaje.origin?.name),
    },
  };
}

function eliminarDuplicados(listaPersonajes) {
  const personajesUnicos = new Map();

  listaPersonajes.forEach((personaje) => {
    const personajeNormalizado = normalizarPersonaje(personaje);

    if (personajeNormalizado) {
      personajesUnicos.set(personajeNormalizado.id, personajeNormalizado);
    }
  });

  return [...personajesUnicos.values()];
}

function cargarFavoritos() {
  try {
    const datosGuardados = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS) || "[]");
    return Array.isArray(datosGuardados) ? eliminarDuplicados(datosGuardados) : [];
  } catch (error) {
    console.error("No fue posible recuperar los favoritos:", error);
    return [];
  }
}

function guardarFavoritos() {
  try {
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  } catch (error) {
    console.error("No fue posible guardar los favoritos:", error);
  }
}

function esFavorito(idPersonaje) {
  return favoritos.some((favorito) => favorito.id === idPersonaje);
}

function crearDatoPersonaje(etiqueta, valor) {
  const parrafo = document.createElement("p");
  const textoDestacado = document.createElement("strong");

  textoDestacado.textContent = `${etiqueta}: `;
  parrafo.append(textoDestacado, textoSeguro(valor));

  return parrafo;
}

function crearTarjetaPersonaje(personaje) {
  const tarjeta = document.createElement("article");
  const imagen = document.createElement("img");
  const contenido = document.createElement("div");
  const titulo = document.createElement("h3");
  const botonFavorito = document.createElement("button");

  tarjeta.className = "tarjeta-personaje";
  contenido.className = "tarjeta-personaje__contenido";
  titulo.textContent = textoSeguro(personaje.name);

  imagen.src = obtenerUrlImagenSegura(personaje.image);
  imagen.alt = `Imagen de ${textoSeguro(personaje.name, "un personaje")}`;
  imagen.loading = "lazy";

  contenido.append(
    titulo,
    crearDatoPersonaje("Especie", personaje.species),
    crearDatoPersonaje("Estado", personaje.status),
    crearDatoPersonaje("Origen", personaje.origin?.name),
  );

  botonFavorito.type = "button";
  botonFavorito.className = "boton-favorito";
  botonFavorito.dataset.id = String(personaje.id);
  botonFavorito.textContent = esFavorito(personaje.id)
    ? "Quitar de favoritos"
    : "Agregar a favoritos";
  contenido.append(botonFavorito);
  tarjeta.append(imagen, contenido);

  return tarjeta;
}

function renderizarPersonajes(listaPersonajes) {
  elementos.contenedorPersonajes.replaceChildren();

  const fragmento = document.createDocumentFragment();
  listaPersonajes.forEach((personaje) => {
    fragmento.append(crearTarjetaPersonaje(personaje));
  });

  elementos.contenedorPersonajes.append(fragmento);
}

function renderizarFavoritos() {
  elementos.contenedorFavoritos.replaceChildren();

  if (favoritos.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "Aún no has agregado personajes favoritos.";
    elementos.contenedorFavoritos.append(aviso);
    return;
  }

  const fragmento = document.createDocumentFragment();
  favoritos.forEach((personaje) => {
    fragmento.append(crearTarjetaPersonaje(personaje));
  });

  elementos.contenedorFavoritos.append(fragmento);
}

function mostrarError(mensaje) {
  elementos.mensajeError.textContent = mensaje;
  elementos.mensajeError.hidden = false;
}

function ocultarMensajesDeResultado() {
  elementos.mensajeError.hidden = true;
  elementos.mensajeVacio.hidden = true;
}

function mostrarResultadoVacio(mostrar) {
  elementos.mensajeVacio.hidden = !mostrar;
}

function obtenerPersonajesFiltrados() {
  const estadoSeleccionado = elementos.filtroEstado.value;
  const especieSeleccionada = elementos.filtroEspecie.value;
  const ordenSeleccionado = elementos.ordenarPor.value;

  const listaFiltrada = personajes.filter((personaje) => {
    const coincideEstado =
      !estadoSeleccionado || personaje.status.toLowerCase() === estadoSeleccionado;
    const coincideEspecie =
      !especieSeleccionada || personaje.species === especieSeleccionada;

    return coincideEstado && coincideEspecie;
  });

  return listaFiltrada.sort((personajeA, personajeB) => {
    if (ordenSeleccionado === "nombre-desc") {
      return personajeB.name.localeCompare(personajeA.name, "es");
    }

    if (ordenSeleccionado === "id-asc") {
      return personajeA.id - personajeB.id;
    }

    if (ordenSeleccionado === "id-desc") {
      return personajeB.id - personajeA.id;
    }

    return personajeA.name.localeCompare(personajeB.name, "es");
  });
}

function aplicarControles() {
  const listaFiltrada = obtenerPersonajesFiltrados();
  renderizarPersonajes(listaFiltrada);
  mostrarResultadoVacio(listaFiltrada.length === 0 && !huboErrorEnConsulta);
}

function mostrarCarga(estaCargando) {
  elementos.mensajeCarga.hidden = !estaCargando;
}

async function consultarPersonajes(nombre = "") {
  huboErrorEnConsulta = false;
  ocultarMensajesDeResultado();
  mostrarCarga(true);

  try {
    const url = new URL(API_URL);

    if (nombre) {
      url.searchParams.set("name", nombre);
    }

    const respuesta = await fetch(url);

    if (respuesta.status === 404) {
      personajes = [];
      aplicarControles();
      return;
    }

    if (!respuesta.ok) {
      throw new Error(`La API respondió con el estado ${respuesta.status}.`);
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos.results)) {
      throw new Error("La API devolvió datos con un formato no esperado.");
    }

    personajes = Array.isArray(datos.results) ? datos.results : [];
    aplicarControles();
  } catch (error) {
    console.error("No fue posible consultar los personajes:", error);
    huboErrorEnConsulta = true;
    personajes = [];
    aplicarControles();
    mostrarError(
      "No pudimos obtener los personajes. Revisa tu conexión e inténtalo de nuevo.",
    );
  } finally {
    mostrarCarga(false);
  }
}

elementos.formularioBusqueda.addEventListener("submit", (evento) => {
  evento.preventDefault();
  consultarPersonajes(elementos.buscador.value.trim());
});

elementos.filtroEstado.addEventListener("change", aplicarControles);
elementos.filtroEspecie.addEventListener("change", aplicarControles);
elementos.ordenarPor.addEventListener("change", aplicarControles);

elementos.botonLimpiar.addEventListener("click", () => {
  elementos.formularioBusqueda.reset();
  elementos.filtroEstado.value = "";
  elementos.filtroEspecie.value = "";
  elementos.ordenarPor.value = "nombre-asc";
  consultarPersonajes();
});

function actualizarFavorito(idPersonaje) {
  const personaje = personajes.find((item) => item.id === idPersonaje);

  if (!personaje) {
    favoritos = favoritos.filter((favorito) => favorito.id !== idPersonaje);
  } else if (esFavorito(idPersonaje)) {
    favoritos = favoritos.filter((favorito) => favorito.id !== idPersonaje);
  } else {
    const personajeNormalizado = normalizarPersonaje(personaje);

    if (personajeNormalizado) {
      favoritos = [...favoritos, personajeNormalizado];
    }
  }

  guardarFavoritos();
  renderizarFavoritos();
  aplicarControles();
}

function manejarAccionFavorito(evento) {
  const boton = evento.target.closest(".boton-favorito");

  if (!boton) {
    return;
  }

  actualizarFavorito(Number(boton.dataset.id));
}

elementos.contenedorPersonajes.addEventListener("click", manejarAccionFavorito);
elementos.contenedorFavoritos.addEventListener("click", manejarAccionFavorito);

renderizarFavoritos();
consultarPersonajes();
