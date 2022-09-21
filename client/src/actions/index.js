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

export function getTypes(){
    return async (dispatch) => {
        var json = await axios.get(`http://localhost:3001/type`);

        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })

    }
}


export function createPokemon(info){
    return(
        { type: 'CREATE_POKEMON', payload: info }
    )
}