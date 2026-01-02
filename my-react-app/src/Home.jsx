import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
    return (
        <div className="wrapper">
            <div className="glass-container">
                <h1>Welcome Home!</h1>
                <p>You have successfully logged in.</p>
                <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>
                    Logout
                </Link>
            </div>
        </div>
    );
}

export default Home;
