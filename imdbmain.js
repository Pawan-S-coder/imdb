const inputEl=document.getElementById('searchInput');
const movieContainer=document.getElementById('movieContainer');
// ..............add eventListener when enter key pressed it will show the movie search result.......................
inputEl.addEventListener('keypress',async(e)=>{
    if(e.key==='Enter'){
        renderMovieResult(inputEl.value);
        inputEl.value='';
}
});
// .................create async function to fetch data from search input and api and render the result over main movie container.............
async function renderMovieResult(value){
    const  response= await fetch(`http://www.omdbapi.com/?apikey=efe13fd8&s=${value}`);
    const data=await response.json();
    // console.log(data.Search);
    if(data.Response==="True" && data.Search.length>0){

        // ...................store the data into local storage.................

        localStorage.setItem('lastSearchResult',JSON.stringify(data.Search));
        localStorage.setItem('lastSearchQuery',value);

        movieContainer.innerHTML='';
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        data.Search.forEach((movie)=>{
            const movieEl=document.createElement('div');
            movieEl.classList.add('movieCard');
            const isFavorited = favorites.includes(movie.imdbID) ? 'favorited' : '';
            movieEl.innerHTML=`<img src="${movie.Poster}" alt="${movie.Title}"/>
            <h2>${movie.Title}(${movie.Year})</h2> <button id="addToFav"class="addToFav ${isFavorited}"
            type="button"onclick="favList('${movie.imdbID}',this)">
            <i class="fa-regular fa-heart"></i></button>
            <a href="details.html?id=${movie.imdbID}" id="viewDetails"  onclick="movieDetails('${movie.imdbID}')">details</a>`;

            movieContainer.appendChild(movieEl);
 });
    }else{ document.getElementById('movieContainer').innerHTML=`<p id="noResult" >No Result Found... </p>`;
    }
}

// .................load the search result when the  page is loaded from the local storage............
document.addEventListener('DOMContentLoaded',()=>{
    const lastSearchResult=JSON.parse(localStorage.getItem('lastSearchResult'));
    const lastSearchQuery=JSON.parse(localStorage.getItem('lastSearchQuery'));
    if(lastSearchResult && lastSearchResult.length>0){
        inputEl.value=lastSearchQuery;
        movieContainer.innerHTML='';
        const favorites=JSON.parse(localStorage.getItem('favorites'))  ||[];
        lastSearchResult.forEach((movie)=>{
            const movieEl = document.createElement('div');
            movieEl.classList.add('movieCard');
            const isFavorited = favorites.includes(movie.imdbID) ? 'favorited' : '';
            movieEl.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}" />
                <h2>${movie.Title} (${movie.Year})</h2>
                <button id="addToFav" class="addToFav ${isFavorited}" type="button" onclick="favList('${movie.imdbID}', this)">
                    <i class="fa-regular fa-heart"></i>
                </button>
                <a href="details.html?id=${movie.imdbID}" id="viewDetails" onclick="movieDetails('${movie.imdbID}')">Details</a>
            `;
            movieContainer.appendChild(movieEl);
        })
    }

});


// ...............search button click event to search movie...............
document.getElementById('searchInputBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    renderMovieResult(inputEl.value);
    inputEl.value='';
})


// ........................store the movie id in local storage when the user click on details link.........
    function movieDetails(movieId){
        console.log(movieId);
        localStorage.setItem('movieId',movieId);
}



// ...................store the movie id and  movie icon on which it click in local storage when the user click on heart icon....
function favList(movieId,element){
    const favorites=JSON.parse(localStorage.getItem('favorites')) || [];
    if(!favorites.includes(movieId)){
        favorites.push(movieId);
        localStorage.setItem('favorites',JSON.stringify(favorites));
        element.classList.add('favorited');
    }else{
        alert('movie already in favorite movie list');
    }
};

// ..............create a function to view favorites movie on click of fav button it linked with onclick.........
function viewFavorite(){
    window.location.href='fav.html';
}



