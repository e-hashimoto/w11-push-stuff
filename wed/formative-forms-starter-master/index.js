const express = require("express");

const csrf = require("csurf");
const csrfProtection = csrf({cookie: true});
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;
// req.csrfToken()
// input(type="hidden", name="_csrf", value=token)
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", (req, res) => {
  res.render("index", {users})
});

app.get('/create', csrfProtection, (req, res) => {
  res.render('create', {csrfToken: req.csrfToken(), errors: [], data: {}})
});

const errorArray = (req, res, next) => {
  req.errors = [];
  next()
}

const firstNameChecker = (req, res, next) => {
  const firstName = req.body.firstName
  if (firstName) {
      next()
  } else {
      req.errors.push('Please provide a first name.');
      next()
  }
};

const lastNameChecker = (req, res, next) => {
  const lastName = req.body.lastName
  if (lastName) {
      next()
  } else {
      req.errors.push('Please provide a last name.');
      next()
  }
};

const emailChecker = (req, res, next) => {
  const email = req.body.email
  if (email) {
    next()
  } else {
    req.errors.push('Please provide an email.');
    next()
  }
};

const passwordFinder = (req, res, next) => {
  const password = req.body.password;
  if (password) {
    next()
  } else {
    req.errors.push('Please provide a password.');
    next()
  }
}

const passwordMatcher = (req, res, next) => {
  const password = req.body.password;
  const confirmedPassword = req.body.confirmedPassword;

  if (password === confirmedPassword) {
    next()
  } else {
    req.errors.push('The provided values for the password and password confirmation fields did not match.');
    next()
  }
}

app.post('/create', errorArray, firstNameChecker, lastNameChecker, emailChecker, passwordFinder, passwordMatcher, csrfProtection, async(req, res) => {
  const title = req.body.title
  if (req.errors.length > 0) {
      res.render('create', {csrfToken: req.csrfToken(), errors: req.errors, data: req.body})
  } else {
      const {firstName, lastName, email} = req.body
      users.push({
          id: users.length + 2,
          firstName,
          lastName,
          email
      })
      res.redirect('/');
  }
});

app.get('/create-interesting', csrfProtection, (req, res) => {
  res.render('create-interesting', {csrfToken: req.csrfToken(), errors: [], data: {}})
});

const ageChecker = (req, res, next) => {
  const age = req.body.age
  if (age) {
    if(age > 120 || age < 0 || !Number.isInteger(age)) {
      req.errors.push('age must be a valid age');
      next()
    } else {
      next()
    }
  } else {
    req.errors.push('age is required')
    next()
  }
}

const beatleChecker = (req, res, next) => {
  const favBeatle = req.body.favoriteBeatle

  if(!favBeatle) {
    req.errors.push('favoriteBeatle is required');
    next()
  } else if (favBeatle === "Scooby-Doo") {
    req.errors.push('favoriteBeatle must be a real Beatle member')
    next()
  } else {
    next()
  }
}

const iceCreamChecker = (req, res, next) => {
  const selected = req.body.iceCream

  if (!selected) {
  
  }
}

app.post('/create-interesting', errorArray, ageChecker, beatleChecker, firstNameChecker, lastNameChecker, emailChecker, passwordFinder, passwordMatcher, csrfProtection, async(req, res) => {
  if (req.errors.length > 0) {
    res.render('create-interesting', {csrfToken: req.csrfToken(), errors: [], data: req.body})
  } else {
    const {firstName, lastName, email} = req.body
    users.push({
      id: users.length + 1,
      firstName,
      lastName,
      email
    })
    res.redirect('/')
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
