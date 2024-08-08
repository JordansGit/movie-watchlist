const moviesEl = document.getElementById('movies')
const searchbarBtn = document.getElementById('searchbar-btn')
const searchbarInput = document.getElementById('searchbar-btn')

// fetch("http://www.omdbapi.com/?apikey=d30c0673&s=blade+runner")
//   .then(response => response.json())
//   .then(data => {
//     getMovieCards(data.Search)
//   })
""
fetch("http://www.omdbapi.com/?apikey=d30c0673&i=tt0083658")
  .then(response => response.json())
  .then(data => {
    getMovieCards(data)
  })

function getMovieCards(movie) {
  console.log(movie)

  let moviesHtml = ''

  // movieData.forEach(movie => {
    let movieRating = movie.Ratings[0].Value.substring(
      0, movie.Ratings[0].Value.length - 3
    )

    moviesHtml += `
      <article class="movie-card">
        <img class="movie-img" src=${movie.Poster}>
        <div class="movie-text">
          <h2 class="movie-title">${movie.Title}</h2>
          <i class="fa-solid fa-star fa-xs star"></i>
          <p class="movie-rating">${movieRating}</p>
          <p class="movie-time">${movie.Runtime}</p>
          <p class="movie-genre">${movie.Genre}</p>
          <button class="movie-add-to-watchlist">
            <i class="fa-solid fa-circle-plus plus-btn"></i>
            Watchlist
          </button>
          <p class="movie-description">${movie.Plot}</p>
        </div>
      </article>
    `
  // })
  moviesEl.innerHTML = moviesHtml
}
console.log(moviesEl)


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