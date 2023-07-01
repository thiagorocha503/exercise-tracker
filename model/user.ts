import { Model, Schema, Types, model } from "mongoose";

interface Log {
    description: string;
    duration: Number;
    date: Date;
}
interface IUser {
    username: string;
    log: Types.DocumentArray<Log>;
}

const UserSchema = new Schema<IUser, Model<IUser>>({
    username: String,
    log: [
        {
            description: String,
            duration: Number,
            date: Date,
        },
    ],
});
const User = model<IUser>("users", UserSchema);
export default User;
