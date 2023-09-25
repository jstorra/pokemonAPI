export const getPokeStats = async (btns) => {
  const pokeStats = {};
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

export const getMaxStats = (pokemonData) => {
  const maxStats = {};
  for (const pokemon in pokemonData) {
    for (const stat in pokemonData[pokemon]) {
      if (
        !(stat in maxStats) ||
        pokemonData[pokemon][stat] > maxStats[stat]["value"]
      ) {
        maxStats[stat] = {
          value: pokemonData[pokemon][stat],
          name: pokemon,
        };
      }
    }
  }
  return maxStats;
};
