const moviesEl = document.getElementById('movies')
const searchbarBtn = document.getElementById('searchbar-btn')
const searchbarInput = document.getElementById('searchbar-input')
let moviesHtml = ''

searchbarBtn.addEventListener('click', handleClick)

// get search results from api call 
async function handleClick(e) {
  e.preventDefault()

  if (!searchbarInput.value) {
    return false
  } else {
    const searchQuery = searchbarInput.value.replace(/\s/g, "+")
    const response = await fetch(`https://www.omdbapi.com/?apikey=d30c0673&s=${searchQuery}`)
    const searchData = await response.json()
  
    if (searchData.Search) {
      getMovieData(searchData.Search)
    } else {
      console.log(searchData)
      displayNoData()
    }  
  }
}

// get movie data for each movie
async function getMovieData(moviesList) {
  moviesHtml = ''

  for (let movie of moviesList) {
    await displayMovieCards(movie)
  }
  render()
}

// display movie cards from data 
async function displayMovieCards(movieData) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=d30c0673&i=${movieData.imdbID}`)
  const movie = await response.json()

  let movieRating = ''
  if (movie.Ratings[0]) {
    movieRating = movie.Ratings[0].Value.substring(
      0, movie.Ratings[0].Value.length - 3
    )
  }

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

// display no data function
function displayNoData() {
  moviesEl.innerHTML = `
    <div class="no-data">
      <p class="no-data-text">
        Unable to find what you’re looking for. Please try another search.
      </p>
    </div>
  `
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
  have to use async here because I need to use await before calling getMovieCards() so it gets each movie synchronously (previously it would do it async and it would load each movie in a different random order whereas we want it in the same order each time someone searches for that exact same result)

lines 12, async function handleClick() {}
  if evaluated the false statement 1st instead of last because it seems to make the API call much faster this way. not sure why. i.e. i've done if (!searchbarInput.value){...} instead of if (searchbarInput.value) {...}

*/ 