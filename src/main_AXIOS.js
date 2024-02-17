//Implementando AXIOS

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    //timeout: 1000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
})

//Funcion asyncrona
//Consulta la api rest de peliculas y me lista la tendendia de pelicula del dia

async function getTrendingMoviesPreview(){
    //constante data  le pasamos await la api que contiene la url base y la api key
    // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().

    //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
    const { data } = await api('trending/movie/day');

    //En movies recibimos la informacion en especifico de data.results
    const movies = data.results;

    console.log({ data, movies });

    movies.forEach(movie => {
        //constante trendingPreviewMovieContainer creamos un document.querySelector 
        const trendingPreviewMovieContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        //En la constante movieContainer Creamos un div con la funcion document.createElement('div)
        const movieContainer = document.createElement('div');
        //a la constante movieContainer agregamos una clase mediante el DOM
        movieContainer.classList.add('movie-container');

        //En la constante movieImg Creamos una etiqueta img
        const movieImg = document.createElement('img');
         //movieImg Agregamos una clase mediante el DOM
         movieImg.classList.add('movie-img');
         // movieImg en la etiqueta img Agregamo un atributo alt y le pasamos el titulo de la pelicula movie.title.
         movieImg.setAttribute('alt', movie.title);
        // movieImg en la etiqueta img Agregamo el atributo src y le pasamos el titulo de la pelicula movie.poster_path.
         movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
         
         // Realizo appendChild(movieImg) - (movieContainer)
         movieContainer.appendChild(movieImg);
         trendingPreviewMovieContainer.appendChild(movieContainer);

    })
}

//Funcion asincrona
//Lista de peliculas filtradas por las distintas categoria
async function getCategoriesPreview(){

    //constante data  le pasamos await la api que contiene la url base y la api key
    // como el empoint de la api rest la instanciamos con AXIOS no es necesario el .json().
    
    //Al implementar el api solo es necesario agregar el complemento del empoint que deseamos consultar
    const { data } = await api('genre/movie/list');

    //En movies recibimos la informacion en especifico de data.results
    const categories = data.genres;

    console.log({ data, categories });

    categories.forEach(category => {
        
        // constante previeCategoriesContainer le indico el id y la classe mediante document.querySelector() 
        const previeCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

        //En la constante categoryContainer Creamos un div con la funcion document.createElement('div)
        const categoryContainer = document.createElement('div');

        //a la constante categoryContainer agregamos una clase mediante el DOM
        categoryContainer.classList.add('category-container');
        
        //En la constante categoryTitle Creamos una etiqueta h3
        const categoryTitle = document.createElement('h3');
         //categoryTitle Agregamos una clase mediante el DOM
         categoryTitle.classList.add('category-title');
         // categoryTitle en la etiqueta h3 Agregamo un atributo id y le pasamos el id + concatenamos category.id
         categoryTitle.setAttribute('id', 'id' + category.id);
        //la constante categoryTitleText mediante el document.createTextNode(category.nombre) le enviamos el texto
        const categoryTitleText = document.createTextNode(category.name)

        // La funcion appendChild permite guarda otras constante variable
         // Realizo appendChild(categoryTitle) le envio el (categoryTitleText)
         categoryTitle.appendChild(categoryTitleText);

         categoryContainer.appendChild(categoryTitle);

         previeCategoriesContainer.appendChild(categoryContainer);

    })
}

//llamando a la funcion automaticamente
getTrendingMoviesPreview();

getCategoriesPreview();