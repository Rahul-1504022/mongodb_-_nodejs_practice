const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students')
    .then(() => console.log("Connected to MONGO-DB sucessfully"))
    .catch(err => console.error("Connection failed"));