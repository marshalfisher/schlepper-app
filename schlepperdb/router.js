const router = require('express').Router();
const {login, addUser, addCollection, addWant, callAPI, deleteCollection, deleteWant, searchAPI} = require('./controller/userController')

router.post('/login', login);
router.post('/new', addUser);
router.post('/addCollection', addCollection)
router.post('/addWant', addWant)
router.post('/callAPI', callAPI)
router.post('/searchAPI', searchAPI)
router.delete('/deleteCollection', deleteCollection)
router.delete('/deleteWant', deleteWant)



module.exports = router;