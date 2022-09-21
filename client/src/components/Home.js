import React from 'react';
import { /**useState,*/ useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPokemons, getTypes } from '../actions';
import PokemonCard from './PokemonCard';

export default function Home(){

    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemonList);
    const typeList = useSelector(state => state.typeList);
        // esto es equivalente a mapStateToProps(state)
    
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

    return(
        <div>
            <NavLink to='/createPokemon'>Create a Pokemon!</NavLink><br/>
            <NavLink to='/'>Landing</NavLink>
            <h1>Gotta catch em all</h1>
            <button onClick={(e) => handleClick(e)}>
                Volver a cargar todos los personajes
            </button>
            <div>
                <label>Orden alfabetico
                    <select>
                        <option value='asc'>Ascendente</option>
                        <option value='desc'>Descendente</option>
                    </select>
                </label>
                <br/>
                <label>Orden por ataque
                    <select>
                        <option value='asc'>Ascendente</option>
                        <option value='desc'>Descendente</option>
                    </select>
                </label>
                <br/>
                <label>Origen
                    <select>
                        <option value='all'>Todos</option> 
                        <option value='pokeApi'>Existente</option>
                        <option value='database'>Creado por nosotros</option>
                    </select>
                </label>
                <br/>
                <label>Tipo de pokemon
                    <select>
                        <option value='pokeApi'>Existente</option>
                        <option value='database'>Creado por nosotros</option>
                    </select>
                </label>
                <br/>
            </div>
            <div>
            {
                    pokemonList?.map( (p) => {
                        return(
                            <div key={p.id}>
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