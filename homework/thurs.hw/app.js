const express = require('express');

// // Load the environment variables from the .env file
// require('dotenv').config();

// // Get the port environment variable value.
// const { port } = require('./config');

/**
* Asynchronous function that delays for the provided length of time.
* If the length of time to wait is less than '0', then the returned
* Promise will reject, otherwise it'll resolve.
* @param {number} timeToWait - The length of time to wait in milliseconds.
*/
const delay = (timeToWait) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeToWait < 0) {
        reject(new Error('An error has occurred!'));
      } else {
        resolve(`All done waiting for ${timeToWait}ms!`);
      }
    }, Math.abs(timeToWait));
   });

// Create the Express app.
const app = express();

// Define routes

// app.get('*', (req, res) => {
//     delay(5000).then((value) => res.send(value));
// });

// Or ... do this using async / await - does the same thing as above

// app.get('*', async (req, res) => {
//     const result = await delay(5000);
//     res.send(result);
//    });

// ORRRRR... can do this with a try/catch - whatever works for you.

app.get('*', async (req, res, next) => {
    try {
      const result = await delay(-5000);
      res.send(result);
    } catch (err) {
      next(err);
    }
   });

// Define a port and start listening for connections.

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
