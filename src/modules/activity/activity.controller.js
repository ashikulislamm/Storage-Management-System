import * as activityService from './activity.service.js';
import { sendSuccess } from '../../utils/response.helper.js';
import { STATUS_CODES } from '../../utils/constants.js';

const getAllActivities = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const activities = await activityService.getUserActivities(req.user._id, limit);
    
    return sendSuccess(res, STATUS_CODES.OK, 'Activities retrieved successfully', { activities });
  } catch (error) {
    next(error);
  }
};

const getActivitiesByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const activities = await activityService.getActivitiesByDate(req.user._id, date);
    
    return sendSuccess(res, STATUS_CODES.OK, 'Activities retrieved successfully', { 
      date,
      count: activities.length,
      activities 
    });
  } catch (error) {
    next(error);
  }
};

const getActivitiesByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const activities = await activityService.getActivitiesByDateRange(
      req.user._id, 
      startDate, 
      endDate
    );
    
    return sendSuccess(res, STATUS_CODES.OK, 'Activities retrieved successfully', { 
      startDate,
      endDate,
      count: activities.length,
      activities 
    });
  } catch (error) {
    next(error);
  }
};

const getCalendar = async (req, res, next) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    
    const calendar = await activityService.getCalendarData(req.user._id, year, month);
    
    return sendSuccess(res, STATUS_CODES.OK, 'Calendar data retrieved successfully', { 
      year,
      month,
      calendar 
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllActivities,
  getActivitiesByDate,
  getActivitiesByDateRange,
  getCalendar
};