var express = require('express');
var router = express.Router();
const log = require('../log');

const User = require(`../models/user`);

// Create
router.post('/', function(req, res, next) {
  let user = new User({
    'username': req.body.username,
    'email': req.body.email,
    'cpf': req.body.cpf,
    'password': req.body.password
  });

  user.save()
    .then(doc => {
      let user = doc.toObject();
      delete user['_id'];
      delete user['password'];
      delete user['tokens'];
      delete user['createdAt'];
      delete user['updatedAt'];
      delete user['__v'];
      
      log.debug("CREATE USER SUCCESS "+JSON.stringify(user));
      
      return res.json(user);
    })
    .catch(err => {
      log.debug("CREATE USER ERROR "+JSON.stringify(err));
      return res.status(400).json(err);
    });
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(400).json({error: 'Login failed! Check authentication credentials'});
    }
    const token = await user.generateAuthToken();
    
    log.debug("LOGIN SUCCESS "+JSON.stringify(user));
    
    user = user.toObject();
    delete user['_id'];
    delete user['password'];
    delete user['tokens'];
    delete user['createdAt'];
    delete user['updatedAt'];
    delete user['__v'];
    res.json({ user, token });
  } catch (err) {
    log.debug("LOGIN ERROR "+JSON.stringify(err));
    res.status(400).json({error: 'Login failed!'});
  } 
});

module.exports = router;
