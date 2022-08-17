const express = require('express');
const router = express.Router();
/*================================================*/
/*================================================*/

router.get('/', function (req, res) {
    console.log('MAIN PAGE');
    // res.sendFile('index.html', {
    //     root: path.join(__dirname, '..', 'dist'),
    // });
    res.render('index.html');
});
/*================================================*/
/*================================================*/

router.get('*', function (req, res) {
    res.redirect('/');
});

/*================================================*/
/*================================================*/
module.exports = router;


/*
USE FOR AUTHORIZATION REQUIRED API CALLS
===================================================================================
routes.js
===================================================================================
const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome  ");
});

===================================================================================
middleware/auth.js
===================================================================================
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
*/