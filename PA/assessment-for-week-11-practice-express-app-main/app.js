/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */


// Your code here
const express = require('express');

const app = express();

const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { HairColor, Person } = require('./models');
const csrfProtection = csrf({ cookie: true });

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.set('view engine', 'pug');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

app.get('/new-person', csrfProtection, asyncHandler(async (req, res) => {
  const hairColors = await HairColor.findAll({
    order: ["color"]
  })
  res.render('new-person-form', {
    hairColors,
    csrfToken: req.csrfToken()
  });
}));


const port = 8081;
app.listen(port, () => console.log(`Listening on port ${port}...`));




/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}
