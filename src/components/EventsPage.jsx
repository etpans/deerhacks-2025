import React from 'react';
import EventWidget from './EventWidget'; // Assuming the EventWidget is in a separate file

function EventsPage() {
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
            title: "AI Summit 2025", 
            date: "May 20, 2025", 
            description: "AI and machine learning experts meet",
            location: "New York, NY",
            hyperlink: "https://aisummit2025.com"
        },
        // Add more events as needed
    ];

    return (
        <div className="events-page">
            <div className="events-scroller">
                {events.map(event => (
                    <EventWidget key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}

export default EventsPage;
