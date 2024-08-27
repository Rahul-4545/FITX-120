import React, { useState } from 'react';
import '../Style/Calories.css'; // Import your CSS for styling

const EnterCalories = () => {
  const [calories, setCalories] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/dashboard/add-calories', {  // Updated port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calories: parseInt(calories, 10) }),
      });

      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          setMessage(`Successfully added ${data.totalCalories} kcal for today!`);
        } else {
          setMessage('Failed to add calories.');
        }
      } else {
        setMessage('Failed to add calories. Server returned a non-JSON response.');
      }
    } catch (error) {
      console.error('Error adding calories:', error);
      setMessage('Failed to add calories.');
    }

    setCalories('');
  };

  return (
    <div className="enter-calories-container">
      <h2>Enter Calories Burned Today</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="calories">Calories:</label>
        <input
          type="number"
          id="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EnterCalories;
