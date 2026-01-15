import express from 'express';
import * as favoriteController from './favorite.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { itemIdValidation } from './favorite.validation.js';

const router = express.Router();

router.use(protect);

router.post('/file/:fileId', itemIdValidation, favoriteController.addFileFavorite);
router.post('/folder/:folderId', itemIdValidation, favoriteController.addFolderFavorite);
router.delete('/file/:fileId', itemIdValidation, favoriteController.removeFileFavorite);
router.delete('/folder/:folderId', itemIdValidation, favoriteController.removeFolderFavorite);
router.get('/', favoriteController.getAllFavorites);

export default router;