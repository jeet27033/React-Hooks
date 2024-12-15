import * as React from 'react';
import { PokemonForm } from '../pokemon';
import { ErrorBoundary } from 'react-error-boundary';


const fetchPokemon = (pokemonName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pokemonName.toLowerCase() === 'pikachu') {
        resolve({ name: 'Pikachu', image: 'pikachu.png' });
      } else {
        reject(new Error('Pokémon not found')); 
      }
    }, 1000);
  });
};

const PokemonInfoFallback = ({ name }) => {
  return <div>Loading Pokémon info for {name}...</div>;
};

const PokemonDataView = ({ pokemon }) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
};

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  });

  React.useEffect(() => {
    if (!pokemonName) {
      setState({ status: 'idle', pokemon: null, error: null });
      return;
    }

    setState({ status: 'pending', pokemon: null, error: null });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({ status: 'resolved', pokemon: pokemonData, error: null });
      })
      .catch((error) => {
        setState({ status: 'rejected', pokemon: null, error });
      });
  }, [pokemonName]);

  if (state.status === 'idle') {
    return 'Submit a Pokémon';
  }

  if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  }

  if (state.status === 'rejected') {
    throw state.error; 
  }

  if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />;
  }

  return null;
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <div role="alert">
            There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        )}
        onReset={() => setPokemonName('')} 
        resetKeys={[pokemonName]} 
      >
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;