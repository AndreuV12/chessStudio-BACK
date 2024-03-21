import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.statics.getUserById = function (userId) {
  	return this.findById(userId);
};

userSchema.statics.getUserByEmail = function (email) {
	return this.findOne({email})
}

const User = mongoose.model('User', userSchema);

export default User;