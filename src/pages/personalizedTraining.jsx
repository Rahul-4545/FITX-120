import React, { useState } from 'react';
import '../Style/personalizedTraining.css';

const PersonalizedTraining = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    program: '',
    fitnessLevel: '',
  });

  const [trainingPlan, setTrainingPlan] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logic to generate a training plan based on user input
    const plan = generateTrainingPlan(formData);
    setTrainingPlan(plan);
  };

  const generateTrainingPlan = (data) => {
    // Example logic: You can customize this based on your requirements
    const plans = {
      'weight loss': {
        workouts: ['HIIT', 'Cardio', 'Circuit Training'],
        duration: '8 weeks',
      },
      'weight gain': {
        workouts: ['Strength Training', 'Heavy Lifting', 'Compound Exercises'],
        duration: '10 weeks',
      },
      'body recomposition': {
        workouts: ['Strength Training', 'HIIT', 'Balanced Nutrition'],
        duration: '12 weeks',
      },
    };
    
    return plans[data.program];
  };

  return (
    <div className="personalized-training-container">
      <h1>Get Your Personalized Training Program</h1>

      {!trainingPlan ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="program">Select Program:</label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
            >
              <option value="">Choose your program</option>
              <option value="weight loss">Weight Loss</option>
              <option value="weight gain">Weight Gain</option>
              <option value="body recomposition">Body Recomposition</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fitnessLevel">Current Fitness Level:</label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select your fitness level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Generate Training Program
          </button>
        </form>
      ) : (
        <div className="training-plan">
          <h2>Your Training Program</h2>
          <p><strong>Duration:</strong> {trainingPlan.duration}</p>
          <p><strong>Workouts:</strong></p>
          <ul>
            {trainingPlan.workouts.map((workout, index) => (
              <li key={index}>{workout}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PersonalizedTraining;
