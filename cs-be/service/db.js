const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
module.export = db;