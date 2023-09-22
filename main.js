// const myPikachu = document.querySelector("#myPikachu");
let pokeStats = {};
let maxHp;
let maxAttack;
let maxDefense;
let maxSpecialAttack;
let maxSpecialDefense;
let maxSpeed;

addEventListener("DOMContentLoaded", async () => {
  const buttons = await loadDom();
  buttonsEvent(buttons);
});

const loadDom = async () => {
  //   let res = await (await fetch("./data.json")).json();
  let res = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?offset=100&limit=5")
  ).json();
  let btns = res.results
    .map((btn) => `<button id="${btn.name}">${btn.name}</button>`)
    .join("");
  document.body.innerHTML = btns;
  return document.querySelectorAll("button");
};

const buttonsEvent = async (btns) => {
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      getData(btn);
    });
    getPokeStats(btn.id);
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

const getPokeStats = async (namePokemon) => {
  let res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
  ).json();

//   let statistics = res.stats
//     .map((data) => `${data.stat.name}: ${data.base_stat}`)
//     .join(",");
//   pokeStats[namePokemon] = statistics;
    

};

// console.log(pokeStats);

// let a = {
//   cubone:
//     "hp: 50,attack: 50,defense: 95,special-attack: 40,special-defense: 50,speed: 35",
//   electrode:
//     "hp: 60,attack: 50,defense: 70,special-attack: 80,special-defense: 80,speed: 150",
//   exeggcute:
//     "hp: 60,attack: 40,defense: 80,special-attack: 60,special-defense: 45,speed: 40",
//   exeggutor:
//     "hp: 95,attack: 95,defense: 85,special-attack: 125,special-defense: 75,speed: 55",
//   marowak:
//     "hp: 60,attack: 80,defense: 110,special-attack: 50,special-defense: 80,speed: 45",
// };

// console.log(a);