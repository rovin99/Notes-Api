const express = require('express');

const { UserController } = require('../controllers');

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login',UserController.signin);

module.exports =router;
