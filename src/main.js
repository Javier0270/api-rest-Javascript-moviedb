//Implementando AXIOS

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  //timeout: 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

//Utils

function createMovies(movies,container){
  //Esta constante  trendingMoviesPreviewList no esta declarada aqui ya que la declaramos en el node.js
  //Antes de entrar al forEach limpiamos la informacion que se encuentre en la constante trendingMoviesPreviewList y genericSection que la estamos reemplazando por el parametro container
  container.innerHTML = '';

  movies.forEach((movie) => {
    //constante trendingPreviewMovieContainer se crea en node.js
    
    //En la constante movieContainer Creamos un div con la funcion document.createElement('div)
    const movieContainer = document.createElement("div");
    //a la constante movieContainer agregamos una clase mediante el DOM
    movieContainer.classList.add("movie-container");

    //Evento que se ejecuta al dar click sobre la caratula de la pelicula nos lleve a la vista de detalles de la pelicula
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id; //
    });

    //En la constante movieImg Creamos una etiqueta img
    const movieImg = document.createElement("img");
    //movieImg Agregamos una clase mediante el DOM
    movieImg.classList.add("movie-img");
    // movieImg en la etiqueta img Agregamo un atributo alt y le pasamos el titulo de la pelicula movie.title.
    movieImg.setAttribute("alt", movie.title);
    // movieImg en la etiqueta img Agregamo el atributo src y le pasamos el titulo de la pelicula movie.poster_path.
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    // Realizo appendChild(movieImg) - (movieContainer)
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container){
  //Esta categoriesPreviewList constante no esta declarada aqui ya que la declaramos en el node.js
  //Antes de entrar al forEach limpiamos la informacion que se encuentre en la constante categoriesPreviewList que la estamos reemplazando por el parametro container
  container.innerHTML = '';
  categories.forEach((category) => {

    //En la constante categoryContainer Creamos un div con la funcion document.createElement('div)
    const categoryContainer = document.createElement("div");

    //a la constante categoryContainer agregamos una clase mediante el DOM
    categoryContainer.classList.add("category-container");

    //En la constante categoryTitle Creamos una etiqueta h3
    const categoryTitle = document.createElement("h3");
    //categoryTitle Agregamos una clase mediante el DOM
    categoryTitle.classList.add("category-title");
    // categoryTitle en la etiqueta h3 Agregamo un atributo id y le pasamos el id + concatenamos category.id
    categoryTitle.setAttribute("id", "id" + category.id);
    //la constante categoryTitleText mediante el document.createTextNode(category.nombre) le enviamos el texto
    const categoryTitleText = document.createTextNode(category.name);

    //La siguiente linea es una funcion flecha es para poder seleccionar una categoria en especifico
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    // La funcion appendChild permite guarda otras constante variable
    // Realizo appendChild(categoryTitle) le envio el (categoryTitleText)
    categoryTitle.appendChild(categoryTitleText);

    categoryContainer.appendChild(categoryTitle);

    container.appendChild(categoryContainer);
  });
}


//LLamados a la API
//Funcion asyncrona
//Consulta la api rest de peliculas y me lista la tendendia de pelicula del dia

async function getTrendingMoviesPreview() {
  //constante data  le pasamos await la api que contiene la url base y la api key
  // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

  //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
  const { data } = await api("trending/movie/day");

  //En movies recibimos la informacion en especifico de data.results
  const movies = data.results;

  console.log('Movies:')
  //console.log({ data, movies });
  console.log(movies);

  //los parametro de la funcion createMovies 'movies' me trae le resultado de pelicula y los mueve al contenedor 'genericSection'
  createMovies(movies,trendingMoviesPreviewList)

}

//Funcion asincrona
//Lista de peliculas filtradas por las distintas categoria
async function getCategoriesPreview() {
  //constante data  le pasamos await la api que contiene la url base y la api key
  // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

  //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
  const { data } = await api("genre/movie/list");

  //En movies recibimos la informacion en especifico de data.results
  const categories = data.genres;

  console.log('Categories:')
  console.log({ data, categories });

  //llamado a la funcion  y le pasamos la siguiente informacion
  //los parametro de la funcion createCategories 'categories' me trae le resultado de pelicula por categoria y los mueve al contenedor 'categoriesPreviewList'
  createCategories(categories, categoriesPreviewList)

}

