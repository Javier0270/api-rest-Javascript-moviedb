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
  console.log({ data, movies });

  createMovies(movies,trendingMoviesPreviewList)

//El siguiente codigo se comenta ya que se encuentra en la funcion createMovies()

  /*//Esta constante  trendingMoviesPreviewList no esta declarada aqui ya que la declaramos en el node.js
  //Antes de entrar al forEach limpiamos la informacion que se encuentre en la constante trendingMoviesPreviewList
  trendingMoviesPreviewList.innerHTML= "";
  movies.forEach((movie) => {
    //constante trendingPreviewMovieContainer se crea en node.js
    
    //En la constante movieContainer Creamos un div con la funcion document.createElement('div)
    const movieContainer = document.createElement("div");
    //a la constante movieContainer agregamos una clase mediante el DOM
    movieContainer.classList.add("movie-container");

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
    trendingMoviesPreviewList.appendChild(movieContainer);
  });*/
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
  createCategories(categories, categoriesPreviewList)

//Esta categoriesPreviewList constante no esta declarada aqui ya que la declaramos en el node.js
//Antes de entrar al forEach limpiamos la informacion que se encuentre en la constante categoriesPreviewList

/*categoriesPreviewList.innerHTML = "";
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

    categoriesPreviewList.appendChild(categoryContainer);
  });*/
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

  createMovies(movies,genericSection)


//El siguiente codigo se comenta ya que se encuentra en la funcion createMovies()

  /*//Esta constante  trendingMoviesPreviewList no esta declarada aqui ya que la declaramos en el node.js
  //Antes de entrar al forEach limpiamos la informacion que se encuentre en la constante trendingMoviesPreviewList
  genericSection.innerHTML= "";
  movies.forEach((movie) => {
    //constante trendingPreviewMovieContainer se crea en node.js
    
    //En la constante movieContainer Creamos un div con la funcion document.createElement('div)
    const movieContainer = document.createElement("div");
    //a la constante movieContainer agregamos una clase mediante el DOM
    movieContainer.classList.add("movie-container");

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
    genericSection.appendChild(movieContainer);
  });*/
}

//llamando a la funcion automaticamente

// Ls siguiente funciones se ejecutaran dependiendo la location del hasg
//getTrendingMoviesPreview();
//getCategoriesPreview();
