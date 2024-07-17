async function fetchData(){
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ffc4f82c09mshd7567fc57d36383p1828f9jsn7ec1d6f67b25',
		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};
try {
        const response = await fetch(url, options);
        result = await response.json();
        // console.log(result);
        searchedMovies(result);
        // return result;
    } catch (error) {
        console.error(error);
    }

}

fetchData();
function searchedMovies(result){
    const inputEl=document.getElementById('searchInput').value;
    // console.log(inputEl);
    const filteredMovies=result.filter(movie=>movie.title.toLowerCase().includes(inputEl.toLowerCase()));
    console.log(filteredMovies);
    if(filteredMovies.length){
        const container=document.getElementById('movieContainer');
        container.innerHTML='';
        renderMovie(filteredMovies);
    }else{
        document.getElementById('movieContainer').innerHTML=`<p id="noResult" >No Result Found </p>`;
    }

}
function createMovieEl(movie){
    const movieEl=document.createElement('div');
    movieEl.classList.add('movieCard');
    movieEl.innerHTML=`<img src="${movie.image}"/> <h2>${movie.title}(${movie.year})</h2><button id="addToFav" type="button"><i class="fa-regular fa-heart"></i></button><button id="viewDetails" type="button">viewDetails</button>`;
    return movieEl;
}
function renderMovie(movies){
    const container=document.getElementById('movieContainer');
    movies.forEach(movie => {
    const movieDiv=createMovieEl(movie);
    container.appendChild(movieDiv);
});
}