// server.js

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        mobileNumber: '1234567890',
        history: [
            {
                date: '15/12/2021',
                completed: true,
            },
            {
                date: '16/12/2021',
                completed: false,
            },
        ],
    },
    {
        name: 'Siddhesh Waje',
        email: 'siddhesh@example.com',
        password: 'securepass',
        mobileNumber: '9876543210',
        history: [
            {
                date: '15/12/2021',
                completed: false,
            },
            {
                date: '16/12/2021',
                completed: true,
            },
        ],
    },
    {
        name: "Suresh Raina",
        email: "suresh@iiti.ac.in",
        password: "suresh",
        mobileNumber: '9638527410',
        history: [
            {
                date: '12/12/2024',
                completed: false,
            },
            {
                date: '12/12/2024',
                completed: false,
            },
        ]
    }
];
app.get('/users/:email', (req, res) => {
    const userEmail = req.params.email;
    const user = users.find(u => u.email === userEmail);

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    res.json(user);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If login is successful, send user email
    res.json({ success: true, userEmail: user.email });
});



app.post('/register', (req, res) => {
    const { name, email, password, mobileNumber } = req.body;

    // Check if the email is already registered
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ error: 'Email is already registered' });
    }

    // Generate a new user object
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        mobileNumber,
        history: [],
    };

    // Add the new user to the users array
    users.push(newUser);

    // For simplicity, consider generating a token or session for automatic login
    // Here, we're just sending the new user's ID and name
    res.json({ success: true, userId: newUser.id, name: newUser.name });
});



const orders = users.reduce((acc, user, userId) => {
    user.history.forEach((order, orderId) => {
        acc.push({
            id: `${userId}-${orderId + 1}`,
            name: user.name,
            orderNumber: orderId + 1,
            completed: order.completed,
        });
    });
    return acc;
}, []);


// Endpoint to get users
app.get('/users', (req, res) => {
    res.json(users);
});



// Endpoint to get orders
app.get('/orders', (req, res) => {
    const pendingOrders = orders.filter(order => !order.completed);
    const completedOrders = orders.filter(order => order.completed);

    res.json({ pending: pendingOrders, completed: completedOrders });
});

// Endpoint to update the status of an order
app.put('/orders/:orderId/complete', (req, res) => {
    const orderId = req.params.orderId;
    const order = orders.find(order => order.id === orderId);

    if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
    }

    order.completed = true;

    res.json({ success: true, order });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
