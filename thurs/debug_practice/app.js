const express = require('express');
const app = express();
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const { Thing, User } = require('./models');

const csrfProtection = csrf()

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.get('/', csrfProtection, async(req, res) => {
    const things = await Thing.findAll()
    res.render('create', {csrfToken: req.csrfToken(), things})
})

app.post('/create', csrfProtection, async(req, res) => {
    const { name, email, password, favoriteThing } = req.body;

    const user = User.create({
        name,
        email,
        password,
        favoriteThing
    })

    const responseToSend = await User.findByPk(user.id, {
        include: Thing
    })
    res.json({ responseToSend })
})

app.set('view engine', 'pug')
app.listen(8081, () => console.log('App listening on port 8081 :)'))