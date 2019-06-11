// const bcrypt = require("bcryptjs");
// const Users = require("../users/users-model.js");

//middleware
module.exports = function restricted(req, res, next) {
  if (req.session && req.session.username) { //if we have a session, and if the session has a user property (that we set in auth-router login)
    next();
  } else {
    res.status(400).json({ message: 'must be logged in to do that.' });
  }
};


  //read username and password from the headers and verify them
//   const { username, password } = req.headers;
//   if (username && password) {
//     //read credentials from the headers
//     //find user in db
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         //check that the passwords match
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           // if passwords don't match. the request gets bounced with a 401
//           res.status(401).json({ message: "Invalid Credentials" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   } else {
//     //if I don't find the user, the request gets bounced with a 401
//     res.status(400).json({ message: "You shall not pass!" });
//   }
// };
