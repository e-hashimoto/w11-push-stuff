const express = require('express');

// Create the express app
const app = express();

// Set the pug view engine
app.set('view engine', 'pug');
app.use(express.urlencoded());

const guests = [];

// Define a route
app.get('/', (req, res) => {
    res.render('index', { title: "Guest List", guests });
});

app.get('/guest', (req, res) => {
    res.render("guest-form", { title: "Guest Form" });
});

app.post("/guest", (req, res) => {
    // Whatever we wanna put in here
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
