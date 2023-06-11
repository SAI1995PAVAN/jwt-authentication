const User=require('../../models/User.js')
const jwt=require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  
}

const handleErrors = (err) => {
  if (err.code && err.code===11000) {
    return 'Email already exists try another one'
  }
  let {email,password} = err.errors
console.log(password)
  let errors;
  if (email) {
    errors = email.properties.message
    
  } else {
    errors=password.properties.message
  }
  console.log(errors,'-------------')
  console.log(err.code)
  return errors;
};


exports.register = async (req, res, next) => {

   const { email, password } = req.body;
    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false,
        maxAge:60*60*1000
      })
      res.status(200).json({user:user._id,loggedIn:true})
    } catch (error) {
  const errors = handleErrors(error);
      res.status(404).json({ errors, loggedIn: false })
    }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        const user = await User.login( email, password );
      const token = createToken(user._id);
      res.cookie('token', token, {
        withCredentials: true,
        httpOnly: false,
        maxAge:60*60*1000
      })
      res.status(201).json({user:user._id,message:'user logged in'})
    } catch (err) {
      next(err)
     
    }
}