import { getPokeStats, getMaxStats } from "./pokemonStats.js";
import { buttonsEvent } from "./gettingData.js";

export const loadActions = async () => {
  const buttons = document.querySelectorAll(".btnPokemon");
  const pokemonData = await getPokeStats(buttons);
  const pokemonMaxStats = getMaxStats(pokemonData);
  buttonsEvent(buttons, pokemonMaxStats);
};

export const loadCards = async (main, api) => {
  const res = await (await fetch(api)).json();
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
  main.innerHTML = btns.join("");
  return res.next;
};
