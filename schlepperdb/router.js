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
} = require('./controller/userController');

const {sendMessage,
    getMessages,
    deleteMessage,
} = require ('./controller/messageController')

const {
    makeTrade,
    deleteTrade,
    getTrades
} = require('./controller/tradeController')

//routes relating to the User controller
router.post('/login', login);
router.post('/new', addUser);
router.post('/addCollection', addCollection);
router.post('/addWant', addWant);
router.post('/callAPI', callAPI);
router.post('/searchAPI', searchAPI);
router.post('/findTrades', findTrades);  // searches Users, should be renamed
router.post('/getUser', getUser);
router.post('/sendImage', sendImage);
router.post('/updateUser', updateUser);
router.delete('/deleteCollection', deleteCollection);
router.delete('/deleteWant', deleteWant);

//routes relating to the Message controller
router.delete('/deleteMessage', deleteMessage)
router.post('/getMessages', getMessages);
router.post('/sendMessage', sendMessage);


//routes relating to the Trade controller
router.delete('/deleteTrade', deleteTrade);
router.post('/getTrades', getTrades)
router.post('/makeTrade', makeTrade);


module.exports = router;