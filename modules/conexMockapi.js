export const saveData = async (btnSave, inputs, namePokemon, imgURL) => {
  btnSave.addEventListener("click", async () => {
    const keyStats = [...inputs].map((el) => el.dataset.stat);
    const valueStats = [...inputs].map((el) => el.value);
    const objStats = keyStats.reduce(
      (obj, key, index) => ({ ...obj, [key]: valueStats[index] }),
      {}
    );
    const { id, exists, mockapi } = await existsPokemon(namePokemon);
    const config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: namePokemon,
        stats: objStats,
        "sprite-default": imgURL,
      }),
    };
    if (exists) {
      config.method = "PUT";
      await fetch(mockapi + "/" + id, config);
    } else await fetch(mockapi, config);
  });
};

export const existsPokemon = async (namePokemon) => {
  const mockapi = "https://6509d044f6553137159c1062.mockapi.io/pokemons";
  const res = await (await fetch(mockapi)).json();
  let exists, id;
  for (let el of res) {
    if (el.name === namePokemon) {
      id = el.id;
      exists = true;
      break;
    }
  }
  return { id, exists, mockapi };
};
