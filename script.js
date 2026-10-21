"use strict";

const API_URL = "https://rickandmortyapi.com/api/character";

const elementos = {
  formularioBusqueda: document.querySelector("#formulario-busqueda"),
  buscador: document.querySelector("#buscador"),
  filtroEstado: document.querySelector("#filtro-estado"),
  filtroEspecie: document.querySelector("#filtro-especie"),
  ordenarPor: document.querySelector("#ordenar-por"),
  botonLimpiar: document.querySelector("#boton-limpiar"),
  contenedorPersonajes: document.querySelector("#contenedor-personajes"),
  mensajeCarga: document.querySelector("#mensaje-carga"),
};

let personajes = [];

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
  renderizarPersonajes(obtenerPersonajesFiltrados());
}

function mostrarCarga(estaCargando) {
  elementos.mensajeCarga.hidden = !estaCargando;
}

async function consultarPersonajes(nombre = "") {
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
    personajes = Array.isArray(datos.results) ? datos.results : [];
    aplicarControles();
  } catch (error) {
    console.error("No fue posible consultar los personajes:", error);
    personajes = [];
    aplicarControles();
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

consultarPersonajes();