//Funcion asincrona
//Consumir empoint discover/movie agregamos un quey parametro ?
async function getMoviesByCategory(id) {
  //constante data  le pasamos await la api que contiene la url base y la api key
  // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

  //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
  const { data } = await api('discover/movie',{
    // agregando query parametro
    params: {
      with_genres: id,
    },
  });

  //En movies recibimos la informacion en especifico de data.results
  const movies = data.results;

  console.log('Movies:')
  console.log({ data, movies });

  //los parametro de la funcion createMovies 'movies' me trae le resultado de pelicula y los mueve al contenedor 'genericSection'
  createMovies(movies,genericSection)

}

//Funcion para realizar la busqueda
async function getMoviesBySearch(query) {
  //constante data  le pasamos await la api que contiene la url base y la api key
  // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

  //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
  const { data } = await api('search/movie',{
    // agregando query parametro
    params: {
      query: query,
    },
  });

  //En movies recibimos la informacion en especifico de data.results
  const movies = data.results;

  console.log('Movies:')
  console.log({ data, movies });


  //los parametro de la funcion createMovies 'movies' me trae le resultado de pelicula y los mueve al contenedor 'genericSection'
  createMovies(movies,genericSection)

}

//Funcion de ver mas tendencias me vializa las misma tendencias del home pero de forma vertical
async function getTrendingMovies() {
  //constante data  le pasamos await la api que contiene la url base y la api key
  // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

  //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
  const { data } = await api("trending/movie/day");

  //En movies recibimos la informacion en especifico de data.results
  const movies = data.results;

  console.log('Movies:')
  console.log({ data, movies });

  //los parametro de la funcion createMovies 'movies' me trae le resultado de pelicula y los mueve al contenedor 'genericSection'
  createMovies(movies,genericSection)

}

//Funcion que recibe el id para mostrar el detalle de cada pelicula
// esta funcion recibe un argumento getMovieById(movieId) dede navigation.js y se lo pasamos el parametro getMovieById(id) 
async function getMovieById(id) {
  //constante data  le pasamos await la api que contiene la url base y la api key
  // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

  //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
  const { data: movie } = await api("movie/" + id);  // renombro el data por movie

  console.log('Detail Movie:')
  console.log({ movie });

  //Mostrando la respectiva informacion del detalle de la pelicula seleccionada
  
  //Constante movieImgUrl  que tiene la url tipo de imagen y tamaño. contatenamos el movie.poster_path de la imagen de la pelicula
  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  console.log(movieImgUrl);

  //headerSection.style.background = `url(${movieImgUrl})`;
  // Degradado a la imagen
  headerSection.style.background = `
    linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  //movie.genres es la categoria de la pelicula  en este caso  la funcion createCategories  me trae las categorias relacionadas con dicha categoria
  //llamar a la fucion createCategories para que poder mostrar las categorias relacionadas con la pelicula
  createCategories(movie.genres, movieDetailCategoriesList);

  //llamo a la funcion getRelatedMovieById() y le pasomos el mismo parametro id  a la funcion
  getRelatedMoviesId(id)
}

//Funcion que recibe el id para mostrar el detalle de cada pelicula en este caso mostrar las peliculas recomendas
async function getRelatedMoviesId(id){
  //constante data  le pasamos await la api que contiene la url base y la api key
  // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

  //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
  const { data } = await api(`movie/${id}/recommendations`);

  const relatedMovies = data.results;
  console.log('Movies Recommendatios')
  console.log(relatedMovies);

  //relatedMovies guarda la informacion de las peliculas recomendadas 
  // Mediante la funcion createMovies le pasamos el contenedor relatedMoviesContainer para que poder mostrar las peliculas recomendadas
  createMovies(relatedMovies, relatedMoviesContainer);
}


//llamando a la funcion automaticamente

// Ls siguiente funciones se ejecutaran dependiendo la location del hasg
//getTrendingMoviesPreview();
//getCategoriesPreview();
