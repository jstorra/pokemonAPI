import { cardsEvent } from "./cardsData.js";

export const loadActions = async () => {
  const cards = document.querySelectorAll(".cardPokemon");
  cardsEvent(cards);
};

export const loadCards = async (main, api) => {
  const res = await (await fetch(api)).json();
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
                            <img src="${img ? img : defaultImg}" loading="lazy">
                        </div>
                        <div class="containerName">
                            <span class="namePokemon">${namePokemon}</span>
                        </div>
                    </div>
                </div>`;
    })
  );
  main.innerHTML = cards.join("");
  return res.next;
};

export const loadTypes = async (sectionTypes, main) => {
  const res = await (await fetch("https://pokeapi.co/api/v2/type/")).json();
  let btns = res.results
    .map((type) => `<button class="btnType">${type.name}</button>`)
    .join("");
  sectionTypes.innerHTML = btns;
  const btnType = document.querySelectorAll(".btnType");
  btnType.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const res = await (
        await fetch(`https://pokeapi.co/api/v2/type/${btn.textContent}/`)
      ).json();
      const { pokemon: pokemones } = res;
      const cards = await Promise.all(
        pokemones.map(async (el) => {
          const namePokemon = el.pokemon.name;
          const res1 = await (
            await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
          ).json();
          const img = res1.sprites.front_default;
          const defaultImg = "assets/img/pokeBall.gif";
          return `<div class="containerCard">
                        <div id="${namePokemon}" class="cardPokemon">
                            <div class="imgPokemon">
                                <img src="${img ? img : defaultImg
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
    });
  });
};
