import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/NavBar.css';


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
    const handleViewMoreWeightLoss = () => {
        navigate('/loss');
    };

    const handleViewMoreWeightGain = () => {
        navigate('/gain');
    };

    const handleViewMoreBodyRecomposition = () => {
        navigate('/both');
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">Fitx 120</div>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li className="programs">
                        <button onClick={toggleProgramsMenu} className="programs-button">Programs</button>
                        <ul className={`dropdown ${isProgramsOpen ? 'active' : ''}`}>
                            <li><Link to="/loss" onClick={toggleMenu}>Weight Loss</Link></li>
                            <li><Link to="/gain" onClick={toggleMenu}>Weight Gain</Link></li>
                            <li><Link to="/both" onClick={toggleMenu}>Body Recomposition</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
                    <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                </ul>
                <div className="Rahul" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
