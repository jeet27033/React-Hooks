import React from 'react'
import { useLocalStorageState } from './useLocalStorageState.js';

function Greeting() {

  const [name, setName] = useLocalStorageState("name","")

  const handleChange = (event) => {
    setName(event.target.value); 
  };
  
  return (
    <div>
      <form>
        <label>Name: </label>
        <input value={name} onChange={handleChange} />
      </form>
      {name ? <b>Hello {name}</b> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
