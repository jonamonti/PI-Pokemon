import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Paginated from './Paginated';
import { getPokemons, getTypes, filterPokemonsByCreated, filterPokemonsByType, orderByName, orderByAttack, getPokemonByName } from '../actions';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

export default function Home(){

    // Global states
    const pokemonList = useSelector(state => state.pokemonList);
    const typeList = useSelector(state => state.typeList); // esto es equivalente a mapStateToProps(state)
    // Local states
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [orderedBy, setOrderedBy] = useState('');

    //
    const allPokemons = pokemonList.length; // 1
    const lastPokemon = currentPage * pokemonsPerPage; // 12
    const firstPokemon = lastPokemon - pokemonsPerPage; // 12 - 12 = 0
    const currentPokemons = pokemonList.slice(firstPokemon, lastPokemon);
    
    // Functions
    const dispatch = useDispatch();
    // cuando se monte el componente quiero que me traigan todos los pokemones
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
            // esto es equivalente a mapDispatchToProps(dispatch)
    }, [dispatch]);

    function handleClick(e){
        // e.preventDefault();
        dispatch(getPokemons());
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleFilterCreated = (e) => {
        dispatch(filterPokemonsByCreated(e.target.value));
    }

    const handleFilterByType = (e) => {
        dispatch(filterPokemonsByType(e.target.value));    
    }

    const handleSortByName = (e) => {
        dispatch(orderByName(e.target.value));
        setOrderedBy(`Name-${e.target.value}`);
    }

    const handleSortByAttack = (e) => {
        dispatch(orderByAttack(e.target.value));
        setOrderedBy(`Attack-${e.target.value}`);
    }

    const handleSubmit = (e) => {
        dispatch(getPokemonByName(e.target.value));
    }

    return(
        <div>
            <NavLink to='/createPokemon'>Create a Pokemon!</NavLink><br/>
            <NavLink to='/'>Landing</NavLink>
            <h1>Gotta catch em all</h1>
            <SearchBar/>
            <button onClick={(e) => handleClick(e)}>
                Volver a cargar todos los personajes
            </button>
            <div>
                <label>Order by: name
                    <select onChange={(e) => handleSortByName(e)} >
                        <option></option>
                        <option value='asc'>Ascendente</option>
                        <option value='desc'>Descendente</option>
                    </select>
                </label>
                <br/>
                <label>Order by: attack
                    <select onChange={ (e) => handleSortByAttack(e)} >
                        <option></option>
                        <option value='asc'>Weaker-stronger</option>
                        <option value='desc'>Stronger-weaker</option>
                    </select>
                </label>
                <br/>
                <label>Filter by: Existing or created
                    <select onChange={(e) => handleFilterCreated(e)} >
                        <option value='All'>Todos</option> 
                        <option value='pokeApi'>Existente</option>
                        <option value='database'>Creado por nosotros</option>
                    </select>
                </label>
                <br/>
                <label>Filter by: type
                    <select onChange={ (e) => handleFilterByType(e)} >
                        <option value='All'>all</option>
                        {
                            typeList?.map( (t,i) => {
                                return(
                                    <option key={i} value={t}>{t}</option>
                                 )})
                        }
                    </select>
                </label>
                <br/><br/><br/>
                <Paginated 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons} 
                    paginated={paginated}>
                </Paginated>
            </div>
            <div>
            {
                    currentPokemons?.map( (p,i) => {
                        return(
                            <div key={i}>
                                <NavLink to={`/home/${p.id}`}>
                                    <PokemonCard name={p.name} img={p.img} types={p.types}/>
                                </NavLink>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}