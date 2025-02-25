import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LandingContent from './components/Landing';
import Events from './components/Events';
import 'leaflet/dist/leaflet.css';
import EventWidget from './components/EventWidget';

function App() {
    // Check localStorage for saved state on initial render
    const savedTabState = localStorage.getItem('showEvents');
    const [showEvents, setShowEvents] = useState(savedTabState === 'true');

    useEffect(() => {
        // Store the tab state in localStorage whenever it changes
        localStorage.setItem('showEvents', showEvents);
    }, [showEvents]);

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
