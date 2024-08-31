import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Navbar1.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProgramsOpen, setIsProgramsOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProgramsMenu = (e) => {
        e.preventDefault(); // Prevents the default button behavior
        setIsProgramsOpen(!isProgramsOpen);
    };

    // Navigation functions
    const handleVideoChat = () => {
        navigate('/videochat');
    };

    const handleForum = () => {
        navigate('/forum');
    };

    const handleStats = () => {
        navigate('/stats');
    };

    const handleStepsCount = () => {
        navigate('/stepscount');
    };

    return (
        <>
            <nav  className="navbar">
                <div className="logo1">Fitx 120</div>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/navcontent1" onClick={toggleMenu}>Home</Link></li>
                    <li><Link to="/videochat" onClick={toggleMenu}>Video Chat</Link></li>
                    <li><Link to="/forum" onClick={toggleMenu}>Forum</Link></li>
                    <li><Link to="/dash" onClick={toggleMenu}>Stats</Link></li>
                    <li><Link to="/cal" onClick={toggleMenu}>Calories Count</Link></li>
                    <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                </ul>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
