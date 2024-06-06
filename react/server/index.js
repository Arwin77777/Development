const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const User = require('./user');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./dbconfig');




connectDB();

app.use(cors());
app.use(express.json());
require('./routes')(app)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});