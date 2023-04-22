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
      const modifiedJson = json.map((obj) => {
      const lines = obj.line.split('-');
      if (lines.length > 1 && /^\d+$/.test(lines[0]) && /^\d+$/.test(lines[1])) {
        const start = parseInt(lines[0]);
        const end = parseInt(lines[1]);
        obj.line = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      } else {
        obj.line = obj.line.replace(/-/g, ', ').split('');
      }
      return obj;
    });

    console.log(modifiedJson);

      modifiedJson.forEach(function(entrance) {


      entrance.line.sort((a, b) => {
        if (typeof a !== 'string' || typeof b !== 'string') {
          return 0;
        }
        
        const aSplit = a.split("-");
        const bSplit = b.split("-");
        for (let i = 0; i < aSplit.length; i++) {
          if (isNaN(aSplit[i])) {
            if (isNaN(bSplit[i])) {
              // Both are not numbers, so compare alphabetically
              if (aSplit[i] < bSplit[i]) {
                return -1;
              } else if (aSplit[i] > bSplit[i]) {
                return 1;
              }
            } else {
              // b is a number, so it should come first
              return 1;
            }
          } else {
            if (isNaN(bSplit[i])) {
              // a is a number, so it should come first
              return -1;
            } else {
              // Both are numbers, so compare numerically
              return aSplit[i] - bSplit[i];
            }
          }
        }
      });


        const firstValue = entrance.the_geom.coordinates[0]; // access coordinates array of the entrance object
        const secondValue = entrance.the_geom.coordinates[1]; // access coordinates array of the entrance object
        const colorMap = { "1": "#FF1E46", "2": "#FF1E46", "3": "#FF1E46", "4": "#008736", "5": "#008736", "6": "#008736", "7": "#FF00D0", "A": "#0500FF", "C": "#0500FF", "E": "#0500FF", "B": "#FF6B00", "D": "#FF6B00", "F": "#FF6B00", "M": "#FF6B00", "G": "#11E132", "L": "#B1BECB", "J": "#874100", "Z": "#874100", "N": "#FFDA16", "Q": "#FFDA16", "R": "#FFDA16", "W": "#FFDA16", "S": "#5F5A69" };

if (entrance.line.includes("1") && typeof entrance.name !== "undefined") {

  const lineDiv = document.createElement("div");

  entrance.line.forEach(function(char) {

if (char !== ',' && char !== ' ') { // check if character is not a comma or empty string
  const circle = document.createElement("div");
  circle.classList.add("lines");
  circle.textContent = char;
  circle.style.backgroundColor = colorMap[char];
  if (colorMap[char] === "#FFDA16") {
    circle.style.color = "black";
  }

   // add event listeners to circle element
  circle.addEventListener("mouseover", () => {
  circle.style.color = colorMap[char] + "!important";
  circle.style.backgroundColor = "white!important";
});

circle.addEventListener("mouseout", () => {
  circle.style.color = "white";
  circle.style.backgroundColor = colorMap[char];
});

  // create anchor tag and append line div to it
  const anchor = document.createElement("a");
  anchor.href = "../" + char + "/index.html";
  anchor.appendChild(circle);
  
  // append anchor tag to lineDiv
  lineDiv.appendChild(anchor);

  }
});


  entrancesDOM += `
  <div class="container">
  <div>${(entrance.name)}</div>
  <div class="street">${lineDiv.outerHTML}</div>
  <div class="loco"><a target="_blank" href="https://www.google.com/maps/search/${secondValue},+${firstValue}">take me here</a></div>
  </div>
  `;
}


      });
      entrancesDOM += `</div>`;
      entrancesContainer.innerHTML = entrancesDOM;



  });


