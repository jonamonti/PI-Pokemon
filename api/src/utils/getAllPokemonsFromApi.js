const { default: axios } = require('axios');

module.exports = {

    getAllPokemonsFromApi: async () => {

        const lastPokemonId = 60;

        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${lastPokemonId}`);
        let promisesFromResp = resp.data.results.map( el => axios.get(el.url));

        let arr = [];

        await Promise.all(promisesFromResp).then(values => {

            values.forEach( (el) => {
                const { id, name, stats, height, weight, types, sprites } = el.data;

                const stat = {};
                    stats.forEach(e => stat[e.stat.name] = e.base_stat);

                const type = [];
                    types.forEach(t => type.push(t.type.name));

                const pokemon = {
                    source: 'pokeApi',
                    id,
                    name,
                    hp: stat.hp,
                    attack: stat.attack,
                    defense: stat.defense,
                    speed: stat.speed,
                    height,
                    weight,
                    img: sprites.other['official-artwork'].front_default,
                    types: type
                }
                arr.push(pokemon);
            });
        });
        return arr;
    }
}