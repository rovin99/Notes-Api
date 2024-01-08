const {StatusCodes} = require('http-status-codes');

const { NoteRepository } = require('../repositories');

const AppError = require('../utils/errors/app-error');
const noteRepository = new NoteRepository();

async function createNote(data) {
    try{
        const note= await noteRepository.create(data);
        return note;
    }
    catch(error){
        if(error.name =='SequelizeValidationError') {
            let explaination=[];
            
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            });
           
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Note object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getNote(id){
    try{
        const note= await noteRepository.get(id);
        
        return note;
    }
    catch(error){
        throw new AppError('Cannot get properties', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyNote(id){
    try{
        const response= await noteRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The note you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete data of the note', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateNote(id, data){
    try{
        const response= await noteRepository.update(id, data);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The note you requested not found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update data of the note', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getNoteByOwnerId(ownerId) {
    try {
        const ownerNote = await noteRepository.getNoteByOwnerId(ownerId);
        console.log(JSON.stringify(ownerNote));
        return ownerNote;
    } catch (error) {
        throw new AppError('Cannot get ownerNote by owner ID', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

 async function getOwnnerId(id){
    try{
        const ownerId=  noteRepository.getOwnnerId(id);
        return ownerId;
    }
    catch(error){
        throw new AppError('Cannot get owner ID', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function shareNote(userIdToShareWith, noteId) {
    try {
        const note = await noteRepository.get(noteId);

        if (!note) {
            throw new AppError('Note not found', StatusCodes.NOT_FOUND);
        }

        if (!note.sharedWith.includes(userIdToShareWith)) {
            note.sharedWith.push(userIdToShareWith);
            await note.save();
        }

        return note;  // Return the modified note if needed
    } catch (error) {
        console.error('Error in shareNote:', error);
        throw new AppError(`Cannot share note: ${error.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createNote,
    getNote,
    destroyNote,
    updateNote,
    getNoteByOwnerId,
    getOwnnerId,
    shareNote
}


