// Orders.js

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Orders() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:3000/orders')
            .then(response => {
                const { pending, completed } = response.data;
                setPendingOrders(pending);
                setCompletedOrders(completed);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleCompleteOrder = (orderId) => {
        axios.put(`http://localhost:3000/orders/${orderId}/complete`)
            .then(response => {
                console.log(response.data);
                // After successfully marking the order as complete, fetch updated data
                fetchData();
            })
            .catch(error => {
                console.error('Error completing order:', error);
            });
    };

    return (
        <div>
            <h1>Pending Orders</h1>
            <ul>
                {pendingOrders.map(order => (
                    <li key={order.id}>
                        <strong>Name:</strong> {order.name} | <strong>Order Number:</strong> {order.orderNumber}
                        <button onClick={() => handleCompleteOrder(order.id)}>Complete Order</button>
                    </li>
                ))}
            </ul>

            <h1>Completed Orders</h1>
            <ul>
                {completedOrders.map(order => (
                    <li key={order.id}>
                        <strong>Name:</strong> {order.name} | <strong>Order Number:</strong> {order.orderNumber}
                    </li>
                ))}
            </ul>
        </div>
    );
}
