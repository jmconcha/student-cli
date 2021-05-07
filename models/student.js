const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
	firstname: String,
	lastname: String,
	course: String,
	year: String,
	phone: String,
	email: String,
});

module.exports = mongoose.model('Student', studentSchema);