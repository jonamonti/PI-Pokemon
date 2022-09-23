// CONFIGURATION
const { default: axios } = require('axios');

// DATA MODELS
const { Pokemon, Type } = require('../db.js');


module.exports = {

    getAllPokemonsFromDb: async () => {

        const queryCondition = { include: Type };
        const queryResult = await Pokemon.findAll(queryCondition);

        let arr=[];

        queryResult.map( el => {
            let {id, name, hp, attack, defense, speed, height, weight, img} = el;

            let types = [];
                el.types.forEach(t => types.push(t.name));

            let pokemon = {
                source: 'database',
                id,
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                img,
                types
            }
            arr.push(pokemon);
        })

        return arr;
    }
}

        // let {id, name, hp, attack, defense, speed, height, weight, img} = queryResult[0];

        // let arr = [];
        // // arr = queryResult[0].dataValues;
        // console.log(queryResult);
        // let types = [];
        //         queryResult[0].types.forEach(t => types.push(t.name));

        // const pokemon = {
        //     source: 'database',
        //     id,
        //     name,
        //     hp,
        //     attack,
        //     defense,
        //     speed,
        //     height,
        //     weight,
        //     img,
        //     types
        // }
        // arr.push(pokemon);
        // return arr;

