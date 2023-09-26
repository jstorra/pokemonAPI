import { saveData } from "./conexMockapi.js"

export const cardsEvent = async (cards) => {
  cards.forEach(async (card) => {
    card.addEventListener("click", () => {
      getData(card);
    });
  });
};

export const getData = async (card) => {
  const namePokemon = card.id;
  const defaultImg = "assets/img/pokeBall.gif";
  let res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
  ).json();
  let img = res.sprites.front_default;
  // var res, img;
  // try {
  //   let res1 = await (
  //     await fetch(`https://6509d044f6553137159c1062.mockapi.io/pokemons/`)
  //   ).json();
  //   res1.forEach(data => {
  //     if (data.name === namePokemon){
  //       res = data
  //       console.log(data)
  //       img = data["sprite-default"]
  //     }
  //   })
  // } catch (error) {
  //   res = await (
  //     await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
  //   ).json();
  //   img = res.sprites.front_default;
  // }

  Swal.fire({
    title: `${res.name}`,
    text: "Modal with a custom image.",
    imageUrl: `${img ? img : defaultImg}`,
    html: `
              ${res.stats
                .map(
                  (data) =>
                    `<label class="stat"><input type="range" value="${
                      data.base_stat
                    }" data-stat="${data.stat.name}"><b>${
                      data.base_stat <= 100 ? data.base_stat : 100
                    }</b>${data.stat.name}</label>`
                )
                .join("")}
              `,
    imageWidth: "300",
    imageHeight: "300",
    backdrop: `rgba(0,0,123,0.4)
               url("assets/img/pikachu.gif")
               center top
    no-repeat
              `,
  });
  const btnCancel = document.querySelector(".swal2-cancel")
  btnCancel.removeAttribute("style")
  const inputs = document.querySelectorAll("#swal2-html-container input");
  const btnSave = document.querySelector(".swal2-confirm");
  btnSave.style.boxShadow = "none";
  btnSave.textContent = "Save";
  saveData(btnSave, inputs, namePokemon, img)
};
