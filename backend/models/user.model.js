import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    email:String,
    firstname: String,
    lastname: String,
    password: String,
})

const user = mongoose.model('user', userSchema);

export default user;