//Boton del la lupa que al momento de dar click  me envia a location hash de busqueda #search=
searchFormBtn.addEventListener('click', () => {
    // al location.hash = '#search='  le concateno la informacion del input
    location.hash = '#search=' + searchFormInput.value;
});

//Boton ver mas -> boton que al momento de dar click  me envia a location hash de tendencias #trends=
trendingBtn.addEventListener('click', () => {
    //location.hash es la url, en esas url poseemos vistas
    location.hash = '#trends=';
});

//Boton del la flecha <- boton que al momento de dar click  me envia a location hash de home #home
arrowBtn.addEventListener('click', () => {
    //Guardar el historial de la busqueda al momento de dar click a la funcion para atras <-
    history.back();
    //location.hash = '#home';
});


//Eveneto window que se ejecuta cuando el contenido halla cargado
window.addEventListener('DOMContentLoaded', navigator, false);

window.addEventListener('hashchange', navigator, false);

// Funcion Navigator
function navigator() {

    console.log({ location });

    // Si el location.hast -> si la url empieza por #trends, #search, #movie, #category
    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    //location.hash;

    // scrollTop se crea con el fin que al pasar a otra vista el scrollTop se visualice en el inicio
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Funciones de location de hash -> Verifica - la condicion y la valida 

function homePage(){
    console.log('Home!!');
    //Las siguientes constantes provienen del archivo node.js y el orde es debido a la estructura del index.htm
    //Por lo tanto jugamos a que se visulice o que se oculte una que otra clase de etiqueta de nuestro index.html mediante css
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');

    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');



    //Funciones ubicadas en el archivo main.js
    //Estas funciones se ejecutan en el home ya que es el inicio de la pagina
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage(){
    console.log('Categories!!');

    //Las siguientes constantes provienen del archivo node.js y el orde es debido a la estructura del index.htm
    //Por lo tanto jugamos a que se visulice o que se oculte una que otra clase de etiqueta de nuestro index.html mediante css
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    // con add las puedo ocultar
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    // remove se refiere que si aparesca la clase
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // url: #category=10751-Family
    //convertir el string de la url que es el location.hash el cual contiene el id de la categoria
    //convertir el string a un array y luego lo separamos con split

    //const [_, categoryData] me refiero al 'id-name' -> estoy separando la url completa
    const [_, categoryData] = location.hash.split('=')  // ['#category', 'id-name']
    // = categoryData.split('-'); selecciono el elemento categoryData que es la posicion 1 del array original y los separo con un guion
    const [categoryId, categoryName] = categoryData.split('-');

    //Pasar el nombre real de cada categoria al seleccionar 
    //ejemplio si en la vista home selecciono drama debe aparecer el la vista categoria el titulo de drama
    headerCategoryTitle.innerHTML = categoryName;

    //Posterior le envio el id a mi funcion
    getMoviesByCategory(categoryId);

}

function movieDetailsPage(){
    console.log('Movie!!');
    //Las siguientes constantes provienen del archivo node.js y el orde es debido a la estructura del index.htm
    //Por lo tanto jugamos a que se visulice o que se oculte una que otra clase de etiqueta de nuestro index.html mediante css
    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');

    arrowBtn.classList.add('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    // con add las puedo ocultar
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    // remove se refiere que si aparesca la clase
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // url: #movie=634492
    //['#movie''id']
    //El primer elemento no lo necesito, se necesita el segundo la pos [1]
    
    // url: #movie=634492
    //Mediante split('=') -> Indico que la url #movie=634492 que divida despues del igual =
    //const [_, movieId] me refiero al buscador por lo tanto el _ es la pos[0] y el buscador pos[1]
    const [_, movieId] = location.hash.split('=')  // ['#movie''id01']
    

    //Enviando atributos a la funcion
    getMovieById(movieId);
}

function searchPage(){
    console.log('Search!!');
    //Las siguientes constantes provienen del archivo node.js y el orde es debido a la estructura del index.htm
    //Por lo tanto jugamos a que se visulice o que se oculte una que otra clase de etiqueta de nuestro index.html mediante css
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    // con add las puedo ocultar
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    // remove se refiere que si aparesca la clase
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    
    // url: #search=Robot
    //['#search''buscador']
    //El primer elemento no lo necesito, se necesita el segundo la pos [1]
    
    // url: #search=Robot
    //Mediante split('=') -> Indico que la url #search=Robot la divida despues del igual =
    //const [_, query] me refiero al buscador por lo tanto el _ es la pos[0] y el buscador pos[1]
    const [_, query] = location.hash.split('=')  // ['#search''buscador']
    
    //A la funcion getMoviesBySearch recibe un argumento en el parametro query
    getMoviesBySearch(query);
}

function trendsPage(){
    console.log('Trends!!');
    //Las siguientes constantes provienen del archivo node.js y el orde es debido a la estructura del index.htm
    //Por lo tanto jugamos a que se visulice o que se oculte una que otra clase de etiqueta de nuestro index.html mediante css
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');

    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    // con add las puedo ocultar y con remove se muestra
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    // remove se refiere que si aparesca la clase
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';

    //llamando a la funcion getTrendingMovies();
    getTrendingMovies();
}