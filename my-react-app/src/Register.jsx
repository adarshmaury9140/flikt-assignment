import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }
        if (password.length <= 6) {
            alert("Password must be longer than 6 characters.");
            return;
        }

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                alert("Registration Successful! Please Login.");
                navigate('/'); // Redirect to login
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("Registration failed. Try again.");
                }
            });
    }

    return (
        <div className="wrapper">
            <div className="glass-container">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        Register
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/" className="btn-secondary">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Register;