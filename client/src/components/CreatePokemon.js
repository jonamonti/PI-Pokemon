// imports
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPokemon } from '../actions';
import { useSelector } from 'react-redux';

// export default function CreatePokemon({createPokemon}){
function CreatePokemon({createPokemon}) {

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
        type:'',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:''
    });

    let [disabled, setDisabled] = useState(true);

    // hooks ---------------------------------------------------------
    const typeList = useSelector(state => state.typeList);
    const allPokemons = useSelector(state => state.allPokemons);

    // functions ---------------------------------------------------------
    let validateInput = (inputName, inputValue) => {
        if (inputName === 'name') {
            let allPokemonsNames = allPokemons.map( el => el.name);
            if(/\d|\s|\W/.test(inputValue)) {
                setError({...error, [inputName]: 'Numbers and special characters are not allowed on name'})
            } else if (allPokemonsNames.includes(inputValue)){
                setError({...error, [inputName]: 'This name already exists!'})
            } else {
                setError({...error, [inputName]:''});
            }
            setInput({...input, [inputName]: inputValue});
        }

        const numbers = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];
        if (numbers.includes(inputName)) {

            if(['height', 'weight'].includes(inputName)) {
                if (inputValue && !/^[1-9][0-9]?[0-9]?$|^1000$/.test(inputValue)) {
                    setError({...error, [inputName]: `${inputName} is a number between 1 and 1000!`})
                } else {
                    setError({...error, [inputName]: ''})
                }
                setInput({...input, [inputName]: inputValue})
            } else {
                if (inputValue && !/^[1-9][0-9]?$|^100$/.test(inputValue)) {
                    setError({...error, [inputName]: `${inputName} is a number between 1 and 100!`})
                } else {
                    setError({...error, [inputName]: ''})
                }
                setInput({...input, [inputName]: inputValue})
            }
        }

        if (inputName === 'img') {
            if (inputValue && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(inputValue)) {
                setError({...error, [inputName]: 'Only jpg, jpeg, png, webp, avif, gif or svg url!'})
            } else {
                setError({...error, [inputName]:''})
            }
            setInput({...input, [inputName]: inputValue})
        }
    };

    let buttonEnabler = () => {
        let formInputs = Object.values(input).map( (e) => !!e ).reduce( (prev, curr) => (prev + curr));
        let formErrors = Object.values(error).map( (e) => !!e ).reduce( (prev, curr) => (prev + curr));
        console.log(`--- formInputs ---${formInputs}\n ---formErrors---${formErrors}\n --- disabled ---${disabled}`)

        if (formInputs === 9 && formErrors === 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    // let handleDelete = (e) => {
    //     setInput({...input, type: input.type?.filter((t) => t !== e.target.value)});
    // };

    let handleChange = (e) => {
        buttonEnabler();
        // console.log(e.target.name, e.target.value);
        setInput((prev) => ({...prev, [e.target.name]: e.target.value}));
        validateInput(e.target.name, e.target.value);
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
        console.log(input);
        createPokemon(input);
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
        })
    }

    // render ---------------------------------------------------------
    return(
        <React.Fragment>
            <h1>Create your Pokemon!!</h1>
            <br/>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type={'text'} name={'name'} value={input.name} onChange={handleChange} onFocus={buttonEnabler}/>
                    {
                        !input.name ? <span>Only letters!</span> : null
                    }
                    {
                        !error.name ? null : <span>&#10060;{error.name}</span>
                    }
                </div>
                <div>
                    <label>Image</label>
                    <input type={'text'} name={'img'} value={input.img} onChange={handleChange} onFocus={buttonEnabler}/>
                {
                    !input.img ? <span>Add a link to a jpg, jpeg, png, webp, avif, gif or svg image!</span> : null
                }
                {
                    !error.img ? null : <span>&#10060;{error.img}</span>
                }
                </div>
                <div>
                    <label> Types</label>
                    <select name='type' onChange={handleSelect}>
                        <option key='all' value='all'>All</option>
                        {
                            typeList?.map( (el,i) => {
                                return(
                                    <option key={i} value={el} >{el}</option>
                                )
                            })
                        }
                    </select>
                    {/* {
                        input.type?.map( (el, i) => {
                            return(
                                <div key={i}>{el}<button value={el} onClick={handleDelete} >X</button>
                                </div>
                            )
                        })
                    } */}
                </div>
                <div>
                    <label>HP</label>
                    <input type={'text'} name={'hp'} value={input.hp} onChange={handleChange} onFocus={buttonEnabler}/>
                {
                    !input.hp ? <span>number between 1 and 100</span> : null
                }
                {
                    !error.hp ? null : <span>&#10060;{error.hp}</span>
                }
                </div>
                <div>
                    <label>Attack</label>
                    <input type={'text'} name={'attack'} value={input.attack} onChange={handleChange} onFocus={buttonEnabler}/>
                {
                    !input.attack ? <span>number between 1 and 100</span> : null
                }
                {
                    !error.attack ? null : <span>&#10060;{error.attack}</span>
                }
                </div>
                <div>
                    <label>Defense</label>
                    <input type={'text'} name={'defense'} value={input.defense} onChange={handleChange} onFocus={buttonEnabler}/>
                {
                    !input.defense ? <span>number between 1 and 100</span> : null
                }
                {
                    !error.defense ? null : <span>&#10060;{error.defense}</span>
                }
                </div>
                <div>
                    <label>Speed</label>
                    <input type={'text'} name={'speed'} value={input.speed} onChange={handleChange} onFocus={buttonEnabler}/>
                {
                    !input.speed ? <span>number between 1 and 100</span> : null
                }
                {
                    !error.speed ? null : <span>&#10060;{error.speed}</span>
                }
                </div>
                <div>
                    <label>Height</label>
                    <input type={'text'} name={'height'} value={input.height} onChange={handleChange} onFocus={buttonEnabler}/>
                {
                    !input.height ? <span>number between 1 and 1000</span> : null
                }
                {
                    !error.height ? null : <span>&#10060;{error.height}</span>
                }
                </div>
                <div>
                    <label>Weight</label>
                    <input type={'text'} name={'weight'} value={input.weight} onChange={handleChange} onFocus={buttonEnabler}/>
                {
                    !input.weight ? <span>number between 1 and 1000</span> : null
                }
                {
                    !error.weight ? null : <span>&#10060;{error.weight}</span>
                }
                </div>
                <br/>
                <input disabled={disabled} type={'submit'} value={'CREATE'}/>
            </form>
            <NavLink to={'/home'} >
                <button>Home</button>
            </NavLink>

        </React.Fragment>
    )
}
// si no uso hooks para hacer el dispatch del action, uso connect

function mapDispatchToProps(dispatch){
    return{
        createPokemon: (input) => dispatch(createPokemon(input))
    }
}

export default connect(null, mapDispatchToProps)(CreatePokemon);