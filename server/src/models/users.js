var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var mongoosePaginate = require('mongoose-paginate');
SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
   username: String,
   password:String,
   firstname:String,
   lastname:String,
   email: String,
   mobile: String,
   gender: String,
   role: String,
   profile: String,
  updated_at: { type: Date, default: Date.now },
});
UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          user.password = hash;
          next();
      });
  });
});

UserSchema.pre('update', function(next) {
    var user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user._update.password, salt, function(err, hash) {
          if (err) return next(err);

          user._update.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);