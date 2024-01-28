import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    //const [user, setUser] = useState(null); // New state to store user information

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setError('Invalid credentials. Please try again.');
                return;
            }

            const userData = await response.json();

            // Store the user email in localStorage
            localStorage.setItem('userEmail', userData.userEmail);

            // If successful, reset the form data and call the onLogin callback
            setFormData({
                email: '',
                password: '',
            });

            setError(null);
            onLogin(userData.userEmail); // Pass userEmail to onLogin instead of the complete user
        } catch (error) {
            console.error('Error submitting login:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginForm;

