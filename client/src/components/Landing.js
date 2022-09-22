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

export default class Landing extends React.Component {
    // No tiene estado local, entonces no uso constructor

    render(){
        return(
            <React.Fragment>
                <ul>
                    <li>
                        <NavLink to={'/home'}>Home
                            <button>Ingresar</button>
                        </NavLink>
                    </li>
                </ul>
                <img src='https://www.gamebyte.com/wp-content/uploads/2018/08/Pokemon.jpg' alt='img not found' height='500px'/>

        </React.Fragment>
        )
    }
}
    



