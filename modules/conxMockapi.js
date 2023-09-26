export const saveData = async (btnSave, inputs, namePokemon, imgURL) => {
  btnSave.addEventListener("click", async () => {
    let keyStats = [...inputs].map((el) => el.dataset.stat);
    let valueStats = [...inputs].map((el) => el.value);
    let newStats = keyStats.reduce(
      (obj, key, index) => ({ ...obj, [key]: valueStats[index] }),
      {}
    );
    console.log(newStats);
    const config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: namePokemon,
        stats: newStats,
        "sprite-default": imgURL,
      }),
    };
    await fetch("https://6509d044f6553137159c1062.mockapi.io/pokemons", config);
  });
};
