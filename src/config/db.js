import { connect } from 'mongoose';
import { envConfig } from './index.js';

export async function connectDB() {
    try {
        await connect(envConfig.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log('Error on connecting to the database', error);
    }
}