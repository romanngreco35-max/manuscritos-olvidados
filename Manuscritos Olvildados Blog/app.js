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
    tarjeta.href = `post.html?id=${encodeURIComponent(post.id)}`;
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

function establecerTexto(id, texto) {
  document.getElementById(id).textContent = texto;
}

function establecerDescripcion(texto) {
  document.querySelector('meta[name="description"]').setAttribute("content", texto);
}

function mostrarNoEncontrado() {
  document.title = "Manuscrito no encontrado | Manuscritos Olvidados";
  establecerDescripcion("El manuscrito solicitado no existe en el archivo.");
  establecerTexto("post-numero", "Archivo");
  establecerTexto("post-titulo", "Manuscrito no encontrado");
  establecerTexto("post-subtitulo", "Este pergamino se ha perdido entre los muros del archivo.");
  establecerTexto("post-fecha", "");
  document.getElementById("post-portada").replaceChildren();
  document
    .getElementById("post-narrativa")
    .replaceChildren(crearElemento("p", "", "El enlace puede estar incompleto o el manuscrito ya no está disponible."));
}

function renderizarPost() {
  const id = new URLSearchParams(window.location.search).get("id");
  const post = manuscritos.find((item) => item.id === id);

  if (!post) {
    mostrarNoEncontrado();
    return;
  }

  document.title = `${post.titulo} | Manuscritos Olvidados`;
  establecerDescripcion(post.subtitulo);
  establecerTexto("post-numero", post.numero);
  establecerTexto("post-titulo", post.titulo);
  establecerTexto("post-subtitulo", post.subtitulo);
  establecerTexto("post-fecha", post.data);
  const portada = document.getElementById("post-portada");
  portada.replaceChildren(crearImagen(post.imagen, "post-portada-imagen"));
  document.getElementById("post-narrativa").innerHTML = post.conteudoHTML;
}

if (pagina === "inicio") renderizarInicio();
if (pagina === "post") renderizarPost();
