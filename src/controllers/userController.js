
const User = require('../../config/database')

const getAllUser = async (req, res) => {
    try{
        const [users] = await User.query('SELECT * FROM users');
        res.render('data', {users});
        // res.json(users)
        console.log(users);
    }
    catch(err){
        res.send(err)
    }
}

module.exports = {
    getAllUser
}