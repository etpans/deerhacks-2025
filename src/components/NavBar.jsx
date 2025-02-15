import { useState } from 'react';
import { Button } from '@mui/material'; // Import Material UI Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function NavBar({showEvents, onShowEvents, onShowHome}) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className={`navbar-wrapper ${showEvents ? 'navbar-normal' : 'navbar-absolute'}`}>
            <div className="navbar-left">
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onShowHome(); }}>
                    <span className="logo-primary">U</span>nite<span className="logo-primary"><sup>TM</sup></span>
                </a>
                <ul className="navbar-links" style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                        <a href="#" className="navbar" onClick={(e) => { e.preventDefault(); onShowEvents(); }}>Events</a>
                    </li>
                    <li>
                        <a href="https://github.com/etpans/deerhacks-2025" target='_blank' className="navbar">About</a>
                    </li>
                </ul>
            </div>
            {/* <div className="navbar-right">
                <Button onClick={toggleMode} className="navbar-button" variant="outlined" color="primary">
                    {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                </Button>
                <Button className="navbar-button" variant="contained" color="primary">
                    Login
                </Button>
            </div> */}
        </nav>
    );
};

export default NavBar;
