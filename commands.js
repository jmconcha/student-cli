#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {
	addStudent,
	findStudent,
	updateStudent,
	removeStudent,
	listStudents
} = require('./index');

const studentQuestions = [
	{
		type: 'input',
		name: 'firstname',
		message: 'Student First Name:'
	},
	{
		type: 'input',
		name: 'lastname',
		message: 'Student Last Name:'
	},
	{
		type: 'input',
		name: 'course',
		message: 'Student Course:'
	},
	{
		type: 'input',
		name: 'year',
		message: 'Student Year:'
	},
	{
		type: 'input',
		name: 'phone',
		message: 'Student Phone Number:'
	},
	{
		type: 'input',
		name: 'email',
		message: 'Student Email Address:'
	},
];

// initialize program version and description
program
	.version('1.0.0')
	.description('Student Information Management CLI');

// add a student command
program
	.command('add')
	.alias('a')
	.description('Add a student')
	.action(() => {
		prompt(studentQuestions)
			.then((answers) => addStudent(answers));
	});

// find a student command
program
	.command('find <name>')
	.alias('f')
	.description('Find a student')
	.action((name) => findStudent(name));

// update a student command
program
	.command('update <_id>')
	.alias('u')
	.description('Update a student')
	.action((_id) => {
		prompt(studentQuestions)
			.then((answers) => updateStudent(_id, answers));
	});

// remove a student command
program
	.command('remove <_id>')
	.alias('r')
	.description('Remove a student')
	.action((_id) => removeStudent(_id));

// list all students
program
	.command('list')
	.alias('ls')
	.description('List all students')
	.action(() => listStudents());

// parse arguments
program.parse(process.argv);