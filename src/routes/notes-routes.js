const express = require('express');

const {NoteController} = require('../controllers');

const {NoteMiddleware} = require('../middleware');

const router = express.Router();

router.post('/', NoteMiddleware.validateCreateNote, NoteController.createNote);

router.get('/',NoteController.getOwnerNotes);

router.get('/:id/',NoteMiddleware.authenticateOwner,NoteController.getNote);

router.patch('/:id/',NoteMiddleware.authenticateOwner,NoteController.updateNote);

router.delete('/:id/',NoteMiddleware.authenticateOwner,NoteController.destroyNote);

router.post('/:id/',NoteMiddleware.authenticateOwner,NoteController.shareNote)
;
module.exports = router;