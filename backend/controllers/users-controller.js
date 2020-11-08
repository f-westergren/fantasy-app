const knex = require('./../db');
const bcrypt = require('bcryptjs');

// Retrieve all users
const usersAll = async (req, res) => {
	// Get all books from database
	knex
		.select('*')
		.from('users')
		.then((userData) => {
			res.json(userData);
		})
		.catch((err) => {
			res.json({ message: `There was an error retrieving users: ${err}` });
		});
};

const usersOne = async (req, res) => {
	knex
		.select('*')
		.from('users')
		.where({
			username: req.params.username
		})
		.then((picksData) => {
			res.json(picksData);
		})
		.catch((err) => {
			res.json({ message: `There was an error retreiving user: ${err}` });
		});
};

// Create new user
const usersCreate = async (req, res) => {
	const salt = bcrypt.genSaltSync();
	const hash = bcrypt.hashSync(req.body.password, salt);
	knex('users')
		.insert({
			username: req.body.username,
			password: hash
		})
		.then(() => {
			res.json({ message: `User \'${req.body.username}\' created.` });
		})
		.catch((err) => {
			res.json({ message: `There was an error creating ${req.body.title} user: ${err}` });
		});
};

// Remove specific book
const usersDelete = async (req, res) => {
	knex('users')
		.where('id', req.params.id) // find correct record based on id
		.del() // delete the record
		.then(() => {
			res.json({ message: `User ${req.params.id} deleted.` });
		})
		.catch((err) => {
			res.json({ message: `There was an error deleting ${req.body.id} user: ${err}` });
		});
};

module.exports = { usersDelete, usersCreate, usersOne, usersAll };

// // Remove all books on the list
// exports.booksReset = async (req, res) => {
//   // Remove all books from database
//   knex
//     .select('*') // select all records
//     .from('books') // from 'books' table
//     .truncate() // remove the selection
//     .then(() => {
//       // Send a success message in response
//       res.json({ message: 'Book list cleared.' })
//     })
//     .catch(err => {
//       // Send a error message in response
//       res.json({ message: `There was an error resetting book list: ${err}.` })
//     })
// }
