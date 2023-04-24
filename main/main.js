const array = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "B", "D", "F", "M", "G", "L", "J", "Z", "N", "Q", "R", "W", "S"];
const colorMap = { "1": "#FF1E46", "2": "#FF1E46", "3": "#FF1E46", "4": "#008736", "5": "#008736", "6": "#008736", "7": "#FF00D0", "A": "#0500FF", "C": "#0500FF", "E": "#0500FF", "B": "#FF6B00", "D": "#FF6B00", "F": "#FF6B00", "M": "#FF6B00", "G": "#11E132", "L": "#B1BECB", "J": "#874100", "Z": "#874100", "N": "#FFDA16", "Q": "#FFDA16", "R": "#FFDA16", "W": "#FFDA16", "S": "#5F5A69" };
const color = ["#B1BECB","#0500FF", "#FF6B00", "#FFDA16", "#874100", "#5F5A69", "#FF1E46", "#008736", "#FF00D0"]
const container = document.querySelector(".container");

array.forEach((item, index) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = item;
  circle.style.backgroundColor = colorMap[item];
  if (colorMap[item] === "#FFDA16") {
    circle.style.color = "black";
  }
  circle.addEventListener("mouseover", () => {
    circle.style.backgroundColor = "black";
    circle.style.color = colorMap[item];
    circle.style.border = ".25vw solid"+ colorMap[item];
  });
  circle.addEventListener("mouseout", () => {
    circle.style.backgroundColor = colorMap[item];
    circle.style.color = "white";
    circle.style.border = "none";
  });

  // create anchor tag and append the circle to it
  const anchor = document.createElement("a");
  anchor.href = item + "/index.html";
  anchor.appendChild(circle);

  container.appendChild(anchor);

  // generate a random number of empty circles to insert after each colored circle
  const numEmptyCircles = Math.floor(Math.random() * 3.25);
  for (let i = 0; i < numEmptyCircles; i++) {
    const emptyCircle = document.createElement("div");
    emptyCircle.classList.add("empty-circle");
    emptyCircle.style.backgroundColor = color[Math.floor(Math.random() * color.length)];
    container.appendChild(emptyCircle);
  }
});

const hideButton = document.getElementById("hide");
let hideEmptyCircles = false;

hideButton.addEventListener("click", () => {
  hideEmptyCircles = !hideEmptyCircles;
  const emptyCircles = document.querySelectorAll(".empty-circle");
  emptyCircles.forEach((emptyCircle) => {
    emptyCircle.style.display = hideEmptyCircles ? "none" : "flex";
  });
  hideButton.textContent = hideEmptyCircles ? "show" : "hide";
});
