import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LandingContent from './components/Landing';
import Events from './components/Events';
import 'leaflet/dist/leaflet.css';
import EventWidget from './components/EventWidget';

function App() {
    const [showEvents, setShowEvents] = useState(false);

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
