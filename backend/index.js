const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
const port = 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// MySQL connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'rahul',
  password: 'rani030300',
  database: 'fitx',
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

// Define workout plans for each day
const workoutPlans = {
  Sunday: 'Rest day',
  Monday: 'Chest, Triceps, 10,000 steps',
  Tuesday: 'Back, Biceps, Cardio',
  Wednesday: 'Legs, Abs, 10,000 steps',
  Thursday: 'Shoulders, Cardio',
  Friday: 'Full body workout',
  Saturday: 'Active recovery, light cardio',
};

// Workout Plan API
app.get('/api/workout-plan', (req, res) => {
  const today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[today.getDay()];
  
  const workoutPlan = workoutPlans[currentDay];

  res.json({ day: currentDay, workoutPlan });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Database query failed', error: err.message });
    }

    if (results.length > 0) {
      // User found
      const user = results[0];
      res.status(200).json({
        message: 'Login successful',
        user,
      });
    } else {
      // Invalid email or password
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});



// Register route
app.post('/register', (req, res) => {
  const { username, password, email, mobileNumber } = req.body;

  if (!username || !password || !email || !mobileNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert the new user into the users table
  const insertQuery = 'INSERT INTO users (username, password, email, mobile_number) VALUES (?, ?, ?, ?)';

  connection.query(insertQuery, [username, password, email, mobileNumber], (err, results) => {
    if (err) {
      console.error('Error executing insert query:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

    // Fetch the newly created user to send it back to the client
    const newUserQuery = 'SELECT id, username, email, mobile_number FROM users WHERE id = ?';

    connection.query(newUserQuery, [results.insertId], (err, userResults) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }

      const user = userResults[0];
      console.log('Fetched user:', user); // Log the fetched user data for debugging
      res.status(201).json({ message: 'Registration successful', user });
    });
  });
});

// Address route
app.post('/address', (req, res) => {
  const {
    full_name,
    street_address,
    city,
    state_province,
    postal_zip_code,
    country,
    phone_number,
  } = req.body;

  if (
    !full_name ||
    !street_address ||
    !city ||
    !state_province ||
    !postal_zip_code ||
    !country ||
    !phone_number
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const insertQuery = `
    INSERT INTO addresses (full_name, street_address, city, state_province, postal_zip_code, country, phone_number)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    insertQuery,
    [
      full_name,
      street_address,
      city,
      state_province,
      postal_zip_code,
      country,
      phone_number,
    ],
    (err, results) => {
      if (err) {
        console.error('Error executing insert query:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }

      res
        .status(201)
        .json({ message: 'Address saved successfully', addressId: results.insertId });
    }
  );
});

// Add Calories route
app.post('/api/dashboard/add-calories', (req, res) => {
  const { calories } = req.body;

  if (isNaN(calories) || calories <= 0) {
    return res.status(400).json({ message: 'Invalid calorie amount' });
  }

  const query = 'INSERT INTO calorie_logs (date, calories) VALUES (?, ?)';
  const today = new Date().toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format

  connection.query(query, [today, calories], (err, results) => {
    if (err) {
      console.error('Error inserting calorie data:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

    // Calculate total calories burned for the day
    const totalQuery = 'SELECT SUM(calories) AS totalCalories FROM calorie_logs WHERE date = ?';
    connection.query(totalQuery, [today], (err, results) => {
      if (err) {
        console.error('Error calculating total calories:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
      }

      res.status(200).json({ totalCalories: results[0].totalCalories });
    });
  });
});

// Fetch Total Calories Burned for Today
app.get('/api/dashboard/total-calories', (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const query = 'SELECT SUM(calories) AS totalCalories FROM calorie_logs WHERE date = ?';

  connection.query(query, [today], (err, results) => {
    if (err) {
      console.error('Error fetching calorie data:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

    const totalCalories = results[0]?.totalCalories || 0;
    res.json({ totalCalories });
  });
});

// Goals route
app.post('/api/goals', (req, res) => {
  const { steps, start_date, end_date } = req.body;

  if (!steps || !start_date || !end_date) {
    return res.status(400).json({ message: 'Steps, start date, and end date are required' });
  }

  const query = `
    INSERT INTO goals (steps, start_date, end_date)
    VALUES (?, ?, ?)
  `;

  connection.query(query, [steps, start_date, end_date], (err, results) => {
    if (err) {
      console.error('Error inserting goal:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

    res.status(201).json({ message: 'Goal set successfully', goalId: results.insertId });
  });
});

// Fetch Goals route
app.get('/api/goals', (req, res) => {
  const query = 'SELECT * FROM goals';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching goals:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

    res.json({ goals: results });
  });
});

// Fetch Active Goals for Today
app.get('/api/dashboard/active-goals', async (req, res) => {
  try {
    const query = `
      SELECT * FROM goals
      WHERE start_date <= CURDATE() AND end_date >= CURDATE()
    `;

    connection.query(query, (err, results) => {
      if (err) throw err;
      res.json({ activeGoals: results });
    });
  } catch (error) {
    console.error('Error fetching active goals:', error.message);
    res.status(500).json({ error: 'Failed to fetch active goals', details: error.message });
  }
});

const razorpay = new Razorpay({
  key_id: 'rzp_test_nMMmfd2QG4H4Ed',
  key_secret: '70veWtymvXQRoBYU0AhU2WZ8',
});

app.post('/api/payment/initialize', async (req, res) => {
  const { amount, currency, receipt, payment_capture } = req.body;

  const options = {
    amount: amount * 100,
    currency,
    receipt,
    payment_capture: payment_capture || 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(201).json({ order });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).json({ error: 'Failed to create payment order', details: err.message });
  }
});

app.post('/api/payment/verify', (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  try {
    const generatedSignature = crypto.createHmac('sha256', '70veWtymvXQRoBYU0AhU2WZ8')
  .update(`${order_id}|${payment_id}`)
  .digest('hex');


    if (generatedSignature === signature) {
      res.json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (err) {
    console.error('Error verifying payment:', err);
    res.status(500).json({ error: 'Payment verification failed', details: err.message });
  }
});
app.post('/api/purchase', (req, res) => {
  const { userId, courseName } = req.body;

  if (!userId || !courseName) {
    return res.status(400).json({ message: 'User ID and course name are required' });
  }

  const insertQuery = `
    INSERT INTO purchased_courses (user_id, course_name, purchase_date)
    VALUES (?, ?, NOW())
  `;

  connection.query(insertQuery, [userId, courseName], (err, results) => {
    if (err) {
      console.error('Error inserting purchase:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }

    res.status(201).json({ message: 'Purchase recorded successfully', purchaseId: results.insertId });
  });
});



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('New client connected with ID:', socket.id);

  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);


});