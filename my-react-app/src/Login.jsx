import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import logo from '../assets/logo.png'; 

function Auth() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // States
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const navigate = useNavigate();

    // --- Handlers ---
    const handleLogin = (e) => {
        e.preventDefault();
        // DEMO LOGIN
        if(loginEmail && loginPassword) {
             alert("Login Successful (Demo)");
             setTimeout(() => navigate('/home'), 500);
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (!registerName || !registerEmail || !registerPassword) {
            alert("All fields are required!");
            return;
        }
        // DEMO REGISTER
        alert("Account created! Please Sign In.");
        setIsRightPanelActive(false);
    }

    return (
        <div className="auth-wrapper">
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                
                {/* ----- REGISTER FORM ----- */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister}>
                        <img src={logo} alt="Logo" className="brand-logo" />
                        <h1>Create Account</h1>
                        <span className="subtitle">Use your email for registration</span>
                        
                        <div className="input-group">
                            <input type="text" placeholder="Name"
                                value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                            <i className="input-icon fas fa-user"></i>
                        </div>
                        <div className="input-group">
                            <input type="email" placeholder="Email"
                                value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                            <i className="input-icon fas fa-envelope"></i>
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="Password"
                                value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                            <i className="input-icon fas fa-lock"></i>
                        </div>

                        <button type="submit">Sign Up</button>
                        
                        <p className="mobile-switch" onClick={() => setIsRightPanelActive(false)}>
                            Already have an account? Sign In
                        </p>
                    </form>
                </div>

                {/* ----- LOGIN FORM ----- */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <img src={logo} alt="Logo" className="brand-logo" />
                        <h1>Sign in</h1>
                        <span className="subtitle">To continue to Flikt Technology</span>
                        
                        <div className="input-group">
                            <input type="email" placeholder="Email"
                                value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                            <i className="input-icon fas fa-envelope"></i>
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="Password"
                                value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                            <i className="input-icon fas fa-lock"></i>
                        </div>
                        
                        <a href="#" className="forgot-pass">Forgot your password?</a>
                        <button type="submit">Sign In</button>
                        
                        <p className="mobile-switch" onClick={() => setIsRightPanelActive(true)}>
                            Don't have an account? Sign Up
                        </p>
                    </form>
                </div>

                {/* ----- GLASS OVERLAY ----- */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with Flikt Technology, please login with your personal info</p>
                            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Techie!</h1>
                            <p>Enter your personal details and start your journey with Flikt Technology</p>
                            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;