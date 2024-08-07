const catalogs = document.querySelector(".catalogs");
const loader = document.querySelector(".loader");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getserver (){
  const res = await fetch ('http://localhost/5000/info ',{
    method: 'GET' 
  });
  console.log(res);
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

async function renderData(data, id) {
  console.log(data);
  let name = data.title_english || data.title;
  
  let anime_end = data.aired.to ? data.aired.to.slice(0, 4) : "present";
  const duration = data.aired.from.slice(0, 4) + "-" + anime_end;
  
  const genre = data.genres.map(g => g.name).join(", ");
  console.log(genre);
  const image_url = data.images.jpg.image_url;
  const synopsis = data.synopsis;
  const rating = data.score;
  let members = data.members >= 1000000 ? Math.trunc(data.members / 1000000) + "M" : Math.trunc(data.members / 1000) + "K";
  let jsonData = JSON.stringify(data);
  const html = `<div class="box">
                <div class = "head">
                <h3 id="name">${name}</h3>
                <p id="time">${duration}</p>
                </div>
                <div id="genre">${genre}</div>
                <div class= "flex-con">
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
                    <button class="btn addtoList" data-anime='${jsonData}' id="${id}">Add to MyList</button>
                </div>  
            </div>`;
  catalogs.insertAdjacentHTML("beforeend", html);

  const myListAdderButton = document.getElementById(`${id}`);
  myListAdderButton.addEventListener('click', async function () {
    console.log("button clicked");
  });
}

async function fetchAnimeList() {
  const delayBetweenRequests = 200; // milliseconds
  const arr = homePage;      // from Script_database
  
  let ajaxContent = [];
  // Data Collection and Rendering
  while (ajaxContent.length < 12) {
    let num = Math.floor(Math.random() * 100);
    let id = arr[num];
    let data = await fetchAnimeData(id);
    if (data) {
      ajaxContent.push(data);
      renderData(data, id);
    }
    await delay(delayBetweenRequests);
  }
  loader.classList.add("hidden");
}

// Start fetching anime data
fetchAnimeList();
getserver();