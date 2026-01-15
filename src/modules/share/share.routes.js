import express from 'express';
import * as shareController from './share.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { shareValidation, shareIdValidation } from './share.validation.js';

const router = express.Router();

router.use(protect);

router.post('/file/:fileId', shareValidation, shareController.shareFile);
router.post('/folder/:folderId', shareValidation, shareController.shareFolder);
router.get('/shared-with-me', shareController.getSharedWithMe);
router.get('/my-shares', shareController.getMyShares);
router.delete('/:shareId', shareIdValidation, shareController.revokeShare);

export default router;