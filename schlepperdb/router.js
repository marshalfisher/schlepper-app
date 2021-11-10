const router = require('express').Router();
const {login} = require('./controller/userController')
router.post('/login', login);


module.exports = router;