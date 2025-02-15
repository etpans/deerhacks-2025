
const events = [
    { 
        id: 1, 
        title: "Tech Conference 2025", 
        date: "March 10, 2025", 
        description: "A global conference on emerging technologies",
        location: "San Francisco, CA",
        hyperlink: "https://techconference2025.com"
    }
];

function EventWidget() {
    return (
        <div className="event-widget-wrapper">
            <div className="event-widget-content">
                <div className="event-widget-title title">{events[0].title}</div>
                <div className="event-widget-date">{events[0].date}</div>
                <div className="event-widget-description">{events[0].description}</div>
                <div className="event-widget-location">{events[0].location}</div>
                <a href={events[0].hyperlink} target="_blank" rel="noopener noreferrer" className="event-widget-link">More Info</a>
            </div>
        </div>
    );
}

export default EventWidget;
