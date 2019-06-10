const router = require("express").Router();

router.post('/register', (req, res) => {
      let user = req.body;
      // hash the password when it's created
      const hash = bcrypt.hashSync(user.password, 12); // password gets rehashed 2 to the 12th times 
      //replace user.password as the hash
      user.password = hash
      Users.add(user)
        .then(saved => {
          res.status(201).json(saved);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    });
    
    router.post('/login', (req, res) => {
      let { username, password } = req.body;
    
      Users.findBy({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!` });
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    });

    module.exports = router;