import React from 'react';

const events = [
    { 
        id: 1, 
        title: "Tech Conference 2025", 
        date: "March 10, 2025", 
        description: "A global conference on emerging technologies",
        location: "San Francisco, CA",
        hyperlink: "https://techconference2025.com"
    },
    { 
        id: 2, 
        title: "Tech Conference 2025", 
        date: "March 10, 2025", 
        description: "A global conference on emerging technologies",
        location: "San Francisco, CA",
        hyperlink: "https://techconference2025.com"
    },
    { 
        id: 3, 
        title: "Tech Conference 2025", 
        date: "March 10, 2025", 
        description: "A global conference on emerging technologies",
        location: "San Francisco, CA",
        hyperlink: "https://techconference2025.com"
    }
];

function EventWidget() {
    return (
        <div className="scrollable-container">
            {events.map(event => (
                <div key={event.id} className="event-widget-wrapper">
                    <div className="event-widget-content">
                        <div className="event-widget-title title">{event.title}</div>
                        <div className="event-widget-date">{event.date}</div>
                        <div className="event-widget-description">{event.description}</div>
                        <div className="event-widget-location">{event.location}</div>
                        <a href={event.hyperlink} target="_blank" rel="noopener noreferrer" className="event-widget-link">More Info</a>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EventWidget;
