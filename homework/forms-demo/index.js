const express = require('express');

// Create the express app
const app = express();

// Set the pug view engine
app.set('view engine', 'pug');
app.use(express.urlencoded());

const guests = [];

// Middleware function

const validateGuest = (req, res, next) => {
    const { fullname, email, numGuests } = req.body;
    const numGuestsNum = parseInt(numGuests, 10);
    const errors = [];

    if (!fullname) {
        errors.push("Please fill out the full name field.");
    }

    if (!email) {
        errors.push("Please fill out the email field.");
    }

    if (!numGuests || numGuests < 1) {
        errors.push("Please fill out a valid number for number of guests.");
    }

    req.errors = errors;
    next();
}

// Define a route
app.get('/', (req, res) => {
    res.render('index', { title: "Guest List", guests });
});

app.get('/guest', (req, res) => {
    res.render("guest-form", { title: "Guest Form" });
});

app.post("/guest", validateGuest, (req, res) => {
    // Whatever we wanna put in here
    const { fullName, email, numGuests } = req.body;
    if (req.errors.length > 0) {
        res.render("guest-form", {
            title: "Guest Form",
            errors: req.errors,
            email,
            fullName,
            numGuests
        });
        return;
    }

    const guest = {
        fullname: req.body.fullname,
        email: req.body.email,
        numGuests: req.body.numGuests
    };
    guests.push(guest);
    res.redirect('/');
})

// Define a port and start listening for connections
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
