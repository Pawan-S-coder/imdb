const apiUrl =`http://www.omdbapi.com/?apikey=efe13fd8&i=`;

// ....added event listener onpage load get id from local storage and render result of favorites movies......
document.addEventListener('DOMContentLoaded',async()=>{
    const favorites=JSON.parse(localStorage.getItem('favorites'))|| [];
    const container=document.getElementById('favourateMovies');
    if(favorites.length===0){
        container.innerHTML=`<h1 id="noResult">No Favorate Movie added.....</h1>`;

    }else{
        for(let movieId of favorites){
            const response=await fetch(apiUrl+movieId);
            const movie=await response.json();
            // console.log(movie);
            const movieEl=document.createElement('div');
            movieEl.classList.add('movieCard');
            movieEl.innerHTML=`<img src="${movie.Poster}" alt="${movie.Title}"/>
            <h2>${movie.Title}(${movie.Year})</h2>
            <button id="remover" type="button"onclick="removeFromFavorites('${movie.imdbID}',this)">Remove
            </button><a href="details.html?id=${movie.imdbID}" id="viewDetails"  onclick="movieDetails('${movie.imdbID}')">details</a>`;

            container.appendChild(movieEl);

        }
    }
});

// ...........remove from favorites list function will remove the movie from favorites list....
function removeFromFavorites(movieId,element){
    let favorites=JSON.parse(localStorage.getItem('favorites'))|| [];
    favorites=favorites.filter( id => id !== movieId);
    localStorage.setItem('favorites',JSON.stringify(favorites));
    element.classList.add('.fa-regular');
    location.reload();
}
// ...........go back function will go back to the privious page on click of go back button...................
function goToSearch(){
    window.history.back();
}