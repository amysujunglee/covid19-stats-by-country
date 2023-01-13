const globalStats = document.querySelector(".global-stats");
const bcNewCases = document.querySelector(".bc-newcases");
const canadaStats = document.querySelector(".canada-stats");

// total and new stats in global
function getCovidStatsGlobal() {
  const url = 'https://api.covid19api.com/summary';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const globalData = data.Global;
      globalStats.innerHTML = `
      <p class="mb-4">
        Last Updated: <span class="font-weight-bold">${data.Date.slice(0,10)}</span>
      </p>
      <div class="row mb-5">
          <div class="col-4 col-lg-2 mb-3 mb-lg-0">
            <div class="card">
              <div class="card-body">
                <p class="mb-2">Total Confirmed</p>
                <p class="font-weight-bold mb-0">${globalData.TotalConfirmed.toLocaleString("en")}</p>
              </div>
            </div>
          </div>
          <div class="col-4 col-lg-2">
            <div class="card">
              <div class="card-body">
                <p class="mb-2">Total Deaths</p>
                <p class="font-weight-bold mb-0">${globalData.TotalDeaths.toLocaleString(
                  "en"
                )}</p>
              </div>
            </div>
          </div>
          <div class="col-4 col-lg-2">
            <div class="card">
              <div class="card-body">
                <p class="mb-2">Total Recovered</p>
                <p class="font-weight-bold mb-0">${globalData.TotalRecovered.toLocaleString(
                  "en"
                )}</p>
              </div>
            </div>
          </div>
          <div class="col-4 col-lg-2">
            <div class="card">
              <div class="card-body">
                <p class="mb-2">New Confirmed</p>
                <p class="font-weight-bold mb-0">${globalData.NewConfirmed.toLocaleString(
                  "en"
                )}</p>
              </div>
            </div>
          </div>
          <div class="col-4 col-lg-2">
            <div class="card">
              <div class="card-body">
                <p class="mb-2">New Deaths</p>
                <p class="font-weight-bold mb-0">${globalData.NewDeaths.toLocaleString(
                  "en"
                )}</p>
              </div>
            </div>
          </div>
          <div class="col-4 col-lg-2">
            <div class="card">
              <div class="card-body">
                <p class="mb-2">New Recovered</p>
                <p class="font-weight-bold mb-0">${globalData.NewRecovered.toLocaleString(
                  "en"
                )}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    })
    .catch(err => console.log("error in Global stats!"));
}

// total stats in Canada
function getCovidStatsCanada() {
  const url = 'https://api.covid19api.com/total/dayone/country/canada';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const caTotalStats = data[data.length - 1];
      canadaStats.innerHTML = `
      <p class="mb-4">
        Last Updated: <span class="font-weight-bold">${caTotalStats.Date.slice(
          0,
          10
        )}</span>
      </p>
      <div class="row mb-5">
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <p class="mb-2">Total Active</p>
              <p class="font-weight-bold mb-0">${caTotalStats.Active.toLocaleString(
                "en"
              )}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card my-3 my-md-0">
            <div class="card-body">
              <p class="mb-2">Total Confirmed</p>
              <p class="font-weight-bold mb-0">${caTotalStats.Confirmed.toLocaleString(
                "en"
              )}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <p class="mb-2">Total Deaths</p>
              <p class="font-weight-bold mb-0">${caTotalStats.Deaths.toLocaleString(
                "en"
              )}</p>
            </div>
          </div>
        </div>
      </div>`;
    })
    .catch(err => console.log("error in Canada stats!"));
}

//BC new cases
function getBcNewCases() {
  const url = 'https://api.covid19api.com/dayone/country/canada/status/confirmed/live';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const bcStats = data.filter(item => item.Province === "British Columbia");
      const latestBcStats = bcStats[bcStats.length - 1];
      const secondBcStats = bcStats[bcStats.length - 2];
      const newCases = latestBcStats.Cases - secondBcStats.Cases;
      bcNewCases.innerHTML = `<h2 class="h4">
      British Columbia New Cases: ${newCases.toLocaleString("en")}</h2>`;
    })
    .catch(err => console.log("error in BC stats!"));
}

getCovidStatsGlobal();
getCovidStatsCanada();
getBcNewCases();

//copyright year
const copyrightDate = document.getElementById("copyright-date");
copyrightDate.innerHTML = new Date().getFullYear();