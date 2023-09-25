import { buttonsEvent } from "./gettingData.js";

export const loadActions = async () => {
  const buttons = document.querySelectorAll(".btnPokemon");
  buttonsEvent(buttons);
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
                            <img src="${img ? img : defaultImg}" loading="lazy">
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
