import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
  },
  password: {
    type: String,
    required: true
  }
},{timestamps: true});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;  