// Data.jsx

import { useState, useEffect } from 'react';

const Data = () => {
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        // Fetch data from the server
        fetch('http://localhost:3000/users') // Assuming your server is running on http://localhost:3000
            .then((response) => response.json())
            .then((data) => {
                setUsersData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div>
            <h2>Users Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobileNumber}</td>
                            {/* Add more cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Data;
