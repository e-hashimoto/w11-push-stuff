/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const csrfProtection = require("csurf")({ cookie: true });
const { EntreeType, Entree } = require('./models')
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrfProtection);


app.get("/entrees/new", async(req, res) => {
  const entreeTypes = await EntreeType.findAll();
  const csrfToken = req.csrfToken();
  res.render('create', {entreeTypes, csrfToken});
});

app.post("/entrees", async (req, res, next) => {
  try{
    const { name, description, price, entreeTypeId } = req.body;
    await Entree.create({
      name,
      description,
      price,
      entreeTypeId
    })
    res.redirect("/")}
  catch(e) {
    next(e)
  };
});

app.get("/", async(req, res) => {
  const entrees = await Entree.findAll(
    {include: EntreeType}
  );
  res.render('list-entrees', { entrees });
})

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));

/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch (e) {
  exports.app = null;
}
