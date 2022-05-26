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
  const ageBody = req.body.age

  const age2 = Number(ageBody)
  if (ageBody) {
    if(ageBody > 120 || ageBody < 0 || ((typeof age2 !== 'number') || Number.isNaN(age2))) {
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
  } else if ((favBeatle === "John") || (favBeatle === "Paul") || (favBeatle === "Ringo") || (favBeatle === "George")) {
    next()
  } else {
    req.errors.push('favoriteBeatle must be a real Beatle member')
    next()
  }
}

// app.post('/create-interesting', csrfProtection, firstNameChecker, lastNameChecker, emailChecker, passwordFinder, passwordMatcher, ageChecker, beatleChecker, async (req, res) => {
//   if (req.errors.length > 0) {
//     res.render('create-interesting', {csrfToken: req.csrfToken(), errors: req.errors, data: req.body})
//   } else {
//     const {firstName, lastName, email, favoriteBeatle, iceCream, age } = req.body
//     users.push({
//       id: users.length + 1,
//       firstName,
//       lastName,
//       email,
//       favoriteBeatle,
//       iceCream: iceCream === 'on',
//       age
//     })
//     res.redirect('/');
//   }
// })


app.post('/create-interesting', csrfProtection, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword, ageChecker, favoriteBeatle } = req.body;
  const errors = [];
  if (!firstName) {
      errors.push('Please provide a first name.');
  }
  if (!lastName) {
      errors.push('Please provide a last name.');
  }
  if (!email) {
      errors.push('Please provide an email.');
  }
  if (!password) {
      errors.push('Please provide a password.');
  }
  if (!confirmedPassword) {
      errors.push('Please provide a password confirmation.');
  }
  if (password !== confirmedPassword) {
      errors.push(
          'The provided values for the password and password confirmation fields did not match.'
      );
  }
  // if (!age) {
  //   req.errors.push('age is required')
  // } else if (age > 120 || age < 0 || !Number(age) || Number.isNaN(age)) {
  //   req.errors.push('age must be a valid age')
  // } else {

  // }

  // if (!favoriteBeatle) {
  //   req.errors.push('favoriteBeatle is required')
  // } else if (favoriteBeatle === 'Scooby-Doo') {
  //   req.errors.push('favoriteBeatle must be a real Beatle member')
  // }

  if (errors.length > 0) {
      res.render('create-interesting', {
          csrfToken: req.csrfToken(),
          errors,
          data: req.body,
      });
  } else {
      res.redirect('/');
  }

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;

// ___________________________________________________________________________________________

// const express = require("express");

// const app = express();
// const cookieParser = require('cookie-parser')
// const csrf = require('csurf');
// const csrfProtection = csrf({cookie: true})


// const port = process.env.PORT || 3000;

// app.set("view engine", "pug");


// app.use(express.urlencoded({extended: false}))
// app.use(cookieParser())

// //====================================================================
// //error filter
// const errorArray = (req, res, next) => {
//   req.errors = [];
//   next()
// }

// //validators

// const firstNameChecker = (req, res, next) => {
//   const firstName = req.body.firstName
//   if (firstName) {
//       next()
//   } else {
//       req.errors.push('Please provide a first name.')
//       next()
//   }
// }
// const lastNameChecker = (req, res, next) => {
//   const lastName = req.body.lastName
//   if (lastName) {
//       next()
//   } else {
//       req.errors.push('Please provide a last name.')
//       next()
//   }
// }
// const passwordChecker = (req, res, next) => {
//   const password = req.body.password
//   if (password) {
//       next()
//   } else {
//       req.errors.push('Please provide a password.')
//       next()
//   }
// }
// const emailChecker = (req, res, next) => {
//   const email = req.body.email
//   if (email) {
//       next()
//   } else {
//       req.errors.push('Please provide an email.')
//       next()
//   }
// }

// const passwordMatchChecker = (req, res, next) => {
//   const password = req.body.password
//   const confirmedPassword = req.body.confirmedPassword
//   if (password === confirmedPassword) {
//       next()
//   } else {
//       req.errors.push('The provided values for the password and password confirmation fields did not match.')
//       next()
//   }
// }


// const ageChecker = (req, res, next) => {
//   const age = req.body.age

//   const age2 = Number(age)

//   if (age) {
//     if (age > 120 || age < 0 || ((typeof age2 !== 'number') || Number.isNaN(age2) )) {
//       req.errors.push('age must be a valid age')
//       next()
//     } else {
//       next()
//     }
//   }
//   else {
//       req.errors.push('age is required')
//       next()
//   }
// }

// const beatleChecker = (req, res, next) => {

//   const favBeatle = req.body.favoriteBeatle


//   if (!favBeatle) {

//     req.errors.push('favoriteBeatle is required')
//     next()
//   }
//   else {
//       if ((favBeatle === "John")||(favBeatle === "Paul")||(favBeatle === "Ringo")||(favBeatle === "George")) {

//         next()
//       } else {

//         req.errors.push('favoriteBeatle must be a real Beatle member')
//         next()
//       }
//   }
// }




// //routers

// // const createRouter = require('./routes/create');
// // app.use('/create', createRouter)


// const users = [
//   {
//     id: 1,
//     firstName: "Jill",
//     lastName: "Jack",
//     email: "jill.jack@gmail.com"
//   }
// ];
// //====================================================================
// //HOME
// app.get("/", (req, res) => {
//   res.render("index", {users});
// });
// //====================================================================
// //CREATE
// app.get('/create',  csrfProtection, (req, res) => {
//   res.render('create',  {csrfToken: req.csrfToken(), errors: [], data: {}})
// })

// app.post('/create', errorArray, firstNameChecker,lastNameChecker,emailChecker,passwordChecker,passwordMatchChecker, csrfProtection, async(req, res) => {

//   if (req.errors.length > 0) {
//       res.render('create', {csrfToken: req.csrfToken(), errors: req.errors, data: req.body})
//   } else {
//       const {firstName, lastName, email} = req.body
//       users.push({
//           id: users.length + 1,
//           firstName,
//           lastName,
//           email

//       })
//       res.redirect('/')
//   }
// })

// //====================================================================
// //Create-Interesting
// app.get('/create-interesting',  csrfProtection, (req, res) => {
//   res.render('create-interesting',  {csrfToken: req.csrfToken(), errors: [], data: {}})
// })

// app.post('/create-interesting', errorArray, firstNameChecker,lastNameChecker,emailChecker,passwordChecker,passwordMatchChecker, ageChecker, beatleChecker, csrfProtection, async(req, res) => {

//   if (req.errors.length > 0) {
//       res.render('create-interesting', {csrfToken: req.csrfToken(), errors: req.errors, data: req.body})
//   } else {
//       const {firstName, lastName, email,  favoriteBeatle, iceCream, age} = req.body
//       users.push({
//           id: users.length + 1,
//           firstName,
//           lastName,
//           email,
//           favoriteBeatle,
//           iceCream: iceCream === 'on',
//           age

//       })
//       res.redirect('/')
//   }
// })



// //====================================================================
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// module.exports = app;
