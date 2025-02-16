import { useState , useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import LandingContent from './components/Landing'
import Events from './components/Events'
import EventWidget from './components/EventWidget'
import 'leaflet/dist/leaflet.css';

function App() {
    const [showEvents, setShowEvents] = useState(false);
    const [count, setCount] = useState("");
    let data = [];
    let counting = 0;

    const fetchMap = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000');
        const itemData = await response.json();
        setCount(itemData);
        data = count;
        console.log(data);
      }
      catch(error){console.log(error)}
    }

    useEffect(() => {
      fetchMap();
    }, []);

    // if (counting < 1){
    //   fetchMap();
    //   counting += 1;
    // }
      


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
