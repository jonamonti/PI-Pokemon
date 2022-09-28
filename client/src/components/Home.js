import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Paginated from './Paginated';
import { getPokemons, getTypes, filterPokemonsByCreated, filterPokemonsByType, orderByName, orderByAttack } from '../actions';
import PokemonCard from './PokemonCard';
// import SearchBar from './SearchBar';
import NavBar from './NavBar';
import styles from '../cssModule/Home.module.css';

export default function Home(){

    // Global states
    const pokemonList = useSelector(state => state.pokemonList);
    const typeList = useSelector(state => state.typeList);

    // Local states
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const [orderedBy, setOrderedBy] = useState('');

    // variables
    const allPokemons = pokemonList.length;
    const lastPokemon = currentPage * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    const currentPokemons = pokemonList.slice(firstPokemon, lastPokemon);
    
    // Functions
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    function handleClick(e){
        dispatch(getPokemons());
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterPokemonsByCreated(e.target.value));
    }

    const handleFilterByType = (e) => {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));    
    }

    const handleSortByName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrderedBy(`Name-${e.target.value}`);
    }

    const handleSortByAttack = (e) => {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setOrderedBy(`Attack-${e.target.value}`);
    }

    return(
        <div>
            <NavBar/>
            <div className={styles.div}>
                <select className={styles.select} onChange={(e) => handleSortByName(e)}>
                    <option value='title' disabled>Order by: name</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <select className={styles.select} onChange={ (e) => handleSortByAttack(e)}>
                    <option value='title' disabled>Order by: attack</option>
                    <option value='asc'>Weaker-stronger</option>
                    <option value='desc'>Stronger-weaker</option>
                </select>
                <select className={styles.select} onChange={(e) => handleFilterCreated(e)}>
                    <option value='title' disabled>Filter: pokeApi or created</option>
                    <option value='All'>All</option>
                    <option value='pokeApi'>PokeApi</option>
                    <option value='database'>Created</option>
                </select>
                <select className={styles.select} onChange={ (e) => handleFilterByType(e)}>
                    <option value='title' disabled>Filter: type</option>
                    <option value='All'>All</option>
                    {
                        typeList?.map( (t,i) => {
                            return(
                                <option key={i} value={t}>{t}</option>
                                )})
                    }
                </select>
            </div>
            <div className={styles.paginated}>
                <Paginated 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons}
                    paginated={paginated}>
                </Paginated>
            </div>
            <section className={styles.sectionCards} >
            {
                    currentPokemons.length > 0 ? 
                        currentPokemons?.map( (p,i) => {
                            return(
                                <div key={i}>
                                    {/* <NavLink to={`/home/${p.id}`}> */}
                                        <PokemonCard name={p.name} img={p.img} types={p.types} id={p.id}/>
                                    {/* </NavLink> */}
                                </div>

                            )
                        }) : <div className={styles.loader}>loading</div>
                }
            </section>
        </div>
    )
}