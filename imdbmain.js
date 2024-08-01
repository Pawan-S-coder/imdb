const inputEl=document.getElementById('searchInput');
const movieContainer=document.getElementById('movieContainer');
inputEl.addEventListener('keypress',async(e)=>{
    if(e.key==='Enter'){
        renderMovieResult(inputEl.value);
        inputEl.value='';
}
});

async function renderMovieResult(value){
    const  response= await fetch(`http://www.omdbapi.com/?apikey=efe13fd8&s=${value}`);
    const data=await response.json();
    // console.log(data.Search);
    if(data.Response==="True" && data.Search.length>0){

        movieContainer.innerHTML='';
        data.Search.forEach((movie)=>{
            const movieEl=document.createElement('div');
            movieEl.classList.add('movieCard');
            movieEl.innerHTML=`<img src="${movie.Poster}" alt="${movie.Title}"/>
            <h2>${movie.Title}(${movie.Year})</h2>
            <button id="addToFav"class="addToFav" type="button"onclick="favList('${movie.imdbID}',this)"><i class="fa-regular fa-heart"></i>
            </button><a href="details.html?id=${movie.imdbID}" id="viewDetails"  onclick="movieDetails('${movie.imdbID}')">details</a>`;

            movieContainer.appendChild(movieEl);
            });
           
        }else{ document.getElementById('movieContainer').innerHTML=`<p id="noResult" >No Result Found... </p>`;
    }

}
document.addEventListener('DOMContentLoaded',renderMovieResult());

document.getElementById('searchInputBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    renderMovieResult(inputEl.value);
    inputEl.value='';
   })



    function movieDetails(movieId){
        console.log(movieId);
        localStorage.setItem('movieId',movieId);
}
  



 function favList(movieId,element){
    const favorites=JSON.parse(localStorage.getItem('favorites')) || [];
    if(!favorites.includes(movieId)){
        favorites.push(movieId);
        localStorage.setItem('favorites',JSON.stringify(favorites));
        element.classList.add('favourate');
       

    }else{
       alert('movie already in favourate movie list');
    }

 };
function viewFavorate(){
    window.location.href='fav.html';
 }



