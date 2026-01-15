import express from 'express';
import * as fileController from './file.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { uploadSingle } from '../../middlewares/upload.middleware.js';
import {
  createNoteValidation,
  renameFileValidation,
  fileIdValidation
} from './file.validation.js';

const router = express.Router();

router.use(protect);

// Upload routes
router.post('/upload/image', uploadSingle('file'), fileController.uploadImage);
router.post('/upload/pdf', uploadSingle('file'), fileController.uploadPdf);

// Note routes
router.post('/note', createNoteValidation, fileController.createNote);

// File management routes
router.get('/', fileController.getAllFiles);
router.get('/:fileId', fileIdValidation, fileController.getFile);
router.put('/:fileId/rename', renameFileValidation, fileController.renameFile);
router.post('/:fileId/duplicate', fileIdValidation, fileController.duplicateFile);
router.delete('/:fileId', fileIdValidation, fileController.deleteFile);

export default router;