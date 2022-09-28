import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../cssModule/Landing.module.css';

export default function Landing() {
    return(
        <React.Fragment>
            <div className={styles.background} >
                <div className={styles.logo}>
                    <img className={styles.img} src='https://vignette.wikia.nocookie.net/vsbattles/images/1/14/Logo_Pokemon.png/revision/latest?cb=20160807031552' alt='img not found'/>
                    <NavLink className={styles.button} to={'/home'}>Home
                        {/* <button className={styles.button}>Home</button> */}
                    </NavLink>
                </div>

            </div>
        </React.Fragment>
    )
}

// Como componente de clase

// export default class Landing extends React.Component {
//     // No tiene estado local, entonces no uso constructor

//     render(){
//         return(
//             <React.Fragment>
//                 <ul>
//                     <li>
//                         <NavLink to={'/home'}>Home
//                             <button>Ingresar</button>
//                         </NavLink>
//                     </li>
//                 </ul>
//                 <img src='https://www.gamebyte.com/wp-content/uploads/2018/08/Pokemon.jpg' alt='img not found' height='500px'/>

//         </React.Fragment>
//         )
//     }
// }
    



