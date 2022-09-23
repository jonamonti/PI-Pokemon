import React from 'react';
// import { Link } from 'react-router-dom';

export default function PokemonCard({name, img, types}){
    return(
        <div>
            <h3>{name}</h3>
            <ul>
            {
                types?.map((t,i) => {
                    return(
                        <li key={i} >{t}</li>
                    )
                })
            }
            </ul>
            <img src={img} alt='img not found' width='200px' height='200px' />           
        </div>
    )
}