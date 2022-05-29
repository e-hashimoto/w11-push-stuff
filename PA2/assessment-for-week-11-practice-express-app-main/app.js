/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */


// Your code here
const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const csrfProtection = require('csurf')({ cookie: true});
const { HairColor, Person } = require('./models')

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrfProtection);

app.set('view engine', 'pug');

app.get('/new-person', async(req, res) => {
  const hairColors = await HairColor.findAll();
  const csrfToken = req.csrfToken();
  res.render('new-person', { hairColors, csrfToken });
});

app.post('/new-person', async(req, res, next) => {
  try{
    const { firstName, lastName, biography, age, hairColorId } = req.body
    await Person.create({
      firstName,
      lastName,
      age,
      biography,
      hairColorId
    })
    res.redirect('/')}

  catch(e) {
    next(e)
  };
});

app.get('/', async(req, res) => {
  const people = await Person.findAll(
    {include: HairColor}
  );
  res.render('list-of-people', { people });

  console.log(people);
});


const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));

/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}
