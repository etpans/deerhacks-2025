import React from 'react';
import { Button } from '@mui/material'; // Import Material UI Button

function LandingContent({onShowEvents}) {
    return (
        <>
            <div className="landing-wrapper">
                <div className="landing-box">
                    <h1>Discover Events in UTM</h1>
                    <p>Introducing Unite UTM—your centralized platform for all events happening at UTM!  
                        Whether you're looking for academic talks, club socials, networking opportunities, or sports events,  
                        Unite UTM keeps you in the loop.</p>
                    <p>Browse upcoming events, RSVP with ease, and never miss out on what’s happening on campus.</p>
                    <Button
                        variant="contained"
                        sx={{
                            fontFamily: "Sen",
                            backgroundColor: "#06169c",
                            color: "white",
                            fontWeight: "bold",  // Increase font weight
                            "&:hover": { backgroundColor: "#020733" },
                        }}
                        onClick={onShowEvents}
                        >
                        Find Events
                    </Button>
                </div>
            </div>
        </>
    );
};

export default LandingContent;
