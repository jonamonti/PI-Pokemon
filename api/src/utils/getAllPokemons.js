const { getAllPokemonsFromApi } = require('./getAllPokemonsFromApi');
const { getAllPokemonsFromDb } = require('./getAllPokemonsFromDb');

module.exports = {

    getAllPokemons: async () => {

        const api = await getAllPokemonsFromApi();
        const db = await getAllPokemonsFromDb();
        const allPokemons = db.concat(api);
        return allPokemons;

    }
}