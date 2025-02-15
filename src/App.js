import './App.css';
import Button from '@mui/material/Button';
import * as React from 'react';

function ButtonUsage() {
  return <Button variant="contained">Events</Button>;
}

function App() {
  return (
    <div className="App">
      <div className="body-wrapper">
        <div className="img-wrapper">
          <p>
            Discover, Explore, Find.
          </p>
          <a/>
          <ButtonUsage /> {/* Button component included here */}
        </div>
      </div> 
    </div>
  );
}

export default App;
