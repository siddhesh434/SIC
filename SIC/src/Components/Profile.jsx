import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const Profile = ({ userEmail: initialUserEmail }) => {
    //console.log('hi');
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const userEmailRef = useRef(initialUserEmail);

    useEffect(() => {
        console.log('Effect 1: Fetching user data...');
        const storedUserEmail = localStorage.getItem('userEmail');

        if (!userEmailRef.current && storedUserEmail) {
            userEmailRef.current = storedUserEmail;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${userEmailRef.current}`);
                if (!response.ok) {
                    setError('Error fetching user data.');
                    return;
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('An error occurred while fetching user data.');
            }
        };

        if (userEmailRef.current) {
            fetchUserData();
        }
    }, []);


    useEffect(() => {
        if (userEmailRef.current) {
            localStorage.setItem('userEmail', userEmailRef.current);
        }
    }, []);


    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <>
            <ul>
                <li>Name: {user.name}</li>
                <li>Email: {user.email}</li>
                <li>Mobile Number: {user.mobileNumber}</li>
                <li>History:</li>
                <ul>
                    {user.history.map((entry, index) => (
                        <li key={index}>
                            {entry.date} - {entry.completed ? 'Completed' : 'Not Completed'}
                        </li>
                    ))}
                </ul>
            </ul>
        </>
    );
};

Profile.propTypes = {
    userEmail: PropTypes.string,
};

export default Profile;
