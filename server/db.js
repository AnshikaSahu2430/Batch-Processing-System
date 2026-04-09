const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://test:test123@cluster0.u5dssrw.mongodb.net/batchDB?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("ERROR:", err));

module.exports = mongoose;
// DB logic added
