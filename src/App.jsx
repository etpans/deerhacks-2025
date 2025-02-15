import { useState , useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import LandingContent from './components/Landing'
import Events from './components/Events'
import EventWidget from './components/EventWidget'
import 'leaflet/dist/leaflet.css';
import EventWidget from './components/EventWidget';

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
            <NavBar 
                showEvents={showEvents}  // Pass state to change navbar position
                onShowEvents={() => setShowEvents(true)} 
                onShowHome={() => setShowEvents(false)}
            />
            {showEvents ? (
              <Events onBack={() => setShowEvents(false)} >
                  <EventWidget/>
                </Events>
            ) : (
                <LandingContent onShowEvents={() => setShowEvents(true)} />
            )}
        </>
    );
}

export default App;
