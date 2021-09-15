import "babel-polyfill";
import "bootstrap/dist/css/bootstrap.min.css";

const movieInput = document.querySelector("input");
const form = document.querySelector("form");
const movieContainer = document.querySelector("#movie");
const container = document.querySelector(".container");

// UI

function renderMovie(movie) {
  const movieDiv = document.createElement("div");

  const actors = movie.Actors.split(",");
  movieDiv.innerHTML = `
  
      <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3  text-center">
              <h3>${movie.Title}</h3>
                <img class="img-fluid mb-1" src=${movie.Poster}>
            </div>

            <div class="col-md-9">

            <span class="badge bg-info mt-5 p-2 mx-1"> ${actors[0]}</span>
            <span class="badge bg-secondary p-2 mx-1"> ${actors[1]} </span>
            <span class="badge bg-success p-2 mx-1">${actors[2]} </span>
            
             <br><br>

             <ul class="list-group mt-3">
             <li class="list-group-item"><b>Description:</b> ${movie.Plot}</li>
             <li class="list-group-item"><b>Genre:</b> ${movie.Genre}</li>
             <li class="list-group-item"><b>Duration:</b> ${movie.Runtime}</li>
             <li class="list-group-item"><b>Awards:</b> ${movie.Awards}</li>
             <li class="list-group-item"><b>Release from:  </b> ${movie.Released}</li>
             <li class="list-group-item"><b>Language:</b> ${movie.Language}</li>
             <li class="list-group-item"><b>Writer:</b> ${movie.Writer}</li>
             <li class="list-group-item"><b>Revenue:</b> ${movie.BoxOffice}</li>
             <li class="list-group-item"><b>Rating:</b> ${movie.imdbRating}</li>
             </ul>

            </div>
        </div>
    </div>
  `;

  movieContainer.appendChild(movieDiv);
}

function renderAlert(message, className) {
  // create div
  const alertDiv = document.createElement("div");

  // add class

  alertDiv.className = className;

  // add text

  alertDiv.innerHTML = `
            <span>${message}</span>
  
  `;

  movieContainer.appendChild(alertDiv);
}

// function for fetching data using ID

const searchMovieID = async (id) => {
  // getting single movie using movie id (i =)
  const response = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=43dc7138`
  );
  const data = await response.json();

  console.log(data);

  renderMovie(data); // to render the object
};

//searchMovieID("tt0499549");

// getting a list of movie according to the search word as example (s = batman)
function searchMovieStr(str) {
  fetch(`https://www.omdbapi.com/?s=${str}&apikey=43dc7138`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.Search)
        renderAlert(
          "Please insert correct name",
          "text-center alert alert-danger"
        );
      console.log(data.Search),
        data.Search.forEach((item) => {
          searchMovieID(item.imdbID);
        });
    })
    .catch((err) => console.log("something went wrong")); // array of object containing imdbID
}

// adding event

form.addEventListener("submit", (e) => {
  e.preventDefault();

  movieContainer.innerHTML = "";
  searchMovieStr(movieInput.value);
});
