let maxHp;
let maxAttack;
let maxDefense;
let maxSpecialAttack;
let maxSpecialDefense;
let maxSpeed;

addEventListener("DOMContentLoaded", async () => {
  const buttons = await loadDom();
  buttonsEvent(buttons);
  let stats = await getPokeStats(buttons);
  console.log(stats);
});

const loadDom = async () => {
  // let res = await (await fetch("./data.json")).json();
  let res = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
  ).json();
  console.log(res);
  let btns = res.results
    .map((date) => `<button id="${date.name}">${date.name}</button>`)
    .join("");
  document.body.innerHTML = btns;
  return document.querySelectorAll("button");
};

const buttonsEvent = async (btns) => {
  btns.forEach(async (btn) => {
    btn.addEventListener("click", () => {
      getData(btn);
    });
  });
};

const getData = async (btn) => {
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
              .map(
                (data) =>
                  `<input type="range" value="${data.base_stat}" max="300"><label><b>${data.base_stat}</b> ${data.stat.name} </label><br>`
              )
              .join("")}
            `,
    imageWidth: "80%",
    imageHeight: "80%",
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
