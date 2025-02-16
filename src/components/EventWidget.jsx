import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart, faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import Filters from './Filters';
import Search from './Search';

const eventsData = [
  { id: 1, title: "Tech Conference 2025", date: "March 10, 2025", description: "A global conference on emerging technologies", location: "San Francisco, CA", hyperlink: "https://techconference2025.com" },
  { id: 2, title: "AI Summit 2025", date: "April 15, 2025", description: "Discussing the future of artificial intelligence", location: "New York, NY", hyperlink: "https://aisummit2025.com" },
  { id: 3, title: "Blockchain Expo", date: "June 20, 2025", description: "Exploring the latest in blockchain technology", location: "Los Angeles, CA", hyperlink: "https://blockchainexpo2025.com" }
];

function EventWidget() {
  const [likedEvents, setLikedEvents] = useState({});
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [showFavourites, setShowFavourites] = useState(false);

  // Load stored likes on mount
  useEffect(() => {
    const storedLikes = localStorage.getItem('likedEvents');
    if (storedLikes) {
      setLikedEvents(JSON.parse(storedLikes));
    }
  }, []);

  // Toggle like/unlike event and update storage
  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => {
      const updatedLikes = { ...prevState, [eventId]: !prevState[eventId] };
      localStorage.setItem('likedEvents', JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  // Handle search filter
  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredEvents(eventsData);
    } else {
      const filtered = eventsData.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  // Toggle favourite filter
  const toggleFavourites = () => {
    setShowFavourites(prevState => !prevState);
  };

  // Apply favourite filter
  const displayedEvents = showFavourites
    ? filteredEvents.filter(event => likedEvents[event.id])
    : filteredEvents;

  return (
    <>
      <Search onSearch={handleSearch} />
      <Filters />
      <div className="event-results title">
        Results: {displayedEvents.length} 
        <button 
          onClick={toggleFavourites} 
          className="favourites-toggle-button"
          style={{
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginLeft: '15px'
          }}
        >
          {showFavourites ? "Show All Events" : "Show Favourites"}
        </button>
      </div>
      <div className="scrollable-container">
        {displayedEvents.map(event => (
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
                    top: '1px',
                    right: '10px',
                    transform: 'scale(1)',
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
