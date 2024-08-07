'use-strict'
const catalogs = document.querySelector(".catalogs");
const genreList = document.querySelectorAll(".genre-heading");
const loader = document.querySelector(".loader");
const myListAdderButton = document.querySelectorAll(".addtoList");

// Function to delay execution for a specified number of milliseconds
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAnimeData(id) {
  const apiUrl = `https://api.jikan.moe/v4/anime/${id}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const res = await response.json();

    return res.data;
  } catch (error) {
    console.error('Error:', error);
  }
}
async function renderData(data) {
  console.log(data);
  const name = data.title_english;
  if (!name) {
    name = data.title;
  }

  let anime_end = data.aired.to;
  if (anime_end) {
    anime_end = anime_end.slice(0, 4);
  } else {
    anime_end = "present";
  }
  const duration = data.aired.from.slice(0, 4) + "-" + anime_end;

  const genreArray = data.genres;
  let genre = "";
  genreArray.forEach(element => {
    genre += element.name + ", ";
  });
  console.log(genre);
  const image_url = data.images.jpg.image_url;
  const synopsis = data.synopsis;
  const rating = data.score;
  let members = data.members;
  if (members >= 1000000) {
    members = Math.trunc(members / 1000000) + "M";
  } else {
    members = Math.trunc(members / 1000) + "K";
  }
  const html = `<div class="box">
                <div class="head">
                  <h3 id="name">${name}</h3>
                  <p id="time">${duration}</p>
                </div>
                <div id="genre">${genre}</div>
                <div class="flex-con">
                    <div class="ll dir">
                        <div class="box-img">
                            <img src="${image_url}" alt="">
                        </div>
                    </div>
                    <div class="rr dir">${synopsis}</div>
                </div>

                <div class="box-footer">
                    <i class="fa-regular fa-star">${rating}</i> 
                    <i class="fa-solid fa-user">${members}</i>
                    <button class="btn addtoList" data = ${data} id = ${id}>Add to MyList</button>
                </div>  
            </div>`;
  catalogs.insertAdjacentHTML("beforeend", html);
}

myListAdderButton.forEach(element=>{
  element.addEventListener('click', function () {
      let id = this.getAttribute('id');
      let data = this.getAttribute('data');
      localStorage.setItem(id, data);
  });
});

let currentGenreElement = null;

async function displayAnimes(event) {
  const element = event.currentTarget;
  if(element == currentGenreElement)
    return;
  catalogs.innerHTML = '';
  loader.classList.remove("hidden");
  if (currentGenreElement) {
    currentGenreElement.classList.remove("on-click");
  }
  currentGenreElement = element;
  currentGenreElement.classList.add("on-click");

  let genre_indice = Number(element.getAttribute("index"));

  // Fetch the array of anime IDs for the selected genre
  const arr = dummy[genre_indice];
  if (!arr) {
    console.error(`No anime found for genre: ${genre_indice}`);
    return;
  }
  const delayBetweenRequests = 100;
  let ajaxContent = [];
  //Data Collection and Rendering
  while (ajaxContent.length < 12) {
    let num = Math.floor(Math.random() * 200);
    let id = arr[num];
    let data = await fetchAnimeData(id);
    if (data) {
      ajaxContent.push(data);
      renderData(data);
    }
    await delay(delayBetweenRequests);
  }
  loader.classList.add("hidden");
}

genreList.forEach(element => {
  element.addEventListener("click", displayAnimes, );
});