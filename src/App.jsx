import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import LandingContent from './components/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <LandingContent />
    </>
  )
}

export default App
