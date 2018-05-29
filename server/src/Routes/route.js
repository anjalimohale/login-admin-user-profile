const express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var User = require('../models/users');
const bcrypt = require('bcrypt');
var fs = require("fs");
var body_parser = require("body-parser");
var multer = require("multer");
const fileType = require('file-type');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const errorLog = require('../models/logger').errorlog;
const successlog = require('../models/logger').successlog;
const ip = require('ip');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'mohale.anjali@gmail.com',
    pass: 'Anjali@123'
  }
}));

var storage = multer.diskStorage({
  destination: function(req, file, callback){
    console.log(file)
    callback(null, "/home/infinity/Task7-jwt/server/src/Routes/upload/");
  },
  filename: function(req, file, callback){
   callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).array("uploads[]", 3);

router.get('/', function (req, res, next) {
  // console.log(JSON.parse(req.params.sort));
  let sort_field = req.query.sort_field;
  let sort_dir = req.query.sort_dir;
  let role = req.query.role;
  let test;
  if (sort_dir == '-1') {
    test = -1;
  }
  else if(sort_dir =='1') {
    test = 1;
  }
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.size);
  console.log(page, limit, sort_field, sort_dir, role)
  var log = { page: '', total: '', size1: '', data1: '' };
  if (!sort_field == "" && !sort_dir=="") {
    User.paginate(User.find({ role: role }).sort({ [sort_field]: sort_dir, test: test }), { page: page, limit: limit }, function (err, users) {
      if (err) return next(err);
      for(i=0;i<users.docs.length;i++){
        let imagename =users.docs[i].profile;
        users.docs[i].profile=extract_img(imagename);
     }
      log.page = users.page;
      log.total = users.total;
      log.size1 = users.docs.length;
      log.data1 = users.docs;
      // console.log(log);
      res.json(log);
    });
  }
  else {
    User.paginate(User.find({ role: role }), { page: page, limit: limit }, function (err, users) {
      if (err) return next(err);
      successlog.info(`Success Message and variables: ${JSON.stringify(users.docs)}`);
      for(i=0;i<users.docs.length;i++){
        // results[i].id= i+1;
        let imagename =users.docs[i].profile;
        console.log(imagename);
        users.docs[i].profile=extract_img(imagename);
     }
      log.page = users.page;
      log.total = users.total;
      log.size1 = users.docs.length;
      log.data1 = users.docs;
      // log.total=users.docs.length;
     
      res.json(log);
    });
  }
});

function extract_img(imagename)     //image extraction and encoding
    {
      let imagepath = __dirname + "/upload/"+imagename;
      let image = fs.readFileSync(imagepath);
      let imagedata = new Buffer(image).toString('base64');
      let mime = fileType(image).ext
    return src='data:image/'+mime+';base64,'+imagedata;
    }


const serverJWT_Secret = 'secret';

router.post('/login', function (req, res, next) {
  console.log(req.body);
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username })
      .then(result => {
        if (result) {
          // then check to see if their password is the same as the hashed one
          result.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
             result.profile=extract_img(result.profile);
              let payLoad = {
                _id:result._id, username:result.username,
                firstname: result.firstname, lastname: result.lastname,
                email: result.email, mobile: result.mobile,
                gender: result.gender, role: result.role, profile:result.profile,
                updated_at:result.updated_at,
              }
              const token = jwt.sign(payLoad, serverJWT_Secret); // <==== The all-important "jwt.sign" function
              res.status(200).send({
                user: payLoad,
                token: token
              });
            }
            else {
              res.status(403).send({
                errorMessage: 'Wrong Password'
              });
            }
          });
        }
        else {
          res.status(403).send({
            errorMessage: 'Permission denied!'
          });
        }
      });
  }
  else {
    res.status(403).send({
      errorMessage: 'Username or Password missing'
    });
  }
});

router.post('/register', function (req, res, next) {
  console.log("ghfj",req.body);
  upload(req, res, function(err) {
    if(err){
        return res.end("Error uploading file");
    }
    console.log("hello",req.body.jsondata);

  User.create(JSON.parse(req.body.jsondata), function (err, post) {
    if (err) return next(err);
    res.json(post);
    });
  });
});

router.get('/checkPass', function (req, res, next) {
  console.log("oldpass",req.query.id,req.query.oldpass);
  User.findById(req.query.id,function (err, resp){
   if(err) return next();
    if(resp) {
      resp.comparePassword(req.query.oldpass, function(err,isMatch){
        if(isMatch){
          res.send({status:"match"});
        }
        else{
          res.send({status:"not-match"});
        }
      })
    }
  });
});

router.get('/forgotPass', function (req, res, next) {
  console.log("email: ",req.query.email);
  User.findOne({ email:req.query.email },function (err, resp){
   if(err) return next();
    if(resp) {    
      let payLoad = {
        _id:resp._id,
        username:resp.username,
        email:resp.email,
      }
      var text="http://"+ip.address()+":4200/reset-password"
      var mailOptions = {
        from: 'mohale.anjali@gmail.com',
        to: resp.email,
        subject: 'Reset password Link infinity labs',
        html: text+'?un='
        +resp.username
        + '&id='
        + resp._id
};
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
     
      const token = jwt.sign(payLoad, serverJWT_Secret); // <==== The all-important "jwt.sign" function
      res.status(200).send({
        id: payLoad,
        token: token
      });
    }
    else{
      res.status(403).send({
        errorMessage: 'Email Not registered!!!!'
      });
    }
  });
});


router.delete('/:id', function (req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
      // results[i].id= i+1;
      let imagename =post.profile;
      console.log(imagename);
      post.profile=extract_img(imagename);
    res.json(post);
  });
});

router.put('/:id', function (req, res, next) {
  upload(req, res, function(err) {
    if(err){
        return res.end("Error uploading file");
    }
    _update=JSON.parse(req.body.jsondata);
    console.log(_update,req.params.id)
if(_update.password){
  console.log("if");
  User.findOne({ username:_update.username })
    .then(result => {
      if (result) {
        result.comparePassword(_update.password, (err, isMatch) => {
          if (isMatch) { res.json("unchanged") }
          else{
            User.update({_id:req.params.id},_update, function (err, post) {
              if (err) return next(err);
              res.json(post);
            });
          }
        });
      }
    });
  }
  else{
    console.log("else");
    User.findByIdAndUpdate(req.params.id,_update, function (err,resp) {
      if (err) return next(err);
      User.findById(req.params.id,function(err,post){
      let imagename =post.profile;
      console.log(imagename);
      post.profile=extract_img(imagename);
      let payLoad = {
        _id:post._id, username:post.username,
        firstname: post.firstname, lastname: post.lastname,
        email: post.email, mobile: post.mobile,
        gender:post.gender, role: post.role, profile:post.profile,
        updated_at:post.updated_at,
      }
      const token = jwt.sign(payLoad, serverJWT_Secret); // <==== The all-important "jwt.sign" function
      res.status(200).send({
        user: payLoad,
        token: token
      });
    });
  });
  }
  });
});

module.exports = router;