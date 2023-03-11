var express = require('express');
var router = express.Router();

const googleController = require('../controllers/google.controller');
const tiktokController = require('../controllers/tiktok.controller');

router.get('/google/peopleAlsoAskQuestions', googleController.peopleAlsoAskQuestions);

router.get('/tiktok/oAuth', tiktokController.oAuth);
router.get('/tiktok/redirect', tiktokController.redirect);
router.get('/tiktok/video/list', tiktokController.videoList);
router.get('/tiktok/user/info', tiktokController.userInfo);

module.exports = router;
