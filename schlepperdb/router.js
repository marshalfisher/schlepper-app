const router = require('express').Router();
const {login, addUser, addCollection, addWant, callAPI} = require('./controller/userController')

router.post('/login', login);
router.post('/new', addUser);
router.post('/addCollection', addCollection)
router.post('/addWant', addWant)
router.post('/callAPI', callAPI)    


module.exports = router;