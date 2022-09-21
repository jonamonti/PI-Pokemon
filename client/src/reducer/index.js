
const initialState = {
    pokemonList: [],
    pokemonDetail: [],
    typeList: []
}

export default function rootReducer(state= initialState, action) {
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemonList: action.payload.data
            }
        case 'GET_TYPES':
            return{
                ...state,
                typeList: action.payload
            }
        case 'GET_POKEMON_BY_ID':
            return{
                ...state,
                pokemonDetail: action.payload.data
            }
        default:
            return{
                ...state
            }
    }
}