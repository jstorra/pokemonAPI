import { saveData, existsPokemon } from "./conexJsonServer.js";

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
  let img, res;
  const { id, exists, server } = await existsPokemon(namePokemon);
  if (exists) {
    res = await (await fetch(server + "/" + id)).json();
    img = res["sprite-default"];
    getDataJsonServer(res, img, defaultImg);
  } else {
    res = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
    ).json();
    img = res.sprites.front_default;
    getDataPokeApi(res, img, defaultImg);
  }
  const btnCancel = document.querySelector(".swal2-cancel");
  btnCancel.removeAttribute("style");
  const inputs = document.querySelectorAll("#swal2-html-container input");
  const btnSave = document.querySelector(".swal2-confirm");
  btnSave.style.boxShadow = "none";
  btnSave.textContent = "Save";
  saveData(btnSave, inputs, namePokemon, img);
};

const getDataPokeApi = (res, img, defaultImg) => {
  Swal.fire({
    title: `${res.name}`,
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
};

const getDataJsonServer = (res, img, defaultImg) => {
  let HTML = "";
  for (let stat in res.stats) {
    HTML += `<label class="stat">
                <input type="range" value="${res.stats[stat]}" data-stat="${stat}">
                <b>${res.stats[stat]}</b>${stat}
            </label>`;
  }

  Swal.fire({
    title: `${res.name}`,
    imageUrl: `${img ? img : defaultImg}`,
    html: `${HTML}`,
    imageWidth: "300",
    imageHeight: "300",
    backdrop: `rgba(0,0,123,0.4)
               url("assets/img/pikachu.gif")
               center top
    no-repeat
              `,
  });
};
