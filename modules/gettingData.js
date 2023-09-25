export const buttonsEvent = async (btns, pokemonMaxStats) => {
  btns.forEach(async (btn) => {
    btn.addEventListener("click", () => {
      getData(btn, pokemonMaxStats);
    });
  });
};

export const getData = async (btn, pokemonMaxStats) => {
  const namePokemon = btn.id;
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
  ).json();
  const img = res.sprites.front_default;
  const defaultImg ="assets/img/pokeBall.gif";

  Swal.fire({
    title: `${res.name}`,
    text: "Modal with a custom image.",
    imageUrl: `${img ? img : defaultImg}`,
    html: `
              ${res.stats
                .map((data) => {
                  let max;
                  for (let stat in pokemonMaxStats) {
                    if (stat === data.stat.name) {
                      max = pokemonMaxStats[stat]["value"];
                    }
                  }
                  return `<label class="stat"><input type="range" value="${
                    data.base_stat
                  }" max="${max ? max : 100}" disabled><b>${
                    data.base_stat
                  }</b>${data.stat.name}</label>`;
                })
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
  const btnOk = document.querySelector(".swal2-styled");
  btnOk.style.boxShadow = "none";
  btnOk.textContent = "CLOSE"
};
