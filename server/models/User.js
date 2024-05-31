import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    enrolledCourses:{
        type: [String],
    }
}, 
{ timestamps: true }
)

export default mongoose.model("User", UserSchema)