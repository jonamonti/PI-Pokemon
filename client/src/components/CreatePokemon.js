// imports
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createPokemon, cleanPokemons } from '../actions';
import { useSelector } from 'react-redux';
import styles from '../cssModule/CreatePokemon.module.css'

export default function CreatePokemon(){

    // local states
    let [input, setInput] = useState({
        name:'',
        img:'',
        type:[],
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'', 
        weight:''
    });

    let [error, setError] = useState({
        name:'',
        img:'',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:''
    });

    // hooks ---------------------------------------------------------
    const typeList = useSelector(state => state.typeList);
    const allPokemons = useSelector(state => state.allPokemons);
    const dispatch = useDispatch();
    const history = useHistory();

    // functions ---------------------------------------------------------

    let validateInput = (inputName, inputValue) => {
        if (inputName === 'name') {
            let allPokemonsNames = allPokemons.map( el => el.name);
            if(/\d|\s|\W/.test(inputValue)) {
                setError({...error, [inputName]: 'Numbers and special characters are not allowed on name'});
            } else if (allPokemonsNames.includes(inputValue.toLowerCase())){
                setError({...error, [inputName]: 'This name already exists!'});
            } else {
                setError({...error, [inputName]:''});
            }
        }

        const numbers = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];
        if (numbers.includes(inputName)) {

            if(['height', 'weight'].includes(inputName)) {
                if (inputValue && !/^[1-9][0-9]?[0-9]?$|^1000$/.test(inputValue)) {
                    setError({...error, [inputName]: `${inputName} is a number between 1 and 1000!`});
                } else {
                    setError({...error, [inputName]: ''});
                }
            } else {
                if (inputValue && !/^[1-9][0-9]?$|^100$/.test(inputValue)) {
                    setError({...error, [inputName]: `${inputName} is a number between 1 and 100!`});
                } else {
                    setError({...error, [inputName]: ''});
                }
            }
        }

        if (inputName === 'img') {
            if (inputValue && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(inputValue)) {
                setError({...error, [inputName]: 'Only jpg, jpeg, png, webp, avif, gif or svg url!'});
            } else {
                setError({...error, [inputName]:''});
            }
        }
    };

    let buttonEnabler = () => {
        let {type, ...inputs} = input;
        let formInputs = Object.values(inputs).map( (e) => !!e ).reduce( (prev, curr) => (prev + curr));
        let formErrors = Object.values(error).map( (e) => !!e ).reduce( (prev, curr) => (prev + curr));

        if (formInputs === 8 && formErrors === 0 && input.type.length > 0) {
            return false;
        } else {
            return true;
        }
    };

    let handleDelete = (e) => {
        e.preventDefault();
        setInput({...input, type: input.type?.filter((t) => t !== e.target.value)});
    };

    let handleChange = (e) => {
        validateInput(e.target.name, e.target.value);
        setInput((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    let handleSelect = (e) => {
        if (!input.type.includes(e.target.value)) {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPokemon(input));
        setInput({
            name:'',
            abilities:'',
            img:'',
            type:'',
            hp:'',
            attack:'',
            defense:'',
            speed:'',
            height:'',
            weight:''
        });
        dispatch(cleanPokemons());
        alert("Your pokemon has been successfully created");
        history.push('/home');
    }

    // render ---------------------------------------------------------
    return(
    <React.Fragment>
        <div className={styles.background}> 
            <h1 className={styles.h1}>Create your Pokemon!!</h1>
            <br/>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <div>
                    <label className={styles.label}>Name</label>
                    <input className={styles.input} type='text' name={'name'} value={input.name} placeholder='Only letters!'
                            onChange={handleChange}/>
                    {
                        !error.name ? null : <span className={styles.spanError}> &#10060; {error.name}</span>
                    }
                </div>
                <div>
                    <label className={styles.label}>Image</label>
                    <input className={styles.input} type='text' name={'img'} value={input.img} placeholder='Link to your image'
                            onChange={handleChange}/>
                {
                    !error.img ? null : <span className={styles.spanError}> &#10060; {error.img}</span>
                }
                </div>
                <div>
                    <label className={styles.label}> Types</label>
                    <select className={styles.input} defaultValue='default' name='type' onChange={handleSelect}>
                        <option key='all' value='default' disabled>Please select</option>
                        {
                            typeList?.map( (el,i) => {
                                return(
                                    <option key={i} value={el} >{el}</option>
                                )
                            })
                        }
                    </select>
                    {
                        input.type.length ? null : <span className={styles.spanError}> &#10060; Select a type!</span>
                    }
                    <ul>
                        {
                            input.type?.map( (el, i) => {
                                return(
                                    <li key={i} value={el} >{el}<button key={i} value={el} onClick={handleDelete} >x</button></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>
                    <label className={styles.label}>Hp</label>
                    <input className={styles.input} type='number' name={'hp'} value={input.hp} placeholder='number between 1 and 100'
                            onChange={handleChange}/>
                {
                    !error.hp ? null : <span className={styles.spanError}> &#10060; {error.hp}</span>
                }
                </div>
                <div>
                    <label className={styles.label}>Attack</label>
                    <input className={styles.input} type='number' name={'attack'} value={input.attack} placeholder='number between 1 and 100'
                            onChange={handleChange}/>
                {
                    !error.attack ? null : <span className={styles.spanError}> &#10060; {error.attack}</span>
                }
                </div>
                <div>
                    <label className={styles.label}>Defense</label>
                    <input className={styles.input} type='number' name={'defense'} value={input.defense} placeholder='number between 1 and 100'
                            onChange={handleChange}/>
                {
                    !error.defense ? null : <span className={styles.spanError}> &#10060; {error.defense}</span>
                }
                </div>
                <div>
                    <label className={styles.label}>Speed</label>
                    <input className={styles.input} type='number' name={'speed'} value={input.speed} placeholder='number between 1 and 100'
                            onChange={handleChange}/>
                {
                    !error.speed ? null : <span className={styles.spanError}> &#10060; {error.speed}</span>
                }
                </div>
                <div>
                    <label className={styles.label}>Height</label>
                    <input className={styles.input} type='number' name={'height'} value={input.height} placeholder='number between 1 and 1000'
                            onChange={handleChange}/>
                {
                    !error.height ? null : <span className={styles.spanError}> &#10060; {error.height}</span>
                }
                </div>
                <div>
                    <label className={styles.label}>Weight</label>
                    <input className={styles.input} type='number' name={'weight'} value={input.weight} placeholder='number between 1 and 1000'
                            onChange={handleChange}/>
                {
                    !error.weight ? null : <span className={styles.spanError}> &#10060; {error.weight}</span>
                }
                </div>
                <br/>
                <input disabled={buttonEnabler()} type={'submit'} value={'CREATE'}/>
                <NavLink to={'/home'} >
                    <button className={styles.button}>Home</button>
                </NavLink>
            </form>
        </div>

    </React.Fragment>
    )
}
// si no uso hooks para hacer el dispatch del action, uso connect

// function mapDispatchToProps(dispatch){
//     return{
//         createPokemon: (input) => dispatch(createPokemon(input))
//     }
// }

// export default connect(null, mapDispatchToProps)(CreatePokemon);