const catalogs = document.querySelector(".catalogs");
const loader = document.querySelector(".loader");

let dataArray = [];

window.addEventListener('storage', (event) => {
      let updatedData = JSON.parse(event.newValue);
      console.log(updatedData); // Updated data from the first window
  });
