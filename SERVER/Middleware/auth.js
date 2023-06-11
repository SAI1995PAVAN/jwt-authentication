const User = require('../models/User.js');
const jwt = require('jsonwebtoken');


exports.checkUser = (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedtoken) => {
            if (err) {
                res.json({ authorized: false });
                next()
            } else {
                console.log(decodedtoken)
                const user = await User.findById(decodedtoken.id);
                if (user) {
                    res.json({ authorized: true, user: user.email })
                    next()
                } else {
                    res.json({authorized:false})
                }
            }
           
        })
    } else {
        res.json({authorized:false})
    }
}