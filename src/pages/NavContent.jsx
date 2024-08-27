// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/NavContent.css';
import img1 from '../image/weightloss.jpg';
import img2 from '../image/weightgain.jpg';
import img3 from '../image/bodyrecomposition.jpg';
import Navbar from './NavBar';

const HomePage = () => {
    return (
        <>
        <Navbar />
        
            <div className="content-container">
                <div className="image-container">
                    <img src={img1} alt="Weight Loss" />
                </div>
                <div className="text-container">
                    <h2>FIT-X Fat Loss Program</h2>
                    <p>
                        Choose this program if you’d want to shed excess fat from your body and improve your physique. In this 16 weeks online course, I created a step by step practical plan for people who are ready to lose fat with expert help and tested methods.
                    </p>
                    <Link to="/loss" className="view-more">VIEW MORE</Link>
                </div>
            </div>
            <div className="content-container">
                <div className="image-container image-container-second">
                    <img src={img2} alt="Weight Gain" />
                </div>
                <div className="text-container">
                    <h2>FIT-X Bulking Program</h2>
                    <p>
                        Choose this program if you’d want to gain quality mass and build a muscular, strong and ripped body. In this 16 weeks online course, I created a step by step practical plan for people who are tired of being small and want to bulk up with expert help and tested methods.
                    </p>
                    <Link to="/gain" className="view-more">VIEW MORE</Link>
                </div>
            </div>
            <div className="content-container">
                <div className="image-container image-container-third">
                    <img src={img3} alt="Body Recomposition" />
                </div>
                <div className="text-container">
                    <h2>FIT-X Body Recomposition Program</h2>
                    <p>
                        Choose this program if you’d want to shed excess fat from your body and improve your physique. In this 16 weeks online course, I created a step by step practical plan for people who are ready to lose fat with expert help and tested methods.
                    </p>
                    <Link to="/both" className="view-more">VIEW MORE</Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
