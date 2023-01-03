var express = require('express');
var router = express.Router();

const googleController = require('../controllers/google.controller');

router.get('/google/peopleAlsoAskQuestions', googleController.index);

module.exports = router;
