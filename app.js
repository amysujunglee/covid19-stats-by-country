const totalActive = document.querySelector(".total-active");
const totalConfirmed = document.querySelector(".total-confirmed");
const totalDeaths = document.querySelector(".total-deaths");
const lastUpdated = document.querySelector(".date");

function getCovidStats() {
  fetch("https://api.covid19api.com/total/dayone/country/canada")
    .then(res => res.json())
    .then(data => {
      // const bcStats = data.filter(
      //   prov => prov.Province === "British Columbia" && prov.Active
      // );
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

getCovidStats();
