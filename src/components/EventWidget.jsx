import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart, faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import Filters from './Filters';
import Search from './Search';

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
  const [likedEvents, setLikedEvents] = useState({});

  const toggleLike = (eventId) => {
    setLikedEvents(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId]
    }));
    console.log(`Event with ID ${eventId} was ${likedEvents[eventId] ? 'unliked' : 'liked'}`); // Callback action
  };

  return (
    <>
      <Search />
      <Filters />
      <div className="event-results title">
        Results: {events.length}
      </div>
      <div className="scrollable-container">
        {events.map(event => (
          <div key={event.id} className="event-widget-wrapper" style={{ position: 'relative' }}>
            <div className="event-widget-content">
              <div className="event-widget-title title">
                {event.title}
                <button 
                    onClick={() => toggleLike(event.id)} 
                    className="like-button"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '1px', // Adjust this value to move the heart up or down
                        right: '10px', // Adjust this value to move the heart left or right
                        transform: 'scale(1)', // Optional: Adjusts the size of the heart
                    }}
                    >
                    <FontAwesomeIcon 
                        icon={likedEvents[event.id] ? filledHeart : emptyHeart} 
                        style={{ 
                        color: likedEvents[event.id] ? 'red' : 'gray', 
                        fontSize: '24px' 
                        }} 
                    />
                    </button>

              </div>
              <div className="event-widget-date">{event.date}</div>
              <div className="event-widget-description">{event.description}</div>
              <div className="event-widget-location">{event.location}</div>
              <a href={event.hyperlink} target="_blank" rel="noopener noreferrer" className="event-widget-link">More Info</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventWidget;
