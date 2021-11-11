const router = require('express').Router();
const {login, addUser} = require('./controller/userController')

router.post('/login', login);
router.post('/new', addUser);

module.exports = router;