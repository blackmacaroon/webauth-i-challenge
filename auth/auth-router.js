const router = require("express").Router();

const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;
  // hash the password when it's created
  const hash = bcrypt.hashSync(user.password, 12); // password gets rehashed 2 to the 12th times
  //replace user.password as the hash
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        res.status(200).json({ message: `Do you like cookies, ${user.username}?` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err) {
        res.json({ message: 'you can check out any time you like, but you can never leave' })
      } else {
        res.status(200).json({ message: 'so long, and thanks for all the fish!'})
      }
    })
  } else {
    res.status(200).json({ message: "the crucial thing is to find a truth which is truth for you, to find the idea for which you are willing to live and die."})
  }
})

module.exports = router;
