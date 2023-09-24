import { loadActions, loadCards } from "./modules/loadFunctions.js";

const main = document.querySelector("main");
const btnMore = document.querySelector(".moreCards");
const api = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9";

addEventListener("DOMContentLoaded", async () => {
  let resNext = await loadCards(main, api);
  loadActions();
  btnMore.addEventListener("click", async () => {
    const res = await (await fetch(resNext)).json();
    const btns = await Promise.all(
      res.results.map(async (date) => {
        const namePokemon = date.name;
        const res1 = await (
          await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
        ).json();
        const img = res1.sprites.front_default;
        const defaultImg = "assets/img/pokeBall.gif";
        return `<div class="containerCard">
                      <div id="${date.name}" class="btnPokemon">
                          <div class="imgPokemon">
                              <img src="${img ? img : defaultImg}">
                          </div>
                          <div class="containerName">
                              <span class="namePokemon">${date.name}</span>
                          </div>
                      </div>
                  </div>`;
      })
    );
    btns.forEach((el) => {
      main.insertAdjacentHTML("beforeend", el);
    });
    loadActions();
    !res.next ? (btnMore.style.display = "none") : (resNext = res.next);
  });
});
