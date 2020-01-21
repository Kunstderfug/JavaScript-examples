const boom = document.querySelector("button");
const nuke = document.querySelector(".nuke");

boom.onclick = function triggerBoom() {
  console.log("you pressed the button BOOM");
  boom.style.transform = "scale(100)";
  boom.style.transition = "transform .5s ease-in";
  boom.style.opacity = "0";
  nuke.style.opacity = "1";
  nuke.style.transition = "opacity 1s ease";
};

nuke.onclick = function endBoom() {
  nuke.style.opacity = "0";
  boom.style.transform = "scale(1)";
  boom.style.opacity = "1";
};
