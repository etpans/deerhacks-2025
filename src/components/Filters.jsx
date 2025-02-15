import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null); // State for the start date
  const [endDate, setEndDate] = useState(null); // State for the end date

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStartTimeChange = (e) => setStartTime(e.target.value);
  const handleEndTimeChange = (e) => setEndTime(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  return (
    <div className="filter-wrapper">
      <div className="filter-title title" onClick={toggleDropdown}>
        Event Filters
        <FontAwesomeIcon style={{ float: 'right' }} icon={isOpen ? faCaretUp : faCaretDown} />
      </div>
      <div className="dropdown">
        {isOpen && (
          <ul className="filter-list">
            <li>
              <label htmlFor="startDate">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Start Date"
                className="date-picker-input"
              />
            </li>
            <li>
              <label htmlFor="endDate">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select End Date"
                className="date-picker-input"
              />
            </li>
            <li>
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
                step="3600" // Hourly steps
                placeholder="hh:mm am/pm"
              />
            </li>
            <li>
              <label htmlFor="endTime">End Time:</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
                step="3600" // Hourly steps
                placeholder="hh:mm am/pm"
              />
            </li>
            <li>
              <label htmlFor="location">Location:</label>
              <select
                id="location"
                value={location}
                onChange={handleLocationChange}
              >
                <option value="">Select Location</option>
                <option value="mn">MN</option>
                <option value="kn">KN</option>
                <option value="cc">CC</option>
                <option value="ib">IB</option>
                <option value="dh">DH</option>
                <option value="dv">DV</option>
              </select>
            </li>
            <li>
              <input type="text" placeholder="Enter custom filter" />
            </li>
            <Button
              variant="contained"
              sx={{
                fontFamily: "Sen", // Custom font
                backgroundColor: "#06169c", // Button color
                color: "white", // Text color
                fontWeight: "bold", // Bold text
                "&:hover": { 
                  backgroundColor: "#020733", // Hover color
                },
              }}
            >
              Apply Filters
            </Button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;