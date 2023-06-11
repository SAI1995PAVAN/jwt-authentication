const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email is required'],
        unique:true
    },
    password: {
        type: String,
        required: [true,'Password is required'],
    }
})

userSchema.pre("save", async function (next) {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      const error = new Error('Incorrect password');
      error.statusCode=400
     throw error
    }
    const error = new Error('invalid email');
    error.statusCode=400
   throw error
  };
  
  module.exports = mongoose.model("User", userSchema);