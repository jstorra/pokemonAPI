const main = document.querySelector("main");

addEventListener("DOMContentLoaded", async () => {
  const buttons = await loadDom();
  const pokemonData = await getPokeStats(buttons);
  const pokemonMaxStats = getMaxStats(pokemonData);
  buttonsEvent(buttons, pokemonMaxStats);
});

const loadDom = async () => {
  let res = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
  ).json();
  let btns = await Promise.all(
    res.results.map(async (date) => {
      let namePokemon = date.name;
      let res1 = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
      ).json();
      let img = res1.sprites.front_default;
      return `<div class="containerCard">
                  <div id="${date.name}" class="btnPokemon">
                      <div class="imgPokemon">
                          <img src="${img}">
                      </div>
                      <div class="containerName">
                          <span class="namePokemon">${date.name}</span>
                      </div>
                  </div>
              </div>`;
    })
  );
  main.innerHTML = btns.join("");
  return document.querySelectorAll(".btnPokemon");
};

const buttonsEvent = async (btns, pokemonMaxStats) => {
  btns.forEach(async (btn) => {
    btn.addEventListener("click", () => {
      playCardSound();
      getData(btn, pokemonMaxStats);
    });
  });
};

const getData = async (btn, pokemonMaxStats) => {
  console.log(pokemonMaxStats);
  let namePokemon = btn.id;
  let res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
  ).json();
  let img = res.sprites.front_default;
  let defaultImg =
    "https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif";

  Swal.fire({
    title: `${res.name}`,
    text: "Modal with a custom image.",
    imageUrl: `${img ? img : defaultImg}`,
    html: `
            ${res.stats
              .map((data) => {
                let max;
                for (stat in pokemonMaxStats) {
                  if (stat === data.stat.name) {
                    max = pokemonMaxStats[stat]["value"];
                  }
                }
                return `<input type="range" value="${data.base_stat}" max="${
                  max ? max : 100
                }" disabled ><label><b>${data.base_stat}</b> ${
                  data.stat.name
                } </label><br>`;
              })
              .join("")}
            `,
    imageWidth: "300",
    imageHeight: "300",
    backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `
  });
};

const getPokeStats = async (btns) => {
  let pokeStats = {};
  const promises = [...btns].map(async (btn) => {
    const namePokemon = btn.id;
    const res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
    ).json();
    pokeStats[namePokemon] = {};
    res.stats.forEach((data) => {
      pokeStats[namePokemon][data.stat.name] = data.base_stat;
    });
  });
  await Promise.all(promises);
  return pokeStats;
};

const getMaxStats = (pokemonData) => {
  let maxStats = {};
  for (const pokemon in pokemonData) {
    for (const stat in pokemonData[pokemon]) {
      if (
        !(stat in maxStats) ||
        pokemonData[pokemon][stat] > maxStats[stat]["value"]
      ) {
        maxStats[stat] = {
          value: pokemonData[pokemon][stat],
          name: pokemon,
        };
      }
    }
  }
  return maxStats;
};

const playCardSound = () => {
  const audioElement = new Audio("assets/audio/card.mp3");
  audioElement.play();
};
