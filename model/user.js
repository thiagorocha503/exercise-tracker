import { Schema, model} from "mongoose";
const UserSchema = Schema({
  username: String,
  log: [{
      description: String,
      duration: Number,
      date: Date 
  }]
})
const User = model('users', UserSchema)
export default User