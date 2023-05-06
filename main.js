const color = ["#B1BECB", "#0500FF", "#FF6B00", "#FFDA16", "#874100", "#5F5A69", "#FF1E46", "#008736", "#FF00D0"];
const colorMap = {
  "A": "#0500FF", "C": "#0500FF", "E": "#0500FF", "B": "#FF6B00", "D": "#FF6B00", "F": "#FF6B00", "M": "#FF6B00", "G": "#11E132", "L": "#B1BECB", "J": "#874100", "Z": "#874100", "N": "#FFDA16", "Q": "#FFDA16", "R": "#FFDA16", "W": "#FFDA16", "S": "#5F5A69",
  "a": "#0500FF", "c": "#0500FF", "e": "#0500FF", "b": "#FF6B00", "d": "#FF6B00", "f": "#FF6B00", "m": "#FF6B00", "g": "#11E132", "l": "#B1BECB", "j": "#874100", "z": "#874100", "n": "#FFDA16", "q": "#FFDA16", "r": "#FFDA16", "w": "#FFDA16", "s": "#5F5A69"
};
const titles = document.querySelectorAll(".title");
const array = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "B", "D", "F", "M", "G", "L", "J", "Z", "N", "Q", "R", "W", "S", "a", "c", "e", "b", "d", "f", "m", "g", "l", "j", "z", "n", "q", "r", "w", "s"];

function getRandomIndexes(array, count) {
  // Returns an array of count number of random indexes from the array
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  let indexes = shuffled.slice(0, count).map(item => {
    return array.indexOf(item);
  });
  indexes = indexes.filter(index => index !== 4);
  return indexes;
}


titles.forEach((title, i) => {
  const characters = title.textContent.split("");
  const availableChars = characters.filter(char => array.includes(char));
  console.log(availableChars)

  let randomIndexes = getRandomIndexes(availableChars, i === 0 ? 2 : 1);
  console.log(randomIndexes)

  const titleWithCircles = characters.map((character, i) => {
    if (availableChars.includes(character) && randomIndexes.includes(availableChars.indexOf(character)) && colorMap[character]) {
      // If the character is selected, is in colorMap, and has a random index
      const bgColor = colorMap[character];
     

      return `<span class="circle" style="background-color: ${bgColor}">${character}</span>`;
    } else {
      return character;
    }
  }).join("");
  
  title.innerHTML = titleWithCircles;
  
  const circles = title.querySelectorAll(".circle");
  circles.forEach(circle => {
    circle.addEventListener("mouseover", event => {
      const currentColor = circle.style.backgroundColor;
      let newColor = currentColor;
      while (newColor === currentColor) {
        // Select a new color that is different from the current color
        newColor = color[Math.floor(Math.random() * color.length)];
      }
      circle.style.backgroundColor = newColor;
      circle.style.color = "white";
    });
  });
});

