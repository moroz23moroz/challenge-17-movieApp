window.addEventListener("DOMContentLoaded", () => {
  // const API_URL_MOKKY = "https://bbcd429717abd755.mokky.dev/popular";
  const API_URL_MOKK =
    "https://669728d102f3150fb66cc63f.mockapi.io/moroz/v1/movie";
  const IMG_PATH = "https://dog.ceo/api/breeds/image/random";
  // const SEARCH_API = "/title?query=";

  const main = document.getElementById("main");
  const form = document.getElementById("form");

  const search = document.getElementById("search");

  async function getImg(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.message;
  }

  //Get initial movies простая версия функции

  // const getMovies = async (url) => {
  //   const res = await fetch(url);
  //   const movies = await res.json();

  //   showMovies(movies);
  // };

  //версия функции с проверкой на json

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const dataMovies = await res.json();
        showMovies(dataMovies);
      } else {
        console.log("Response is not JSON, handling non-JSON response");
        // Обработка не JSON-ответа здесь
      }
    } catch (error) {
      console.error("Error fetching the movie:", error);
    }
  };

  getMovies(API_URL_MOKK);

  function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
      async function getResult() {
        const { title, rating, description } = movie;
        const srcImg = await getImg(IMG_PATH);

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${srcImg}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(rating)}">${rating}</span>
        </div>
        <div class="overview">
          <div class="inner">
          <h3>Описание:</h3>
          ${description}
          </div>
        </div>
      
  `;
        main.appendChild(movieEl);
      }
      getResult();
    });
  }

  function getClassByRate(rating) {
    if (rating >= 8) {
      return "green";
    } else if (rating >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== "") {
      const urlSearch = new URL(API_URL_MOKK);
      urlSearch.searchParams.append("title", searchTerm);

      // const urlSearch = new URL(API_URL_MOKKY + SEARCH_API + searchTerm + "*");

      // fetch(urlSearch, {
      //   method: "GET",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // })
      //   .then((res) => {
      //     if (res.ok) {
      //       return res.json();
      //     }
      //     console.log("error res.json");
      //   })
      //   .then((movies) => {
      //     console.log(movies);
      //   })
      //   .catch((error) => console.error("Error:", error));

      getMovies(urlSearch);

      search.value = "";
    } else {
      console.log("Нет такого аниме");
    }
  });
});
