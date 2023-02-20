import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique username"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a strong password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide valid email address"],
    unique: [true, "Email address already exists"],
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number, unique: [true, "mobile is already exists"] },
  address: { type: String },
  profile: { type: String },
  date: { type: Date, default: Date.now() },
});


/**Return existing Users collection if available, otherwise create new Users schema in mongodb */
export default mongoose.model.Users || mongoose.model('Users', userSchema);
