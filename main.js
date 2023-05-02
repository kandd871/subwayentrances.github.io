const color = ["#B1BECB","#0500FF", "#FF6B00", "#FFDA16", "#874100", "#5F5A69", "#FF1E46", "#008736", "#FF00D0"]
const titles = document.querySelectorAll(".title")
const img = document.getElementById("img");


titles.forEach((title, index) => {
  const characters = title.outerText.split("");
  const numRandomIndexes = index === 0 ? 2 : 1; // set number of random indexes based on index
  const randomIndexes = [];
  while (randomIndexes.length < numRandomIndexes) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  
  const usedColors = [];
  const titleWithCircles = characters.map((character, index) => {
    if (randomIndexes.includes(index)) {
      let randomColor = color[Math.floor(Math.random() * color.length)];
      while (usedColors.includes(randomColor)) { // ensure no color is repeated
        randomColor = color[Math.floor(Math.random() * color.length)];
      }
      usedColors.push(randomColor);
      return `<span class="circle" style="background-color: ${randomColor}">${character}</span>`;
    } else {
      return character;
    }
  }).join("");
  
  title.innerHTML = titleWithCircles;

  const circles = title.querySelectorAll(".circle"); // only select circles within this title element

  circles.forEach(circle => {
    let randomColor = circle.style.backgroundColor;
    circle.addEventListener("mouseover", event => {
      randomColor = circle.style.backgroundColor;
      let newColor = color[Math.floor(Math.random() * color.length)];
      while (newColor === randomColor) { // ensure a new color is selected
        newColor = color[Math.floor(Math.random() * color.length)];
      }
      circle.style.backgroundColor = newColor;
      circle.style.color = "white";
      // circle.style.border = ".25vw solid " + newColor;
    });

    // circle.addEventListener("mouseout", event => {
    //   circle.style.backgroundColor = randomColor;
    //   circle.style.color = "black";
    //   circle.style.border = ".25vw solid transparent";
    // });
  });

});



