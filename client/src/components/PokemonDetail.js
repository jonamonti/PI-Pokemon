import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getPokemons, getPokemonById, cleanPokemonDetail, deletePokemon } from '../actions';
import styles from '../cssModule/PokemonDetail.module.css';

export default function PokemonDetail(){
    // const id = props.match.params.id;
    const { id } = useParams();

    const dispatch = useDispatch();
    const history = useHistory();
    const pokemonDetail = useSelector(state => state.pokemonDetail);

    let { name, source, types, hp, attack, defense, speed, height, weight, img } = pokemonDetail;

    useEffect(() => {
        dispatch(getPokemonById(id))
    }, [dispatch, id])

    const handleClick = () => {
        dispatch(cleanPokemonDetail());
    }

    const handleDelete = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        dispatch(deletePokemon(e.target.value));
        dispatch(getPokemons());
        alert("Your pokemon has been successfully deleted");
        history.push('/home');
    }

    const defaultImg = 'https://image.pngaaa.com/250/96250-middle.png';

    return(
        <div className={styles.general}>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img  className={styles.img} src={!img ? defaultImg : img} alt='...loading' width='200px' height='200px'/><br/>
                </div>
                <div className={styles.info}>
                    <h1 className={styles.h1}>{name}</h1>     
                    <div>Id: {id}</div>
                    <div>Source: {source}</div>
                    <div>Type
                        <ul>
                            {
                                types?.map( (t,i) => { return( <li key={i}>{t}</li> ) })
                            }
                        </ul>
                    </div>
                    <div>HP: {hp}</div>
                    <div>Attack: {attack}</div>
                    <div>Defense: {defense}</div>
                    <div>Speed: {speed}</div>
                    <div>Height: {height}</div>
                    <div>Weight: {weight}</div>
                    {
                        source === 'database' 
                            ? <button className={styles.deleteButton} type='button' name={name} value={id} onClick={(e) => handleDelete(e)}> &#10060; </button>
                            : null
                    }
                    
                    <NavLink to={'/home'}>
                        <button className={styles.button} onClick={() => handleClick()}>&#127969;</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}