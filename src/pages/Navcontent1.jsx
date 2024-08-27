import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navcontent1.css'; // Updated CSS file
import img20 from '../image/videochat.jpg';
import img21 from '../image/stats.jpg';
import img22 from '../image/forumimage.jpg'; // Updated image for the forum
import Navbar1 from './Navbar1';

const HomePage = () => {
    return (
        <>
            <Navbar1 />
            <div className="homepage-section">
                <div className="homepage-image-block">
                    <img src={img20} alt="Video Chat" className="homepage-image" />
                </div>
                <div className="homepage-text-block">
                    <h2 className="homepage-title">FIT-X Video Chat Feature</h2>
                    <p className="homepage-description">
                        Connect with trainers and other members through our video chat feature. Get personalized advice, join live sessions, and stay motivated with real-time interactions.
                    </p>
                    <Link to="/videochat" className="homepage-link">VIEW MORE</Link>
                </div>
            </div>
            <div className="homepage-section">
                <div className="homepage-image-block homepage-image-block-reverse">
                    <img src={img21} alt="Stats" className="homepage-image" />
                </div>
                <div className="homepage-text-block">
                    <h2 className="homepage-title">FIT-X Fitness Stats Tracker</h2>
                    <p className="homepage-description">
                        Keep track of your progress with our detailed stats tracker. Monitor your workouts, calorie intake, and progress over time to ensure you stay on track to meet your fitness goals.
                    </p>
                    <Link to="/dash" className="homepage-link">VIEW MORE</Link>
                </div>
            </div>
            <div className="homepage-section">
                <div className="homepage-image-block">
                    <img src={img22} alt="Forum" className="homepage-image" />
                </div>
                <div className="homepage-text-block">
                    <h2 className="homepage-title">FIT-X Community Forum</h2>
                    <p className="homepage-description">
                        Join our community forum to discuss fitness topics, share your experiences, and get advice from fellow members and experts. A great place to stay connected and motivated.
                    </p>
                    <Link to="/forum" className="homepage-link">VIEW MORE</Link>
                </div>
            </div>
        </>
    );
};

export default HomePage;
