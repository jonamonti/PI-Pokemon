import React from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from '../actions';
import { useState } from "react";
import styles from '../cssModule/SearchBar.module.css';


export default function SearchBar() {
    // hooks
    const dispatch = useDispatch();

    // Local state
    const [name, setName] = useState('');

    // Functions
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(name));
        setName('');
    }

    return(
        <form className={styles.searchBar}>
            <input 
                className={styles.input}
                type='text' 
                placeholder='Search...' 
                onChange={(e) => handleInputChange(e)} >
            </input>
            <button
                className={styles.button}
                type='submit'
                onClick={(e) => handleSubmit(e)}>Go!
            </button>
        </form>

    )

}

