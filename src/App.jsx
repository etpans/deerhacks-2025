import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import LandingContent from './components/Landing'
import Events from './components/Events'
import EventWidget from './components/EventWidget'
import 'leaflet/dist/leaflet.css';
import { Button } from '@mui/material'

function App() {
  const [showEvents, setShowEvents] = useState(false)

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <>
      <NavBar />
  
      {/* temporary visual */}
      <Events>
        <EventWidget />
      </Events>
      <Button variant="contained" color="primary" onClick={handleClick}>this</Button>
    </>
  )
}

// {showEvents ? (
//   <Events>
//     {/* <EventDetails /> Wrapped inside Events */}
//   </Events>
// ) : (
//   <LandingContent onShowEvents={() => setShowEvents(true)} />
// )}

export default App
