import mongoose from 'mongoose';

const User = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  image: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  accessLevel: {
    type: Number,
    required: true,
  },
});

// User.set('toJSON', { getters: true, virtuals: false });

export default mongoose.model('User', User, 'users');
