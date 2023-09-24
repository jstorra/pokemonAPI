const main = document.querySelector("main");
const btnMore = document.querySelector(".moreCards");

addEventListener("DOMContentLoaded", async () => {
  let resNext = await loadCards();
  const buttons = document.querySelectorAll(".btnPokemon");
  const pokemonData = await getPokeStats(buttons);
  const pokemonMaxStats = getMaxStats(pokemonData);
  buttonsEvent(buttons, pokemonMaxStats);

  btnMore.addEventListener("click", async () => {
    const res = await (await fetch(resNext)).json();
    const btns = await Promise.all(
      res.results.map(async (date) => {
        const namePokemon = date.name;
        const res1 = await (
          await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
        ).json();
        const img = res1.sprites.front_default;
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
    btns.forEach((el) => {
      main.insertAdjacentHTML("beforeend", el);
    });
    const buttons = document.querySelectorAll(".btnPokemon");
    const pokemonData = await getPokeStats(buttons);
    const pokemonMaxStats = getMaxStats(pokemonData);
    buttonsEvent(buttons, pokemonMaxStats);
    resNext = res.next;
  });
});

const loadCards = async () => {
  const res = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=18")
  ).json();
  const btns = await Promise.all(
    res.results.map(async (date) => {
      const namePokemon = date.name;
      const res1 = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
      ).json();
      const img = res1.sprites.front_default;
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
  return res.next;
};

const buttonsEvent = async (btns, pokemonMaxStats) => {
  btns.forEach(async (btn) => {
    btn.addEventListener("click", () => {
      getData(btn, pokemonMaxStats);
    });
  });
};

const getData = async (btn, pokemonMaxStats) => {
  const namePokemon = btn.id;
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
  ).json();
  const img = res.sprites.front_default;
  const defaultImg =
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
                return `<label class="stat"><input type="range" value="${
                  data.base_stat
                }" max="${max ? max : 100}" disabled><b>${data.base_stat}</b>${
                  data.stat.name
                }</label>`;
              })
              .join("")}
            `,
    imageWidth: "300",
    imageHeight: "300",
    backdrop: `rgba(0,0,123,0.4)`,
  });
  const btnOk = document.querySelector(".swal2-styled");
  btnOk.style.boxShadow = "none";
};

const getPokeStats = async (btns) => {
  const pokeStats = {};
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
  const maxStats = {};
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
