const { default: axios } = require('axios');
const { Pokemon, Type } = require('../db.js');

module.exports = {

    getPokemonById: async (id) => {

        if (id.includes('-')) {

            const queryResult = await Pokemon.findByPk(id);
            if (!queryResult) throw new Error('Invalid pokemon id - Could not find in database');

            const dbTypes = (await queryResult.getTypes()).map(el => el.name);

            const pokemon = {
                source: 'database',
                ...queryResult.dataValues,
                types: dbTypes
            }
            return pokemon;
        }

        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        const { name, stats, height, weight, types, sprites } = resp.data;
        const stat = {};
        resp.data.stats.forEach(e => stat[e.stat.name] = e.base_stat)

        const type = [];
        resp.data.types.forEach(t => type.push(t.type.name));
            
        const pokemon = {
            source: 'pokeApi',
            id,
            name: name.charAt(0)+name.slice(1),
            hp: stat.hp,
            attack: stat.attack,
            defense: stat.defense,
            speed: stat.speed,
            height: resp.data.height,
            weight: resp.data.weight,
            img: sprites.other['official-artwork'].front_default,
            types: type
        };
        return pokemon;
    }
}