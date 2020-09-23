const globalLastUpdated = document.querySelector(".global-date");
const totalConfirmed = document.querySelector(".total-confirmed");
const totalDeaths = document.querySelector(".total-deaths");
const totalRecovered = document.querySelector(".total-recovered");
const newConfirmed = document.querySelector(".new-confirmed");
const newDeaths = document.querySelector(".new-deaths");
const newRecovered = document.querySelector(".new-recovered");

const caLastUpdated = document.querySelector(".ca-date");
const caActive = document.querySelector(".ca-active");
const caConfirmed = document.querySelector(".ca-confirmed");
const caDeaths = document.querySelector(".ca-deaths");

const bcNewCases = document.querySelector(".bc-newcases");

// total and new stats in global
function getCovidStatsGlobal() {
  fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(data => {
      console.log(data.Global);
      globalLastUpdated.innerHTML = data.Date.slice(0, 10);
      totalConfirmed.innerHTML = data.Global.TotalConfirmed.toLocaleString(
        "en"
      );
      totalDeaths.innerHTML = data.Global.TotalDeaths.toLocaleString("en");
      totalRecovered.innerHTML = data.Global.TotalRecovered.toLocaleString(
        "en"
      );
      newConfirmed.innerHTML = data.Global.NewConfirmed.toLocaleString("en");
      newDeaths.innerHTML = data.Global.NewDeaths.toLocaleString("en");
      newRecovered.innerHTML = data.Global.NewRecovered.toLocaleString("en");
    })

    .catch(err => console.log("error in Global!"));
}

// total stats in Canada
function getCovidStatsCanada() {
  fetch("https://api.covid19api.com/total/dayone/country/canada")
    .then(res => res.json())
    .then(data => {
      const caTotalStats = data[data.length - 1];

      caLastUpdated.innerHTML = caTotalStats.Date.slice(0, 10);
      caActive.innerHTML = caTotalStats.Active.toLocaleString("en");
      caConfirmed.innerHTML = caTotalStats.Confirmed.toLocaleString("en");
      caDeaths.innerHTML = caTotalStats.Deaths.toLocaleString("en");

      console.log(caTotalStats);
    })
    .catch(err => console.log("error in Canada!"));
}

//BC new cases
function getBcNewCases() {
  fetch(
    "https://api.covid19api.com/dayone/country/canada/status/confirmed/live"
  )
    .then(res => res.json())
    .then(data => {
      const bcStats = data.filter(item => item.Province === "British Columbia");

      const latestBcStats = bcStats[bcStats.length - 1];
      const secondBcStats = bcStats[bcStats.length - 2];
      const newCases = latestBcStats.Cases - secondBcStats.Cases;

      console.log(bcStats);

      bcNewCases.innerHTML = newCases;
    });
}

getCovidStatsGlobal();
getCovidStatsCanada();
getBcNewCases();

//copyright year
const copyrightDate = document.getElementById("copyright-date");
copyrightDate.innerHTML = new Date().getFullYear();
