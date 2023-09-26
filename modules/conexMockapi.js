const mockapi = "https://6509d044f6553137159c1062.mockapi.io/pokemons";

export const saveData = async (btnSave, inputs, namePokemon, imgURL) => {
  btnSave.addEventListener("click", async () => {
    const keyStats = [...inputs].map((el) => el.dataset.stat);
    const valueStats = [...inputs].map((el) => el.value);
    const objStats = keyStats.reduce(
      (obj, key, index) => ({ ...obj, [key]: valueStats[index] }),
      {}
    );
    const res = await (await fetch(mockapi)).json();
    let existsPokemon, id;
    for (let el of res) {
      if (el.name === namePokemon) {
        id = el.id;
        existsPokemon = true;
        break;
      }
    }
    const config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: namePokemon,
        stats: objStats,
        "sprite-default": imgURL,
      }),
    };
    if (existsPokemon) {
      config.method = "PUT";
      await fetch(mockapi + "/" + id, config);
    } else await fetch(mockapi, config);
  });
};
