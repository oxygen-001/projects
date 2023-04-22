const darkModeButton = document.querySelector("#darkmode-toggle");
const body = document.body;

darkModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
