import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getPokemonById } from '../actions';

export default function PokemonDetail(){
    // const id = props.match.params.id;
    const { id } = useParams();

    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state => state.pokemonDetail);

    const { name, source, types, hp, attack, defense, speed, height, weight, img } = pokemonDetail;

    useEffect(() => {
        dispatch(getPokemonById(id))
    }, [dispatch, id])

    return(
        <div>
            <div>Id: {id}</div>
            <div>Name: {name}</div>
            <div>Source: {source}</div>
            <div>Type: {types}
                {/* <ul>
                    {
                        types.map( (t) => { return( <li>{t}</li> ) })
                    }
                </ul> */}
            </div>
            <div>HP: {hp}</div>
            <div>Attack: {attack}</div>
            <div>Defense: {defense}</div>
            <div>Speed: {speed}</div>
            <div>Height: {height}</div>
            <div>Weight: {weight}</div>
            <img src={img} alt='img not found' width='200px' height='200px' /><br/>
            <NavLink to={'/home'}>
                <button>Home</button>
            </NavLink>
        </div>
    )

}
/**
 * 
 * key={p.id} name={p.name} abilities={p.abilities} img={p.img} type={p.type} 
                            hp={p.hp} attack={p.attack} defense={p.defense} speed={p.speed} 
                            height={p.height} weight={p.weight} />

 */