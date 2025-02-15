import { useState , useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import LandingContent from './components/Landing'
import Events from './components/Events'
import EventWidget from './components/EventWidget'
import 'leaflet/dist/leaflet.css';
import { Button } from '@mui/material'

function App() {

  const [showEvents, setShowEvents] = useState(false)
  const [count, setCount] = useState("");

  const fetchMap = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/map');
      const itemData = await response.json();
      setCount(itemData);
    }
    catch(error){console.log(error)}
  }

  useEffect(() => {
    fetchMap();
  }, []);

  const handleClick = () => {
    alert("Button clicked!");
    fetchMap();
    console.log(count);
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
