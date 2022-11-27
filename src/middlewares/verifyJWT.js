const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(401)
            req.user = decoded.userInfo.username
            // req.role = decoded.userInfo.role
            next();
        }
    );
}

module.exports = {
    verifyJWT
}