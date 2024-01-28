import { useState } from 'react';
import PropTypes from 'prop-types';

const RegistrationForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobileNumber: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Send registration request to the server
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Check for error status and handle accordingly
                const data = await response.json();
                setError(data.error);
                return;
            }

            // If registration is successful, reset the form data
            setFormData({
                name: '',
                email: '',
                password: '',
                mobileNumber: '',
            });

            setError(null); // Reset error state

            // Log in the user after registration
            onLogin();
        } catch (error) {
            console.error('Error submitting registration:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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

                <label htmlFor="mobileNumber">Mobile Number:</label>
                <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

RegistrationForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default RegistrationForm;
