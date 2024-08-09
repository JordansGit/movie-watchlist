const moviesEl = document.getElementById('movies')
const searchbarBtn = document.getElementById('searchbar-btn')
const searchbarInput = document.getElementById('searchbar-btn')
let moviesHtml = ''

// async function handleClick(){}
// get search results from api call 
fetch("http://www.omdbapi.com/?apikey=d30c0673&s=blade+runner")
  .then(response => response.json())
  .then(searchData => {
    getMovieData(searchData.Search)
  })

// get movie data for each movie
async function getMovieData(moviesList) {
  for (let movie of moviesList) {
    await displayMovieCards(movie)
  }
  render()
}

// display movie cards from data 
async function displayMovieCards(movieData) {
  const response = await fetch(`http://www.omdbapi.com/?apikey=d30c0673&i=${movieData.imdbID}`)
  const movie = await response.json()

  let movieRating = movie.Ratings[0].Value.substring(
    0, movie.Ratings[0].Value.length - 3
  )

  moviesHtml += `
    <article class="movie-card">
      <img class="movie-img" src=${movie.Poster}>
      <div class="movie-text">
        <div class="movie-text-header">
          <h2 class="movie-title">${movie.Title}</h2>
          <i class="fa-solid fa-star fa-xs star"></i>
          <p class="movie-rating">${movieRating}</p>
        </div>
        <div class="movie-text-info">
          <p class="movie-time">${movie.Runtime}</p>
          <p class="movie-genre">${movie.Genre}</p>
          <button class="movie-add-to-watchlist-btn">
            <i class="fa-solid fa-circle-plus fa-lg plus-btn"></i>
            Watchlist
          </button>
        </div>
        <p class="movie-description">${movie.Plot}</p>
      </div>
    </article>
  `
}

// render dynamic html onto screen 
function render() {
  moviesEl.innerHTML = moviesHtml
}


/* 
API Key: d30c0673


To Do: 
  fetch data w/ search result blade runner. 
    style movie cards 

  search btn submit 
    style page for no data found. 

  add to watchlist btn 
  watchlist page 
  remove from watchlist btn 
*/


/* Learning Notes: 
lines 13-18 async function getMovieData() {}
  forEach() doesn't work to make the fetch calls inside loop synchronous. idk why. but it works with for loop, doesn't work with forEach(). 
  have to use async here because I need to use await before calling getMovieCards() so it gets each synchronously (previously it would do it async and it would load each movie in a different random order whereas we want it in the same order each time someone searches for that exact same result)

*/ 