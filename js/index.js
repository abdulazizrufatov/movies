const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".select");

elResult.textContent = films.length;

const renderMovies = function (filmsArr, htmlElement) {
  filmsArr.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    newButton.setAttribute("class", "btn btn-danger");
    newButton.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${movie.youtubeId}`
    );

    newTitle.textContent = movie.title;
    // newLanguage.textContent = movie.overview;
    newYear.textContent = movie.year;
    newButton.textContent = "Watch Trailer";

    const genresList = document.createElement("ul");

    movie.genres.forEach((genre) => {
      const genresItem = document.createElement("li");

      genresItem.textContent = genre;

      genresList.appendChild(genresItem);
    });

    //APPEND
    htmlElement.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    // newDiv.appendChild(newLanguage);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newButton);
    newDiv.appendChild(genresList);
  });
};

renderMovies(films, elMovieList);

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  elMovieList.innerHTML = null;
  const selectedGenre = elSelect.value;

  const selectFilms = [];

  films.forEach((film) => {
    if (selectedGenre === "All" || film.genres.includes(selectedGenre)) {
      selectFilms.push(film);
    }
  });
  renderMovies(selectFilms, elMovieList);
});
