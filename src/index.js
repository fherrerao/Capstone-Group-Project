import "./style.css";
import Movies from "./home-page.js";
import NewApi from "./newApi.js";

Movies.getMovies();
NewApi.getLikes();
Movies.counterMovies();

const moviesTab = document.querySelector(".movies-tab");
const aboutTab = document.querySelector(".about-tab");
const homePage = document.querySelector(".homepage");
const aboutSection = document.querySelector(".about-section");

aboutSection.classList.add("d-none");
aboutTab.addEventListener("click", () => {
  homePage.classList.add("d-none");
  aboutSection.classList.remove("d-none");
});

moviesTab.addEventListener("click", () => {
  homePage.classList.remove("d-none");
  aboutSection.classList.add("d-none");
});
