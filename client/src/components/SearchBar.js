import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from '../actions';
import { useState } from "react";


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
        <div>
            <input 
                type='text' 
                placeholder='Search...' 
                onChange={(e) => handleInputChange(e)} >
            </input>
            <button 
                type='submit'
                onClick={(e) => handleSubmit(e)}>Go!</button>
        </div>
    )

}

