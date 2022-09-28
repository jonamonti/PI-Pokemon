import React from 'react';
// import { Link } from 'react-router-dom';
import styles from '../cssModule/PokemonCard.module.css';
import { NavLink } from 'react-router-dom';

export default function PokemonCard({name, img, types, id}){
    return(
        <div className={styles.card}>
            <NavLink className={styles.span} to={`/home/${id}`}>
                <span>{name}</span>
            </NavLink>
            <section>
                <div className={styles.label}>Type<br/>
                    {
                        types?.map((t,i) => {
                            return(
                                <span className={styles.value} key={i}>{`- ${t}`}</span>
                            )
                        })
                    }
                </div>
                <img src={img} alt='img not found' width='200px' height='200px'/>    
            </section>
        </div>
    )
}