import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from '../actions';
import { useState } from "react";
import styles from '../cssModule/SearchBar.module.css';

let arr1 = [];

export default function SearchBar() {
    // hooks
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.allPokemons);

    // Local state
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(true);

    // Functions
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
        setDisabled(existsName(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(name));
        setName('');
    }

    const existsName = (name) => {
        let exactMatch = allPokemons.filter((el) => el.name === name.toLowerCase());
        // console.log(name, arr1);
        if (!exactMatch.length) {
            return true
        } else {
            return false
        }
    }

    return(
        <form className={styles.searchBar}>
            <input 
                className={styles.input}
                type='text' 
                placeholder='Type a name...' 
                onChange={(e) => handleInputChange(e)} >
            </input>
            <button
                className={styles.button}
                type='submit'
                disabled={disabled}
                onClick={(e) => handleSubmit(e)}>Go!
            </button>
        </form>

    )

}

