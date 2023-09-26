import { loadActions, loadCards, loadTypes } from "./modules/loadFunctions.js";

const sectionTypes = document.querySelector(".sectionTypes");
const main = document.querySelector("main");
const btnPrev = document.querySelector(".prevPage");
const btnNext = document.querySelector(".nextPage");
const hr = document.querySelector("hr");
const footer = document.querySelector("footer");
const api = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=16";

addEventListener("DOMContentLoaded", async () => {
  loadTypes(sectionTypes, main);
  let resNext = await loadCards(main, api);
  loadActions();
  let resPrev;
  let res;
  footer.addEventListener("click", async (e) => {
    if (e.target.matches(".nextPage")) {
      res = await (await fetch(resNext)).json();
    } else if (e.target.matches(".prevPage")) {
      res = await (await fetch(resPrev)).json();
    }
    const cards = await Promise.all(
      res.results.map(async (date) => {
        const namePokemon = date.name;
        const res1 = await (
          await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
        ).json();
        const img = res1.sprites.front_default;
        const defaultImg = "assets/img/pokeBall.gif";
        return `<div class="containerCard">
                      <div id="${namePokemon}" class="cardPokemon">
                          <div class="imgPokemon">
                              <img src="${
                                img ? img : defaultImg
                              }" loading="lazy">
                          </div>
                          <div class="containerName">
                              <span class="namePokemon">${namePokemon}</span>
                          </div>
                      </div>
                  </div>`;
      })
    );
    main.innerHTML = cards.join("");
    loadActions();
    if (!res.previous) {
      btnPrev.style.display = "none";
      hr.style.display = "none";
      btnNext.style.width = "100%";
    } else {
      btnNext.removeAttribute("style");
      btnPrev.removeAttribute("style");
      hr.removeAttribute("style");
      resPrev = res.previous;
    }
    if (!res.next) {
      btnNext.style.display = "none";
      hr.style.display = "none";
      btnPrev.style.width = "100%";
    } else {
      resNext = res.next;
    }
  });
});

document.addEventListener("input", (e) => {
  if (e.target.matches("#swal2-html-container input")) {
    const statValue = e.target.nextElementSibling;
    statValue.textContent = e.target.value;
  }
});
