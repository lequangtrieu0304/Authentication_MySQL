const User = require('../../config/database');
const bcrypt = require('bcrypt');

const formRegister = (req, res) => {
    res.render('register');
}

const handledRegister = async (req, res) => {

    const { user, pwd, birth_date, address, email} = req.body;

    if (!user || !pwd || !birth_date || !address || !email) return res.status(400).json({ message: 'username and password are require' });

    try {
        const [checkedUser] = await User.query('SELECT * FROM users WHERE username=?', [user])
        // console.log(checkedUser);

        if (checkedUser.length > 0) return res.status(400).json({ message: 'user da ton tai' })
        else {
            const hashPwd = await bcrypt.hash(pwd, 10)
            const [result] = await User.execute('INSERT INTO users SET username=?, password=?, refresh_Token=?, birth_date=?, address=?, email=?', [user, hashPwd, null, birth_date, address, email]);
            // res.json({message:'dang ki thanh cong', result})
            res.redirect('/login/login-user')
        }
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {
    handledRegister,
    formRegister
}