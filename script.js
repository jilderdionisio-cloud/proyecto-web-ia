"use strict";

const API_URL = "https://rickandmortyapi.com/api/character";

const elementos = {
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

function mostrarCarga(estaCargando) {
  elementos.mensajeCarga.hidden = !estaCargando;
}

async function consultarPersonajes() {
  mostrarCarga(true);

  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`La API respondió con el estado ${respuesta.status}.`);
    }

    const datos = await respuesta.json();
    personajes = Array.isArray(datos.results) ? datos.results : [];
    renderizarPersonajes(personajes);
  } catch (error) {
    console.error("No fue posible consultar los personajes:", error);
    personajes = [];
    renderizarPersonajes(personajes);
  } finally {
    mostrarCarga(false);
  }
}

consultarPersonajes();
