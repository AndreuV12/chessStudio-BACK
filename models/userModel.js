import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	accessToken: { type: String, required: false },
	refreshToken: { type: String, required: false },
});

userSchema.statics.getUserById = function (userId) {
  	return this.findById(userId);
};

const User = mongoose.model('User', userSchema);

export default User;