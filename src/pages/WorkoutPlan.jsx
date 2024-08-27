import React from 'react';
import '../Style/WorkoutPlan.css';

const workoutSchedule = {
  Sunday: { plan: "Rest", message: "It's rest day! Take some time to recover." },
  Monday: { plan: "Chest, Triceps, 10000 steps", message: "Start your week strong with chest and triceps!" },
  Tuesday: { plan: "Back, Biceps, Cardio", message: "Hit those back muscles and burn some calories with cardio." },
  Wednesday: { plan: "Legs, Abs, Yoga", message: "Focus on lower body and core today." },
  Thursday: { plan: "Shoulders, Traps, 10000 steps", message: "Strengthen your shoulders and traps." },
  Friday: { plan: "Full Body Workout, Cardio", message: "It's full-body workout day, give it your all!" },
  Saturday: { plan: "Outdoor Activity, Stretching", message: "Enjoy some outdoor activities and stretch." },
};

const WorkoutPlan = () => {
  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const todayWorkout = workoutSchedule[today];

  return (
    <div className="workout-plan">
      <h2>Today's Workout Plan</h2>
      <p className="plan">{todayWorkout.plan}</p>
      <p className="message">{todayWorkout.message}</p>
    </div>
  );
};

export default WorkoutPlan;
