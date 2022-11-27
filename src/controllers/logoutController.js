const User = require('../../config/database');

const handledLogout = async (req, res) => {
    const cookies = req.cookies;

    if(!cookies.jsonwebtoken) return res.status(401).json({message: 'cookies is require!!'});
    const refreshToken = cookies.jsonwebtoken;
    try{
        const [foundUser] = await User.query('SELECT * FROM users WHERE refresh_Token=?', [refreshToken]);
        if(foundUser.length === 0) {
            res.clearCookie('jsonwebtoken', {httpOnly: true});
            return res.sendStatus(201);
        }
        const result = await User.query('UPDATE users SET refresh_Token=? WHERE username=?', [null, foundUser[0].username]);
        console.log(result);
        res.clearCookie('jsonwebtoken', {httpOnly: true});
        return res.redirect('/');
    }
    catch(err) {
        res.send(err);
    }
}

module.exports = {
    handledLogout
}