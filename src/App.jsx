import { useState } from 'react'
import Sender from './assets/sender'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Sender/>
  )
}

export default App
