const router = require('express').Router();
const {login,
    addUser,
    addCollection,
    addWant,
    callAPI,
    deleteCollection,
    deleteWant,
    searchAPI,
    findTrades,
    getUser,
    sendImage,
    updateUser,
    sendMessage,
    getMessages,
} = require('./controller/userController')

router.post('/login', login);
router.post('/new', addUser);
router.post('/addCollection', addCollection)
router.post('/addWant', addWant)
router.post('/callAPI', callAPI)
router.post('/searchAPI', searchAPI)
router.post('/findTrades', findTrades)
router.post('/getUser', getUser)
router.post('/sendImage', sendImage)
router.post('/updateUser', updateUser)
router.post('/sendMessage', sendMessage)
router.post('/getMessages', getMessages)
router.delete('/deleteCollection', deleteCollection)
router.delete('/deleteWant', deleteWant)



module.exports = router;