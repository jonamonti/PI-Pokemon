const { default: axios } = require('axios');
const { Pokemon, Type } = require('../db.js');

module.exports = {

    getPokemonByName: async (name) => {

        const queryCondition = { where: {name: name}, include: Type};
        const queryResult = await Pokemon.findAll(queryCondition);

        // si no encuentro nada en la bbdd, voy a buscar ese name en el endpoint
        // `https://pokeapi.co/api/v2/pokemon/${name}`
        if (!queryResult.length) {
            const resp =  await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            
            const { id, stats, height, weight, types, sprites } = resp.data;
            const stat = {};
                stats.forEach(e => stat[e.stat.name] = e.base_stat)
    
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
            };

            return pokemon;
        }
        // // si hay un pokemon con ese name en mi bbdd, lo retorno
        let {id, hp, attack, defense, speed, height, weight, img} = queryResult[0];

        let types = [];
                queryResult[0].types.forEach(t => types.push(t.name));

        const pokemon = {
            source: 'database',
            id,
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            types
        }

        return pokemon;
    }

} 