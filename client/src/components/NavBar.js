import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

    return(
        <React.Fragment>
        <nav>
            <ul>
                <li>
                    <NavLink to={'/createPokemon'}>Create Pokemon</NavLink>
                </li>
                <li>
                    <NavLink to={'/'}>Landing</NavLink>
                </li>
            </ul>
            <label>Search
                <input type='text' placeholder='Type Pokemon name'></input>
            </label>
        </nav>
        </React.Fragment>
    )

}

export default NavBar;
