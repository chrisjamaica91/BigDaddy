// connection to mongodb database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TrackingNumbers', {useNewUrlParser: true}).then((err, db) => {
  console.log('Connection to MongoDB Successful!');
}).catch((err) => {
  console.log("Error establishing connection...", err);
});

// Used to prevent deprecation warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose
};
