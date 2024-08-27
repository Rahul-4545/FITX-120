import React from 'react';
import '../Style/About.css';
const ProfilePage = () => {
    return (
        <div className="profile-container">
             <span className="highlight">Rahul</span>
            <p>Hi, I'm <span className="highlight">Rahul</span>, a passionate developer with a deep interest in fitness. My journey in the world of coding and fitness has led me to create a web application that combines both passions.</p>
            
            <h2>Key Points:</h2>
            <ul>
                <li><span className="highlight">Passionate Developer:</span> Dedicated to building innovative and efficient software solutions.</li>
                <li><span className="highlight">Fitness Enthusiast:</span> Driven by a strong interest in health and wellness, which inspires my projects.</li>
                <li><span className="highlight">Creating a Fitness Web App:</span> Developing a web app to help users with their fitness goals, leveraging my skills in React, Node.js, and SQL.</li>
            </ul>
        </div>
    );
};

export default ProfilePage;
