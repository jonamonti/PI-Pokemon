// import { useSelector } from "react-redux"

const initialState = {
    allPokemons: [],
    pokemonList: [],
    pokemonDetail: [],
    typeList: []
}

export default function rootReducer(state= initialState, action) {
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                allPokemons: action.payload.data,
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
        case 'GET_POKEMON_BY_NAME':
            return{
                ...state,
                pokemonList: [action.payload.data]
            }
        case 'FILTER_BY_CREATED':
            // const allCharacters = useSelector((state) => state.pokemonList);
            const a = state.allPokemons;
            const statusFilter = action.payload === 'All' 
                                        ? a
                                        : a.filter( (el) => el.source === action.payload);
            return{
                ...state,
                pokemonList: statusFilter
            }
        case 'FILTER_BY_TYPE':
            const b = state.allPokemons;
            const typeFilter = action.payload === 'All'
                                        ? b
                                        : b.filter( (el) => el.types.includes(action.payload) );
            return{
                ...state,
                pokemonList: typeFilter
            }
        case 'ORDER_BY_NAME':
            // logica de ordenamiento
            const c = state.pokemonList;
            const sortedByName = action.payload === 'asc'
                                        ? c.sort( (a,b) => {
                                            const nameA = a.name.toLowerCase();
                                            const nameB = b.name.toLowerCase();
                                                if (nameA < nameB) {
                                                    return -1
                                                }
                                                if (nameA > nameB) {
                                                    return 1
                                                }
                                                return 0
                                            })
                                        : c.sort( (a,b) => {
                                            const nameA = a.name.toLowerCase();
                                            const nameB = b.name.toLowerCase();
                                                if (nameA > nameB) {
                                                    return -1
                                                }
                                                if (nameA < nameB) {
                                                    return 1
                                                }
                                                return 0
                                            })
            return{
                ...state,
                pokemonList: sortedByName
            }
        case 'ORDER_BY_ATTACK':
            const d = state.pokemonList;
            const sortedByAttack = action.payload === 'asc'
                                            ? d.sort( (a,b) => {return a.attack - b.attack})
                                            : d.sort( (a,b) => {return b.attack - a.attack})
            return{
                ...state,
                pokemonList: sortedByAttack
            }
        case 'CLEAN_POKEMON_DETAIL':
            return{
                ...state,
                pokemonDetail: []
            }
        case 'CREATE_POKEMON':
            return{
                ...state
            }
        default:
            return{
                ...state
            }
    }
}