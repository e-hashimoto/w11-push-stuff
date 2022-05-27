const express = require("express");

const app = express();

const logTime = (req, res, next) => {
    console.log("Current time: ", new Date().toISOString());
    next();
};

app.use(logTime);

const passOnMessage = (req, res, next) => {
    console.log("Passing on a message!");
    req.passedMessage = "Hello from passOnMessage!";
    next();
}

app.get("/", passOnMessage, (req, res) => {
    console.log("Passing on a message!");
    res.send("Hello World!");
});

app.get("/bye", (req, res) => {
    res.send("Bye World.");
});

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
