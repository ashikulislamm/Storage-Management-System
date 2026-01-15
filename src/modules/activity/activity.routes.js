import express from 'express';
import * as activityController from './activity.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { dateValidation, dateRangeValidation } from './activity.validation.js';

const router = express.Router();

router.use(protect);

router.get('/', activityController.getAllActivities);
router.get('/date/:date', dateValidation, activityController.getActivitiesByDate);
router.get('/range', dateRangeValidation, activityController.getActivitiesByDateRange);
router.get('/calendar', activityController.getCalendar);

export default router;