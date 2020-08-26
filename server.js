const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const fs = require('fs');
const sgMail = require('@sendgrid/mail');

// connect db
connectDB();

// apply middlewares
app.use(cors());
app.use(fileUpload());
app.use(express.json({ extended: false }));
app.use(express.static('public')); //to access the files in public folder

// routes
app.use('/auth', require('./routes/api/auth'));
app.use('/register', require('./routes/api/register'));
app.use('/pub', require('./routes/api/pub'));
app.use('/post', require('./routes/api/post'));

// send mail
app.post('/sendmail', (req, res) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const {name, email, phone, content} = req.body;
  console.log('email is', req.body);

	const msg = {
		to: '',
		from: email,
		subject: `${name} are un mesaj!`,
		html: content
	};

	sgMail.send(msg)
		.then(sent => {
			console.log(`Email has been sent to ${email}`);
			return res.json({ message: `Email has been sent to ${email}`});
		})
		.catch(err => {
			return res.json({ message: err.message });
		})
});


// file upload api
app.post('/upload', (req, res) => {
	if (!req.files) {
		return res.status(500).send({ msg: 'file is not found' });
	}
	// accessing the file
	const myFile = req.files.file;
	//  mv() method places the file inside public directory
	myFile.mv(`${__dirname}/public/${myFile.name}`, function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({ msg: 'Error occured' });
		}
		// returing the response with file path and name
		return res.send({ name: myFile.name, path: `/${myFile.name}` });
	});
});

app.get('/upload', (req, res) => {
	let myFiles = [];

	fs.readdir('public', (err, files) => {
		// console.log('all files', files);
	
		files.forEach((file) => {
			const newObj = {
				name: file,
				path: `/${file}`
			};
			myFiles.push(newObj);
		});

		if (err) {
			console.log('err is', err);
			return res.status(500).send({ msg: 'error getting files' });
		} else {
			return res.send(myFiles);
		}
	});

	// console.log(myFiles);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log('Server running on port', PORT);
});
