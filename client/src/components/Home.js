import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginated from './Paginated';
import { getPokemons, getTypes, filterPokemonsByCreated, filterPokemonsByType, orderByName, orderByAttack } from '../actions';
import PokemonCard from './PokemonCard';
import NavBar from './NavBar';
import styles from '../cssModule/Home.module.css';

export default function Home(){

    // Global states
    const pokemonList = useSelector(state => state.pokemonList);
    const typeList = useSelector(state => state.typeList);
    const allPoke = useSelector(state => state.allPokemons);

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

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterPokemonsByCreated(e.target.value));
        setCurrentPage(1);
    }

    const handleFilterByType = (e) => {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1)  
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

    const disableOriginDb = () => {
        let arr = allPoke.filter(el => el.source === 'database');
        if (!arr.length) { 
            return true
        } else { 
            return false
        }
    }

    const typesOptions = () => {
        const arr = allPoke.map(el => el.types[0]);
        const uniqueTypes = [...new Set(arr.map(el => el))]
        // console.log(uniqueTypes);
        return uniqueTypes;
    }

    const displayTypes = typesOptions();

    return(
        <div>
            <NavBar/>
            <div className={styles.div}>
                <select className={styles.select} defaultValue='default' onChange={(e) => handleSortByName(e)}>
                    <option value='default' disabled>Order by: name</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <select className={styles.select} defaultValue='default' onChange={ (e) => handleSortByAttack(e)}>
                    <option value='default' disabled>Order by: attack</option>
                    <option value='asc'>Weaker-stronger</option>
                    <option value='desc'>Stronger-weaker</option>
                </select>
                <select className={styles.select} defaultValue='default' onChange={(e) => handleFilterCreated(e)}>
                    <option value='default' disabled>Filter: pokeApi or created</option>
                    <option value='All'>All</option>
                    <option value='pokeApi'>PokeApi</option>
                    <option value='database' disabled={disableOriginDb()}>Created</option>
                </select>
                <select className={styles.select} defaultValue='default' onChange={ (e) => handleFilterByType(e)}>
                    <option value='default' disabled>Filter: type</option>
                    <option value='All'>All</option>
                    {
                        displayTypes?.map( (t,i) => {
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
                                        <PokemonCard name={p.name} img={p.img} types={p.types} id={p.id}/>
                                </div>

                            )
                        }) : <div className={styles.loader}>loading
                                <img src='https://cdn130.picsart.com/292764002044201.gif?to=min&r=1024' alt='poke'/>
                            </div>
                }
            </section>
        </div>
    )
}