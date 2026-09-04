// server/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const initDB = require('./config/initDB');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const projectRoutes = require('./routes/projectRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();

// 1. CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Cross-Origin Request Blocked by CORS Policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 2. Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Static Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/enquiries', enquiryRoutes);

// 5. Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Vignesh Thachchupattarai API is fully operational',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.send('Vignesh Thachchupattarai API Running');
});

// 6. Global Error Handling
app.use(notFound);
app.use(errorHandler);

// 7. Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initDB();
    const server = app.listen(PORT, () => {
      console.log(`=============================================`);
      console.log(`🚀 REST API ready at http://localhost:${PORT}/api`);
      console.log(`=============================================`);
    });

    process.on('unhandledRejection', (err) => {
      console.error('💥 UNHANDLED REJECTION! Closing server...');
      console.error(err);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error('Startup Error:', err.message);
    process.exit(1);
  }
};

startServer();