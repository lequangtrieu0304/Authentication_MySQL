const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use(cookieParser())

require('./config/database');

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/register', require('./src/routers/Register'));
app.use('/login', require('./src/routers/Login'));
app.use('/logout', require('./src/routers/Logout'));

app.use('/data', require('./src/routers/api/dataUser'))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})