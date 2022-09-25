// CONFIGURATION
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OtherPaths from './components/OtherPaths';


import './App.css';
// import NavBar from './components/NavBar';
import Landing from './components/Landing';
import CreatePokemon from './components/CreatePokemon';
import Home  from './components/Home';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={'/'} component={Landing}/>
        {/* <Route path={'/home'} component={NavBar}/> */}
        <Route path={'/home/:id'} component={PokemonDetail}/>
        <Route path={'/home'} component={Home}/>
        <Route path={'/createPokemon'} component={CreatePokemon}/>
        <Route path={'*'} component={OtherPaths}/>
      </Switch>
    </React.Fragment>

  );
}

export default App;
