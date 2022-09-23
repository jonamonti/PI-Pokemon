import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPokemon } from '../actions';

// export default function CreatePokemon(){
    function CreatePokemon({createPokemon}){

    let [input, setInput] = React.useState({
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

    let handleChange = (e) => {
        setInput((prev) => ({...prev, [e.target.name]: e.target.value}))
    };

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

    return(
        <React.Fragment>
            <h1>Create your Pokemon!!</h1>
            <br/>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name</label>
                    <input type={'text'} name={'name'} value={input.name}
                    onChange={(e) => handleChange(e)}/>
                </div>
                {/* <div>
                    <label>Abilities</label>
                    <input type={'text'} name={'abilities'} value={input.abilities}
                    onChange={(e) => handleChange(e)}/>
                </div> */}
                <div>
                    <label>Image</label>
                    <input type={'text'} name={'img'} value={input.img}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Types</label> 
                    {/* aca tengo que hacer un desplegable que muestre la data de Types y me permita seleccionar los que quiero */}
                    <input type={'text'} name={'type'} value={input.type}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>HP</label>
                    <input type={'text'} name={'hp'} value={input.hp}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Attack</label>
                    <input type={'text'} name={'attack'} value={input.attack}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Defense</label>
                    <input type={'text'} name={'defense'} value={input.defense}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Speed</label>
                    <input type={'text'} name={'speed'} value={input.speed}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Height</label>
                    <input type={'text'} name={'height'} value={input.height}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <div>
                    <label>Weight</label>
                    <input type={'text'} name={'weight'} value={input.weight}
                    onChange={(e) => handleChange(e)}/>
                </div>
                <br/>
                <input type={'submit'} value={'CREATE'}/>
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