import React from 'react';

export default function Paginated({pokemonsPerPage, allPokemons, paginated}) {

    const pageNumbers = [];
    for(let i = 1; i < Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul>
                {
                    pageNumbers?.map( (number) => {
                        return(
                            <li key={number}>
                                <a onClick={ () => {paginated(number)}}>{number}</a>
                            </li>)
                    })
                }
            </ul>
        </nav>
    )
}