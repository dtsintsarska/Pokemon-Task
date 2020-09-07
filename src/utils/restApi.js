const getPokemons = async () => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const pokemons = await promise.json();

    return pokemons
}

export default getPokemons