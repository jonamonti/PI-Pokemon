import React from 'react';
import { NavLink } from 'react-router-dom';

// export default function Home() {
//     return(
        // <React.Fragment>
        //     <img href='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png' alt='img not found'/>
        //     <ul>
        //         <li>
        //             <NavLink to={'/home'}>Home</NavLink>
        //         </li>
        //     </ul>
        // </React.Fragment>
//     )
// }

// Como componente de clase

export default class OtherPaths extends React.Component {
    // No tiene estado local, entonces no uso constructor

    render(){
        return(
            <React.Fragment>
                <ul>
                    <li>
                        <NavLink to={'/home'}>
                            <h1>NO ES UNA RUTA VALIDA!</h1>
                            <button>back home!</button>
                        </NavLink>
                    </li>
                </ul>
                <img src='https://www.skipser.com/test/trex-game/promotion/trex-chrome-game.png' alt='img not found' height='500px'/>

        </React.Fragment>
        )
    }
}
    



