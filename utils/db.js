const mongoose = require('mongoose');
const connect = (url = 'mongodb://localhost:27017/api') => {
  return mongoose.connect(
    url,
    { useNewUrlParser: true }
  )
}
module.exports = connect;
