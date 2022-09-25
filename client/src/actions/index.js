import axios from 'axios';

export function getPokemons() {
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/pokemons', {});

        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getPokemonById(id){
    return async (dispatch) => {
        var json = await axios.get(`http://localhost:3001/pokemons/${id}`);

        return dispatch({
            type: 'GET_POKEMON_BY_ID',
            payload: json.data
        })
    }
}

export function getPokemonByName(name){
    return async (dispatch) => {
            var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            console.log(json.data);

            return dispatch({
                type: 'GET_POKEMON_BY_NAME',
                payload: json.data
            })
    }
}

export function getTypes(){
    return async (dispatch) => {
        var json = await axios.get(`http://localhost:3001/type`);

        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })

    }
}

export function filterPokemonsByCreated(valueToFilter){
    return{
        type: 'FILTER_BY_CREATED',
        payload: valueToFilter
    }
}

export function filterPokemonsByType(valueToFilter){
    return{
        type: 'FILTER_BY_TYPE',
        payload: valueToFilter
    }
}

export function orderByName(sort){
    return{
        type: 'ORDER_BY_NAME',
        payload: sort
    }
}

export function orderByAttack(sort){
    return{
        type: 'ORDER_BY_ATTACK',
        payload: sort
    }
}

export function cleanPokemonDetail(){
    return{
        type: 'CLEAN_POKEMON_DETAIL'
    }
}

export function createPokemon(info){
    console.log(info);

    return async (dispatch) => {
        var res = await axios.post(`http://localhost:3001/pokemons`, info);

        return dispatch({
            type: 'CREATE_POKEMON',
            payload: res
        })
    }   

}

// export function getPokemons() {
//     return async (dispatch) => {
//         var json = await axios.get('http://localhost:3001/pokemons', {});

//         return dispatch({
//             type: 'GET_POKEMONS',
//             payload: json.data
//         })
//     }
// }