const getPokemon = async (url) => {
    const promise = await fetch(url);
    const pokemon = await promise.json();

    // pokemons.results.forEach(async (element) => {
    //     const pokemon = await fetch(element.url)
    //     const pokemonInfo = await pokemon.json()
    // });

    return pokemon
}

export default getPokemon