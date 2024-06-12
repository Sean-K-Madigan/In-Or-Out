// menu button animation
function flyoutMenuX(x) {
  x.classList.toggle("change");
}

// menu slide animation
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("show");
});