import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png'; // Ensure existing logo is used

function Auth() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // Form States
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const navigate = useNavigate();

    // --- REGISTER HANDLER ---
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validation
        if (!registerName || !registerEmail || !registerPassword) {
            alert("Please fill in all fields");
            return;
        }

        try {
            console.log("Sending Register Request...");
            const response = await axios.post('http://localhost:3001/register', {
                name: registerName,
                email: registerEmail,
                password: registerPassword
            });

            console.log("Register Response:", response.data);

            if (response.data.status === "Success") {
                alert("Account Created Successfully! Please Login.");

                // RESET FIELDS
                setRegisterName('');
                setRegisterEmail('');
                setRegisterPassword('');

                // SWITCH TO LOGIN
                setIsRightPanelActive(false);
            } else {
                alert(response.data.message || "Registration Failed");
            }
        } catch (err) {
            console.error("Register Network Error:", err);
            alert("Registration failed. Check console for details.");
        }
    };

    // --- LOGIN HANDLER ---
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation
        if (!loginEmail || !loginPassword) {
            alert("Please fill in all fields");
            return;
        }

        try {
            console.log("Sending Login Request...");
            const response = await axios.post('http://localhost:3001/login', {
                email: loginEmail,
                password: loginPassword
            });

            console.log("Login Response:", response.data);

            if (response.data.status === "Success") {
                alert("Login Successful! Welcome " + response.data.name);
                navigate('/home');
            } else {
                alert(response.data.message || "Invalid Credentials");
            }
        } catch (err) {
            console.error("Login Network Error:", err);
            alert("Login failed. Check console for details.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">

                {/* ----- REGISTER FORM ----- */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister}>
                        <img src={logo} alt="Logo" className="brand-logo" />
                        <h1>Create Account</h1>
                        <span className="subtitle">Join Flikt Technology</span>

                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Name"
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                            />
                            <i className="input-icon user-icon">👤</i>
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                            <i className="input-icon email-icon">✉️</i>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                            <i className="input-icon lock-icon">🔒</i>
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
                        <span className="subtitle">Welcome back</span>

                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <i className="input-icon email-icon">✉️</i>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <i className="input-icon lock-icon">🔒</i>
                        </div>

                        <a href="#" className="forgot-pass">Forgot your password?</a>
                        <button type="submit">Sign In</button>

                        <p className="mobile-switch" onClick={() => setIsRightPanelActive(true)}>
                            Don't have an account? Sign Up
                        </p>
                    </form>
                </div>

                {/* ----- OVERLAY ----- */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with Flikt Technology, please login with your personal info</p>
                            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Techie!</h1>
                            <p>Enter your personal details and start your journey with Flikt Technology</p>
                            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;