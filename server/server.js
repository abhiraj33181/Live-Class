import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth.route.js';

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
    origin : process.env.CLIENT_URL || 'http://localhost:3000',
    Credentials : true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/api/health', (req, res) => {
    res.status(200).json({
        status : 'success',
        message : 'Server is healthy',
        timestamp : new Date().toISOString()
    });
});

app.use('/api/auth', authRouter)


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});