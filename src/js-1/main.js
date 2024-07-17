// Lord of the ring API

window.addEventListener("DOMContentLoaded", () => {
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer YrppuJTXrvmMiZrNoPtA",
  };
  const API_URL = "https://the-one-api.dev/v2/book";
  const IMG_PATH = "https://dog.ceo/api/breeds/image/random";

  const form = document.getElementById("form");

  const searchInput = document.getElementById("search");
  const movieImg = document.querySelectorAll(".movie img");

  const getImg = async () => {
    const res = await fetch(IMG_PATH);
    const data = await res.json();
    return data.message;
  };

  movieImg.forEach((i) => {
    const getResults = async () => {
      const srcImg = await getImg();
      i.src = srcImg;
    };
    getResults();
  });

  //Get initial movies

  const getMovies = async (url) => {
    const rowMovies = await fetch(url, {
      headers: headers,
    });
    const movies = await rowMovies.json();

    console.log(movies.docs);
  };

  getMovies(API_URL);

  // Вставьте свой API ключ  (получите на https://the-one-api.dev/)
  const apiKey = "YrppuJTXrvmMiZrNoPtA";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const query = searchInput.value;
    searchMovie(query);
  });

  function searchMovie(query) {
    const newUrl = `https://the-one-api.dev/v2/book?name=${encodeURIComponent(
      query
    )}`;
    fetch(newUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.docs);
        console.log(newUrl);
        displayResults(data.docs);
      })
      .catch((error) => console.error("Error:", error));
  }

  function displayResults(movies) {
    // const resultsDiv = document.getElementById("results");
    // resultsDiv.innerHTML = "";
    // if (movies.length === 0) {
    //   resultsDiv.textContent = "No movies found.";
    //   return;
    // }
    // movies.forEach((movie) => {
    //   const movieDiv = document.createElement("div");
    //   movieDiv.innerHTML = `
    //   <h2>${movie.name}</h2>
    //   <p>ID: ${movie._id}</p>
    //   <p>Runtime: ${movie.runtimeInMinutes} mins</p>
    //   <p>Budget: ${movie.budgetInMillions} million</p>
    //   <p>Revenue: ${movie.boxOfficeRevenueInMillions} million</p>
    // `;
    //   resultsDiv.appendChild(movieDiv);
    // });
  }
});
