const express=require('express');
const {InfoController}=require('../controllers');
const noteRoutes=require('./notes-routes');
const authRoutes=require('./auth-routes');
const { AuthMiddleware} = require('../middleware');
const router= express.Router();

router.get('/info', AuthMiddleware.checkAuth,InfoController.info);
router.use('/notes', AuthMiddleware.checkAuth,noteRoutes);
router.use('/auth', AuthMiddleware.validateAuthRequest,authRoutes);

module.exports =router;