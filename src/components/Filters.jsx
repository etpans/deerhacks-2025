import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Dropdown = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleApplyFilters = () => {
    const filters = {
      startDate,
      endDate,
      startTime,
      endTime,
      location
    };
    // Call the callback function with the current filter values
    console.log(filters)
    // onApplyFilters(filters);
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-title title" onClick={toggleDropdown}>
        Event Filters
        <FontAwesomeIcon style={{ float: 'right' }} icon={isOpen ? faCaretUp : faCaretDown} />
      </div>
      {isOpen && (
        <div className="dropdown">
          <ul className="filter-list">
            <li>
              <label htmlFor="startDate">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Start Date"
                className="input-field"
              />
            </li>
            <li>
              <label htmlFor="endDate">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select End Date"
                className="input-field"
              />
            </li>
            <li>
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                step="3600"
                placeholder="hh:mm am/pm"
                className="input-field"
              />
            </li>
            <li>
              <label htmlFor="endTime">End Time:</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                step="3600"
                placeholder="hh:mm am/pm"
                className="input-field"
              />
            </li>
            <li>
              <label htmlFor="location">Location:</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
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
            <Button
              variant="contained"
              sx={{
                fontFamily: "Sen",
                backgroundColor: "#06169c",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#020733" },
              }}
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="contained"
              sx={{
                fontFamily: "Sen",
                backgroundColor: "#06169c",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#020733" },
              }}
              onClick={handleApplyFilters}
            >
              Clear Filters
            </Button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
