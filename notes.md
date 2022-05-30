--> steps for the PA<--

npm install
it includes our csurf in our package

set up your port like
const port = 8081; <----
app.listen(port, () => console.log('Server is listening on port,'port));

set up express like
const express = require('express');
const app = express();

setting up database
create user with password and CREATEDB
create database with OWNER being that user.

short cuts for psql

psql -c "create user -->[input user name]<-- with password '[password]'
<{same line} createdb"; (side note: password is still wrapped in single quotes).

short cuts for sequlize
npx sequelize init <----

next step is to copy all the code provided and paste in the config.json

now were gonna create the database
npx sequelize db:create

--->[{RUN NPM TEST WHEN YOU FINISH THE FIRST ROUTE}]<---

CREATING MODELS
model- cap and singular
migrations- cap and plural
SYNTAX:
npx sequelize model:generate --name HairColor --attributes color:string

AFTER filing out migration files you can migrate doing
npx sequelize db:migrate

for our associations if there IS a foreign key it is safe to assume 90% of the time itll be belongs to. if it doesnt have a foreign key itll most likely be has many association
syntax:
HairColor.hasMany(models.Person, {
foreignKey: 'hairColorId'
})

CREATING SEEDER FILE
npx sequelize seed:generate --name add-hair-color
next copy the provided code and paste into the seeder file MAKE SURE THE NAMES MATCH FOR INSERT AND DELETE!!
after all the seeder files are filled we can then do the seeding:
npx sequelize db:seed:all

next step is to setup the csrf middleware there are two ways to do so a condensed way or a longer route heres what the longer route looks like:

app.use(express.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const csrfProtection = require('csrf')({ cookie:true });
app.use(csrfProtection);

looks like a lot huh? we can turn it into 3 lines like so:

app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('csurf')({ cookie: true }));

see wayyy more cuhleeeannn(sorry im making this at 3am lol)

so after that our app.js should have this structure we can call it the plate at a resturant:

const express = require('express');
const app = express();
const { HairColor, Person } = require('./models');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('csurf')({ cookie: true }));
<ROUTES GO HERE>
const port = 8081;
app.listen(port, () => console.log('Server is listening on port,' port));

there you go that is the setup for what 'plate' will look like for the PA and the assesment our next step is to now set up the routes the good stuff aka the main dish this stuff is super important I 100% recommend reading over the work on it because you WILL use it on projects and its very useful to know.

(sorry i forgot to mention pug thus far ill show what the pug file will look like always make a views folder and put your pug docs in there our first route is using 'create' in the render so we will name it create.pug)

the base layout for the create.pug will look like
(indentaion is messed up sorry periods=1 space)

(you dont need to define the body or anything we just needed the form to show)
form(action="/new-person" method="post")
..input(name="firstName" type="text" required)
..input(name="firstName" type="text" required)
..input(name="age" type="number")
..textarea(name="biography") <multi-line you will use textarea>
..select(name="hairColorId" required)
....each hairColor in hairColors <we are getting the hair colors>
......option(value=hairColor.id)= hairColor.color <Pojo back at it again>
..input(type="hidden" name="\_csrf" value= csrfToken)
..button(type="submit)

ROUTES

the first route we will dive into is:
<GET>
app.get('/new-person', async (req,res) => {
const hairColors = await HairColor.findAll();
const csrfToken = req.csrfToken();
res.render('create', { hairColors, csrfToken });
})

so theres your first one done!! now we move on to submitting/post route

<POST>
app.post('/new-person', async (req, res, next) => {
try{
    await Person.create(req.body);
    res.redirect('/')
}catch(e){
next(e);
}
})

<GET '/'>
(we will use the pug table they provided I named it index)
app.get('/', async (req, res) => {
const people = await Person.findAll({
include: HairColor
})
res.render('index', { people })
});
