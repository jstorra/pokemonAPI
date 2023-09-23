const main = document.querySelector("main");
addEventListener("DOMContentLoaded", async () => {
  const buttons = await loadDom();
  let pokemonData = await getPokeStats(buttons);
  buttonsEvent(buttons, getMaxStats(pokemonData));
});

const loadDom = async () => {
  // let res = await (await fetch("./data.json")).json();
  let res = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=14")
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

const buttonsEvent = async (btns, pokemonData) => {
  btns.forEach(async (btn) => {
    btn.addEventListener("click", () => {
      getData(btn, pokemonData);
    });
  });
};

const getData = async (btn, pokemonData) => {
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
                for (stat in pokemonData) {
                  if (stat === data.stat.name) {
                    max = pokemonData[stat];
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
      if (!(stat in maxStats) || pokemonData[pokemon][stat] > maxStats[stat]) {
        maxStats[stat] = pokemonData[pokemon][stat];
      }
    }
  }
  return maxStats;
};
