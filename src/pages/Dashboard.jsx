import React, { useState, useEffect } from 'react';
import WorkoutPlan from './WorkoutPlan';
import '../Style/Dashboard.css'; // Import your CSS for styling

const Dashboard = () => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [activeGoals, setActiveGoals] = useState([]);
  const [loadingCalories, setLoadingCalories] = useState(true);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [errorCalories, setErrorCalories] = useState('');
  const [errorGoals, setErrorGoals] = useState('');

  useEffect(() => {
    // Fetch total calories burned
    const fetchTotalCalories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard/total-calories', { // Use appropriate endpoint
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTotalCalories(data.totalCalories);
        } else {
          setErrorCalories('Failed to fetch calories.');
        }
      } catch (error) {
        console.error('Error fetching total calories:', error);
        setErrorCalories('Failed to fetch calories.');
      } finally {
        setLoadingCalories(false);
      }
    };

    // Fetch active goals
    const fetchActiveGoals = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dashboard/active-goals', { // Use appropriate endpoint
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setActiveGoals(data.activeGoals);
        } else {
          setErrorGoals('Failed to fetch goals.');
        }
      } catch (error) {
        console.error('Error fetching active goals:', error);
        setErrorGoals('Failed to fetch goals.');
      } finally {
        setLoadingGoals(false);
      }
    };

    fetchTotalCalories();
    fetchActiveGoals();
  }, []);

  return (
    <div className="dashboard-container">
      <WorkoutPlan />

      <div className="calories-section">
        <h2>Calories Burned Today</h2>
        {loadingCalories ? (
          <p>Loading...</p>
        ) : errorCalories ? (
          <p>{errorCalories}</p>
        ) : (
          <p>Total Calories Burned: {totalCalories} kcal</p>
        )}
      </div>

      <div className="goals-section">
        <h2>Active Goals</h2>
        {loadingGoals ? (
          <p>Loading...</p>
        ) : errorGoals ? (
          <p>{errorGoals}</p>
        ) : activeGoals.length > 0 ? (
          <ul>
            {activeGoals.map((goal) => (
              <li key={goal.id}>
                Steps: {goal.steps}, Start Date: {goal.start_date}, End Date: {goal.end_date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No active goals</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
