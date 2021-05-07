const mongoose = require('mongoose');

// mongodb URI
const DB_URI = 'mongodb://localhost:27017/studentdb';
// connect to mongodb
mongoose.connect(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// import student model
const Student = require('./models/student');

// add a student
const addStudent = (student) => {
	Student.create(student)
		.then(() => {
			console.info('student created');
			mongoose.connection.close();
		});
};

// find a student with firstname or lastname
const findStudent = (name) => {
	// case insensitive search
	const search = new RegExp(name, 'i');

	Student.find({
		$or: [
			{firstname: search},
			{lastname: search}
		],
	})
		.then((docs) => {
			const count = docs.length;
			console.info(docs);
			console.info(`${count} student${count > 1 ? 's' : ''} found`);
			mongoose.connection.close();
		});
};

// update a student
const updateStudent = (_id, student) => {
	// validate student data
	const validStudent = {};
	for (let key in student) {
		// trim student data
		student[key] = student[key].trim();

		// add to validStudent if data is not empty
		if (student[key] !== '') {
			validStudent[key] = student[key];
		}
	}

	// do not update if validStudent is empty
	if (Object.keys(validStudent).length === 0) return;

	Student.updateOne({ _id }, validStudent)
		.then(() => {
			console.info('student updated');
			mongoose.connection.close();
		});
};

// remove a student
const removeStudent = (_id) => {
	Student.deleteOne({ _id })
		.then(() => {
			console.info('student deleted')
			mongoose.connection.close();
		});
};

// list all students
const listStudents = () => {
	Student.find()
		.then((docs) => {
			const count = docs.length;
			console.info(docs);
			console.info(`${count} student${count > 1 ? 's' : ''} found`);
			mongoose.connection.close();
		});
};

module.exports = {
	addStudent,
	findStudent,
	updateStudent,
	removeStudent,
	listStudents
};