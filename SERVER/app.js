const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt= require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser')

const authRoutes = require('./routes/auth');

dotenv.config()
const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
      }) 
)


app.use(bodyParser.json());
app.use(cookieParser())
app.use('/',authRoutes)

app.use((error, req, res, next) => {
    let status = error.statusCode || 500;
    let message = error.message;
    res.status(status).json({ message });
    
})

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('db connection successful')
    app.listen(5000, () => {
        console.log('server is running on 5000')
    })
}).catch((err) => {
      console.log(err)
  })

