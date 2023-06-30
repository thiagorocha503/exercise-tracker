import mongoose from "mongoose";
import 'dotenv/config';

export const database = mongoose.connect(process.env['MONGO_URI']);