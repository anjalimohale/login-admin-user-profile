const express=require('express');
const jwt=require('jsonwebtoken');
const cors = require('cors');
const bodyParser=require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = require('./Routes/route');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/users', User);

mongoose.connect('mongodb://localhost/users')
  .then(() =>  console.log('connected to users database = >'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

app.listen(3300,"0.0.0.0",function(){console.log('Server started on port 3300')});
