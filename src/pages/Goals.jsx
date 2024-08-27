import React, { useState } from 'react';
import '../Style/Goals.css';

const Goals = () => {
  const [steps, setSteps] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!steps || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }
  
    if (isNaN(steps) || steps <= 0) {
      setError('Invalid number of steps');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ steps, start_date: startDate, end_date: endDate }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add goal');
      }
  
      const result = await response.json();
      console.log('Goal added:', result);
      setSuccess('Goal added successfully!');
      setSteps('');
      setStartDate('');
      setEndDate('');
      setError('');
    } catch (err) {
      console.error('Error adding goal:', err);
      setError(err.message);
    }
  };
  
  return (
    <div>
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Steps:</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Goal</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Goals;
