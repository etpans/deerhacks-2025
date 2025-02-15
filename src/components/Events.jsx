import Map from "./Map";

function Events({ children }) {
    return (
        <div className="event-wrapper">
            <div className="events-left">
                <div className="event-column-title title">Current Events</div>
                {children}
            </div>
            <div className="events-right">
                <Map></Map>
            </div>
        </div>
        
    );   
}

export default Events;
