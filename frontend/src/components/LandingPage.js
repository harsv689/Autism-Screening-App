import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login"); // Assumes you have a `/login` route configured
    };

    return (
        <div className="landing-page">
            {/* Header Section */}
            <header className="header">
                <div className="logo">Choice Foundation</div>
                <button className="login-btn" onClick={handleLoginClick}>
                    Login
                </button>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Empowering Early Autism Screening</h1>
                    <p>
                        Detect early signs of autism with our AI-powered Gait and Behavior Screening Tool. Making healthcare accessible for everyone.
                    </p>
                    {/* <button className="cta-btn" onCli>Learn More</button>
           */}
                    <a href="https://www.autismspeaks.org/what-autism" target="_blank" rel="noopener noreferrer">
                        <button className="cta-btn">Learn More</button>
                    </a>
                </div>
            </section>

            {/* Information Section */}
            <section className="info-section">
                <h2>How Our Tool Works</h2>
                <div className="info-content">
                    <div className="info-item item-1">
                        <h3>AI-Powered Screening</h3>
                        <p>
                            Our tool leverages cutting-edge AI technology to analyze gait and behavior patterns, providing reliable early detection for autism.
                        </p>
                    </div>
                    <div className="info-item item-2">
                        <h3>Accessible and Easy to Use</h3>
                        <p>
                            Designed for ease of use, our tool allows healthcare workers and NGO volunteers to perform screenings quickly and efficiently.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>
                    © {new Date().getFullYear()} Choice Foundation. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
