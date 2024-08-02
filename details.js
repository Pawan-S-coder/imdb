
const apiUrl =`http://www.omdbapi.com/?apikey=efe13fd8&plot=full&i=`;
// ..................create eventlister on page load if someone click on view detail this page open and 
// .................show details here from fetching movie id from local storage  ........................
document.addEventListener('DOMContentLoaded',async()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const movieId= urlParams.get('id')|| localStorage.getItem('movieId');
    const detailContainer=document.getElementById('details');
    console.log(movieId);
    if(movieId){
        const response= await fetch(apiUrl+ movieId);
        const movie= await response.json();
        console.log(movie);
        detailContainer.innerHTML=` <h1 id="movieTitle">Title:<span>${movie.Title}</span></h1>
                <span id="rating">Rating:${movie.imdbRating} </span>
                <div >
                    <span id="relieasedDate">${movie.Year}</span>
                    <span id="duration">${movie.Runtime}</span>
                    </div>
                    <div id="discription" class="discription">
                    <img src="${movie.Poster} alt="${movie.Title}"">
                    <div id="explaination">
                    <div id="storyLine"><p>Story:<span>${movie.Plot}</span></p>
                    </div>
                    <div id="otherInfo">
                                <p id="Director">Director:<span>${movie.Director}</span></p>
                                <p id="cast">Cast:<span>${movie.Actors}</span></p>
                                <p id="genre">Genre:<span>${movie.Genre}</span></p>`;
                }else{
                detailContainer.innerHTML=`<p>no movie details found</p>`;
            }
})

// .................create a go back function which go back to the privious page......
document.querySelector('#goback').addEventListener('click',()=>{
    window.history.back();
})
