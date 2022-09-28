import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import styles from '../cssModule/NavBar.module.css';
import { getPokemons } from '../actions';

function NavBar() {

    const dispatch = useDispatch();

    function handleClick(e){
        dispatch(getPokemons());
    }

    return(
        <React.Fragment>
        <header>    
            <NavLink to={'/'}>
                <button className={styles.button}>Landing</button>
            </NavLink>
            <button className={styles.button} onClick={(e) => handleClick(e)}>
                Load all pokemons
            </button>
            <SearchBar/>
            <NavLink to={'/createPokemon'}>
                <button className={styles.button}>Create Pokemon</button></NavLink>
        </header>
        </React.Fragment>
    )

}

export default NavBar;
