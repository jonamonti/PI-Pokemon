import React from 'react';
import styles from '../cssModule/Paginated.module.css';

export default function Paginated({pokemonsPerPage, allPokemons, paginated}) { // 12, 18, fn

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <section>
                {
                    pageNumbers?.map( (number) => {
                        return(
                                <button className={styles.button} key={number} onClick={ () => {paginated(number)}}>{number}</button>
                            )
                    })
                }
            </section>
        </nav>
    )
}