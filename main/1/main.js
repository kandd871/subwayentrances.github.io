const entrancesContainer = document.querySelector('#entrances');
const APP_TOKEN = 'f39N75CrYIozx6K1M7VVPoRwS'; // <- Replace this with your app token
const DATASET_IDENTIFIER = 'he7q-3hwy'; // <- Replace this with the ID for the data resource that you want to look up

const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$$app_token=${APP_TOKEN}`;

// initialize parties DOM
let entrancesDOM = "<div>";

console.log(`Fetching url - ${url}`);

fetch(url)
  .then((response) => response.json())
  .then((json) => {
      console.log(json);
      json.forEach(function(entrance) {
        const firstValue = entrance.the_geom.coordinates[0]; // access coordinates array of the entrance object
        const secondValue = entrance.the_geom.coordinates[1]; // access coordinates array of the entrance object
        if (entrance.line.includes("1") && typeof entrance.name !== "undefined") {
          entrancesDOM += `
          <div class="container">
          <div>${(entrance.name)} (${entrance.line})</div>
        <div class="loco"><a href="https://www.google.com/maps/search/${secondValue},+${firstValue}">take me here</a></div>
        </div>
        `;
        }
      });
      entrancesDOM += `</div>`;
      entrancesContainer.innerHTML = entrancesDOM;
  });

