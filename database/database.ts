import mongoose from "mongoose";
import 'dotenv/config';
const uri: string| undefined = process.env['MONGO_URI']
if(!uri){
    console.error("Uri not setted")
    process.exit()
}
export const database = mongoose.connect(uri);