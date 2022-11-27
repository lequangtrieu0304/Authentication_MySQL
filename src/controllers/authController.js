const User = require('../../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const formLogin = (req, res) => {
    res.render('login');
}

const handledLogin = async (req, res, next) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ message: 'username and password are require!!' })

    try {
        const [checkedUser] = await User.execute('SELECT * FROM users WHERE username=?', [user])
        // console.log(checkedUser[0]);
        if (checkedUser.length === 0) return res.status(400).json({ message: 'user khong ton tai' })

        // const role = Object.values(checkedUser[0].role);
        const checkedPwd = await bcrypt.compare(pwd, checkedUser[0].password)
        if (!checkedPwd) {
            return res.json({ message: 'password khong dung' })
        }
        else {
            const accessToken = jwt.sign({
                "userInfo": {
                    "username": checkedUser[0].username
                    // "role": role
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );

            res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            const refreshToken = jwt.sign({
                "username": checkedUser[0].username
            },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            await User.execute('UPDATE users SET refresh_Token=? WHERE username=?', [refreshToken, checkedUser[0].username]);
            res.cookie('jsonwebtoken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            // res.json({ accessToken, refreshToken })
            res.redirect('/data/get-all/')
        }
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports = {
    handledLogin,
    formLogin
}