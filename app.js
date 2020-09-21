const active = document.querySelector(".active");
const confirmed = document.querySelector(".confirmed");
const deaths = document.querySelector(".deaths");
const date = document.querySelector(".date");

function getCovidStats() {
  fetch("https://api.covid19api.com/live/country/canada")
    .then(res => res.json())
    .then(data => {
      let bcStats = data.filter(prov => prov.Province === "British Columbia");
      console.log(bcStats);
    })
    .catch(err => console.log("error!"));
}

getCovidStats();
