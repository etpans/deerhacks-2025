import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart, faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Filters';
import Search from './Search';

function EventWidget() {
  const [likedEvents, setLikedEvents] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [filters, setFilters] = useState({ startDate: null, endDate: null, startTime: '', endTime: '', location: '' });

  const fetchMap = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/');
      const itemData = await response.json();
      setEventsData(itemData[1]); // Extract the event data from the fetched data
      setFilteredEvents(itemData[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMap();
  }, []);

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedEvents');
    if (storedLikes) {
      setLikedEvents(JSON.parse(storedLikes));
    }
  }, []);

  const toggleLike = (eventName) => {
    setLikedEvents((prevState) => {
      const updatedLikes = { ...prevState, [eventName]: !prevState[eventName] };
      localStorage.setItem('likedEvents', JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const applyFilters = () => {
    let filtered = eventsData;

    if (filters.startDate) {
      filtered = filtered.filter(event => new Date(event.date) >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter(event => new Date(event.date) <= filters.endDate);
    }
    if (filters.startTime) {
      filtered = filtered.filter(event => event.start_time >= filters.startTime);
    }
    if (filters.endTime) {
      filtered = filtered.filter(event => event.end_time <= filters.endTime);
    }
    if (filters.location) {
      filtered = filtered.filter(event => event.loc === filters.location.toUpperCase());
    }

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, eventsData]);

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredEvents(eventsData);
    } else {
      const filtered = eventsData.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const toggleFavourites = () => {
    setShowFavourites(prevState => !prevState);
  };

  const displayedEvents = showFavourites
    ? filteredEvents.filter(event => likedEvents[event.name])
    : filteredEvents;

  return (
    <>
      <Search onSearch={handleSearch} />
      <Dropdown onApplyFilters={setFilters} />
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
          <div key={event.name} className="event-widget-wrapper" style={{ position: 'relative' }}>
            <div className="event-widget-content">
              <div className="event-widget-title title">
                {event.name}
                <button 
                  onClick={() => toggleLike(event.name)} 
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
                    icon={likedEvents[event.name] ? filledHeart : emptyHeart} 
                    style={{ 
                      color: likedEvents[event.name] ? 'red' : 'gray', 
                      fontSize: '24px' 
                    }} 
                  />
                </button>
              </div>
              <div className="event-widget-date">{new Date(event.date).toDateString()}</div>
              <div className="event-widget-description">{event.desc}</div>
              <div className="event-widget-location">Location: {event.loc}</div>
              <div className="event-widget-time">Time: {event.start_time} - {event.end_time}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventWidget;