import express from 'express';
import * as folderController from './folder.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import {
  createFolderValidation,
  renameFolderValidation,
  folderIdValidation
} from './folder.validation.js';

const router = express.Router();

router.use(protect);

router.post('/', createFolderValidation, folderController.createFolder);
router.get('/', folderController.getAllFolders);
router.get('/:folderId', folderIdValidation, folderController.getFolder);
router.get('/:folderId/contents', folderIdValidation, folderController.getFolderContents);
router.put('/:folderId/rename', renameFolderValidation, folderController.renameFolder);
router.post('/:folderId/duplicate', folderIdValidation, folderController.duplicateFolder);
router.delete('/:folderId', folderIdValidation, folderController.deleteFolder);

export default router;