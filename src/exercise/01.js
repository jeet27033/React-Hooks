// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React,{useState} from 'react'


function Greeting() {
  const[Name,setName] = useState("Jeet");
  function handleChange(event) {
      setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={Name}/>
      </form>
      {Name ? <strong>Hello {Name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
