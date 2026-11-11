const manuscritos = window.manuscritosData ?? [];
const pagina = document.body.dataset.page;

function crearElemento(etiqueta, clase, texto = "") {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  elemento.textContent = texto;
  return elemento;
}

function crearImagen(imagen, clase) {
  const contenedor = crearElemento("div", clase);
  const img = document.createElement("img");
  img.src = imagen.url;
  img.alt = imagen.alt;
  img.loading = "lazy";
  contenedor.append(img);
  return contenedor;
}

function renderizarInicio() {
  const lista = document.getElementById("lista-manuscritos");

  if (manuscritos.length === 0) {
    lista.append(crearElemento("p", "vacio", "Aún no hay manuscritos disponibles."));
    return;
  }

  manuscritos.forEach((post, indice) => {
    const tarjeta = document.createElement("a");
    tarjeta.className = "card";
    tarjeta.href = `${post.id}.html`;
    tarjeta.style.setProperty("--delay", `${indice * 90}ms`);
    tarjeta.append(
      crearImagen(post.imagen, "card-imagen"),
      crearElemento("span", "card-numero", post.numero),
      crearElemento("h2", "card-titulo", post.titulo),
      crearElemento("span", "card-fecha", post.data),
      crearElemento("span", "card-enlace", "Leer manuscrito")
    );
    lista.append(tarjeta);
  });
}

if (pagina === "inicio") renderizarInicio();