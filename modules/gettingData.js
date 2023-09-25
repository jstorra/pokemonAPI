export const buttonsEvent = async (btns) => {
  btns.forEach(async (btn) => {
    btn.addEventListener("click", () => {
      getData(btn);
    });
  });
};

export const getData = async (btn) => {
  const namePokemon = btn.id;
  const res = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
  ).json();
  const img = res.sprites.front_default;
  const defaultImg = "assets/img/pokeBall.gif";

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
                    }"><b>${data.base_stat <= 100 ? data.base_stat : 100}</b>${
                      data.stat.name
                    }</label>`
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
  const btnOk = document.querySelector(".swal2-styled");
  btnOk.style.boxShadow = "none";
  btnOk.textContent = "SAVE";
};
