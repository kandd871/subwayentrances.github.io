const entrancesContainer = document.querySelector('#entrances');
const APP_TOKEN = 'f39N75CrYIozx6K1M7VVPoRwS'; // <- Replace this with your app token
const DATASET_IDENTIFIER = 'he7q-3hwy'; // <- Replace this with the ID for the data resource that you want to look up
const filters = document.querySelector(".filters");
const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$$app_token=${APP_TOKEN}`;

// initialize parties DOM
let entrancesDOM = "<div>";
let uniqueEntranceNames = [];

console.log(`Fetching url - ${url}`);

fetch(url)
  .then((response) => response.json())
  .then((json) => {

      console.log(json);


  const trains = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "B", "D", "F", "M", "G", "L", "J", "Z", "N", "Q", "R", "W", "S"];
  const color = ["#B1BECB","#0500FF", "#FF6B00", "#FFDA16", "#874100", "#5F5A69", "#FF1E46", "#008736", "#FF00D0"];
  const colorMap = { "1": "#FF1E46", "2": "#FF1E46", "3": "#FF1E46", "4": "#008736", "5": "#008736", "6": "#008736", "7": "#FF00D0", "A": "#0500FF", "C": "#0500FF", "E": "#0500FF", "B": "#FF6B00", "D": "#FF6B00", "F": "#FF6B00", "M": "#FF6B00", "G": "#11E132", "L": "#B1BECB", "J": "#874100", "Z": "#874100", "N": "#FFDA16", "Q": "#FFDA16", "R": "#FFDA16", "W": "#FFDA16", "S": "#5F5A69" };


  trains.forEach((item, index) => {
    const btncircle = document.createElement("div");
    btncircle.classList.add("btn");
    btncircle.textContent = item;
    btncircle.style.textAlign = "center!important";
    btncircle.style.color = "white";
    btncircle.style.backgroundColor = colorMap[item];
  if (colorMap[item] === "#FFDA16") {
    btncircle.style.color = "black";
  }
  btncircle.addEventListener("mouseover", () => {
    btncircle.style.backgroundColor = "white";
    btncircle.style.color = colorMap[item];
  });
  btncircle.addEventListener("mouseout", () => {
    btncircle.style.backgroundColor = colorMap[item];
    btncircle.style.color = "white";
    if (colorMap[item] === "#FFDA16") {
    btncircle.style.color = "black";
  }
  });

  // create anchor tag and append the circle to it
  const button = document.createElement("button");
  // anchor.href = item + "/index.html";
  button.appendChild(btncircle);

  filters.appendChild(button);

});



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
    }).sort((a, b) => b.the_geom.coordinates[1] - a.the_geom.coordinates[1]); // sort by descending order of firstValue;

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


// Use shortenedName instead of entrance.name in the HTML string

        const firstValue = entrance.the_geom.coordinates[0]; // access coordinates array of the entrance object
        const secondValue = entrance.the_geom.coordinates[1]; // access coordinates array of the entrance object

if (entrance.line.includes("Z") && typeof entrance.name !== "undefined") {

  const lineDiv = document.createElement("div");
  const nameArray = entrance.name.split(' ');
const shortenedName = nameArray.slice(0, nameArray.length - 3).join(' ');
if (uniqueEntranceNames.includes(shortenedName)) {
        // This entrance name has already been added, skip it
        return;
      }
      uniqueEntranceNames.push(shortenedName);


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
  <div class="body">
  <div class="path"><div class="spot"></div></div>
  <div class="container-wrapper">
  <div class="container">
  <div class="mark"></div>
  <div class="boxcontent">
  <div class="info">
  <div class="name">${(shortenedName)}</div>
  <div class="street">${lineDiv.innerHTML}</div>
  </div>
  <div class="location"><a target="_blank" href="https://www.google.com/maps/search/${secondValue},+${firstValue}"><img src="arrow.png"></a>
  </div>
  </div>
  </div>
  </div>
  </div>
  `;
}
      });
      entrancesDOM += `</div>`;
      entrancesContainer.innerHTML = entrancesDOM;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    const entranceContainers = document.querySelectorAll('.body');
    entranceContainers.forEach(container => {
      const lineElement = container.querySelector('.street');
      const lineText = lineElement.textContent;
      if (lineText.includes(buttonText)) {
        container.style.display = 'flex';
      } else {
        container.style.display = 'none';
      }
    });
  });
  });
navigator.geolocation.getCurrentPosition((position) => {
  const userLat = position.coords.latitude;
  const userLng = position.coords.longitude;

  // Add your code here to calculate the distance between the user's location and the entrances' locations

modifiedJson.forEach((entrance) => {
  // Skip entrance lines that don't contain the number 3 in their name

  const entranceLat = entrance.the_geom.coordinates[1];
  const entranceLng = entrance.the_geom.coordinates[0];
  function deg2rad(degrees) {
    return degrees * Math.PI / 180;
  }
  // Calculate the distance between the user's location and the entrance's location using the Haversine formula
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(entranceLat - userLat);
  const dLng = deg2rad(entranceLng - userLng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLat)) *
      Math.cos(deg2rad(entranceLat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km

  // Store the distance in the entrance object
  entrance.distance = distance;
});

// Filter out entrances that don't contain the number 3 in their name
  const entrancesWith3 = modifiedJson.filter((entrance) =>
  entrance.line.includes("Z")
);


// Sort the entrances by distance in ascending order
entrancesWith3.sort((a, b) => a.distance - b.distance);

// Get the closest entrance
const closestEntrance = entrancesWith3[0];

// Display the closest entrance in the console
console.log(`You are closest to ${closestEntrance.name}.`);

const firstValue = closestEntrance.the_geom.coordinates[0]; // access coordinates array of the entrance object
const secondValue = closestEntrance.the_geom.coordinates[1]; // access coordinates array of the entrance object

const gap = document.querySelector('.gap');
gap.innerHTML = `The closest entrance to you is ${closestEntrance.name}. <a class="near" target="_blank" href="https://www.google.com/maps/search/${secondValue},+${firstValue}"><img class="near" src="arrow.png"></a>`;

});
  });


