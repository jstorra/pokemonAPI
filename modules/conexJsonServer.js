export const saveData = async (btnSave, inputs, namePokemon, imgURL) => {
  btnSave.addEventListener("click", async () => {
    const keyStats = [...inputs].map((el) => el.dataset.stat);
    const valueStats = [...inputs].map((el) => el.value);
    const objStats = keyStats.reduce(
      (obj, key, index) => ({ ...obj, [key]: valueStats[index] }),
      {}
    );
    const { id, exists, server } = await existsPokemon(namePokemon);
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
      await fetch(server + "/" + id, config);
    } else await fetch(server, config);
  });
};

export const existsPokemon = async (namePokemon) => {
  const server = "http://127.0.0.1:5010/pokemones";
  const res = await (await fetch(server)).json();
  let exists, id;
  for (let el of res) {
    if (el.name === namePokemon) {
      id = el.id;
      exists = true;
      break;
    }
  }
  return { id, exists, server };
};
