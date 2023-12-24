require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();
const cors = require('cors');

mongoose.connect(
	`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/`
);

app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
