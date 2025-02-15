import { useState } from 'react';
import { Button } from '@mui/material'; // Import Material UI Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>My Navbar</h1>
                <ul className="navbar-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#events">Events</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </div>
            <div className="navbar-right">
                <Button onClick={toggleMode} className="navbar-button" variant="outlined" color="primary">
                    {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                </Button>
                <Button className="navbar-button" variant="contained" color="primary">
                    Login
                </Button>
            </div>
        </nav>
    );
};

export default NavBar;
