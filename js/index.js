const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".select");
const bookmarkList = document.querySelector(".bookmark-list");
const localDeta = JSON.parse(window.localStorage.getItem("bookmark"));

elResult.textContent = films.length;

const bookmarks = localDeta || [];

bookmarkList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark-delete-btn")) {
    const bookmarkDeleteId = evt.target.dataset.bookmarkDeleteId;
    const foundBookmarkIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === bookmarkDeleteId
    );

    bookmarks.splice(foundBookmarkIndex, 1);

    window.localStorage.setItem("bookmark", JSON.stringify(bookmarks));

    if (bookmarks.length === 0) {
      window.localStorage.removeItem("bookmark");
    }
    bookmarkList.innerHTML = null;

    renderBookmarks(bookmarks, bookmarkList);
  }
});

const renderBookmarks = function (arr, htmlElement) {
  arr.forEach((bookmark) => {
    const newItem = document.createElement("li");
    const newDeleteBtn = document.createElement("button");

    // ATTRIBUTES:
    newItem.textContent = bookmark.title;
    newDeleteBtn.textContent = "Delete";
    newDeleteBtn.setAttribute(
      "class",
      "bookmark-delete-btn btn btn-danger ms-3"
    );

    //DATASET:
    newDeleteBtn.dataset.bookmarkDeleteId = bookmark.id;

    window.localStorage.setItem("bookmark", JSON.stringify(bookmarks));

    htmlElement.appendChild(newItem);
    newItem.appendChild(newDeleteBtn);
  });
};
renderBookmarks(bookmarks, bookmarkList);
elMovieList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark-btn")) {
    const bookmarkId = evt.target.dataset.bookmarkBtnId;
    const foundBookmark = films.find((film) => film.id === bookmarkId);

    if (!bookmarks.includes(foundBookmark)) {
      bookmarks.push(foundBookmark);
    }

    bookmarkList.innerHTML = null;

    renderBookmarks(bookmarks, bookmarkList);
  }
});

const renderMovies = function (filmsArr, htmlElement) {
  filmsArr.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const bookmarkBtn = document.createElement("button");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    bookmarkBtn.setAttribute("class", " bookmark-btn btn btn-primary mt-3");

    bookmarkBtn.dataset.bookmarkBtnId = movie.id;

    newTitle.textContent = movie.title;
    // newLanguage.textContent = movie.overview;
    newYear.textContent = movie.year;
    bookmarkBtn.textContent = "bookmark";

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
    newDiv.appendChild(genresList);
    newDiv.appendChild(bookmarkBtn);
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
