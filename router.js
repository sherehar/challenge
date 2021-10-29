const express = require('express');
const controller = require('./controller/controller');

const router = express.Router();

router.get('/tweet', controller.homepage);
router.all('/add-tweet', controller.addTweet);
router.get('/tweet/:id', controller.showOneTweet);
router.all('/tweet/edit/:id', controller.editTweet);
router.get('/delete-tweet/:id', controller.delTweet);

module.exports = router;