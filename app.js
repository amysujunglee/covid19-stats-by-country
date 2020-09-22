const totalActive = document.querySelector(".total-active");
const totalConfirmed = document.querySelector(".total-confirmed");
const totalDeaths = document.querySelector(".total-deaths");
const lastUpdated = document.querySelector(".date");
const bcNewCases = document.querySelector(".bc-newcases");

function getCovidStats() {
  fetch("https://api.covid19api.com/total/dayone/country/canada")
    .then(res => res.json())
    .then(data => {
      const totalStats = data[data.length - 1];
      totalActive.innerHTML = totalStats.Active.toLocaleString("en");
      totalConfirmed.innerHTML = totalStats.Confirmed.toLocaleString("en");
      totalDeaths.innerHTML = totalStats.Deaths.toLocaleString("en");
      lastUpdated.innerHTML = totalStats.Date.slice(0, 10);

      console.log(totalStats);

      // data.map(function(item) {
      //   if (item.Province === "British Columbia") {
      //     active.innerHTML = item.Active;
      //     confirmed.innerHTML = item.Confirmed;
      //     deaths.innerHTML = item.Deaths;
      //     date.innerHTML = item.Date;
      //     console.log(item.Date);
      //   }
      // });
    })
    .catch(err => console.log("error!"));
}

function getBcNewCases() {
  fetch(
    "https://api.covid19api.com/dayone/country/canada/status/confirmed/live"
  )
    .then(res => res.json())
    .then(data => {
      //BC New Cases
      const bcStats = data.filter(item => item.Province === "British Columbia");
      const latestBcStats = bcStats[bcStats.length - 1];
      const secondBcStats = bcStats[bcStats.length - 2];
      const newCases = latestBcStats.Cases - secondBcStats.Cases;

      console.log(latestBcStats, secondBcStats);

      bcNewCases.innerHTML = newCases;
    });
}

getCovidStats();
getBcNewCases();
