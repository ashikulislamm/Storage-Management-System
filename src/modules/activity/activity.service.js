import Activity from './activity.model.js';

const getUserActivities = async (userId, limit = 50) => {
  const activities = await Activity.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
  
  return activities;
};

const getActivitiesByDate = async (userId, date) => {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  
  const activities = await Activity.find({
    user: userId,
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ createdAt: -1 });
  
  return activities;
};

const getActivitiesByDateRange = async (userId, startDate, endDate) => {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  
  const activities = await Activity.find({
    user: userId,
    createdAt: {
      $gte: start,
      $lte: end
    }
  }).sort({ createdAt: -1 });
  
  return activities;
};

const getCalendarData = async (userId, year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  
  const activities = await Activity.find({
    user: userId,
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  });
  
  // Group by date
  const calendar = {};
  
  activities.forEach(activity => {
    const date = activity.createdAt.toISOString().split('T')[0];
    
    if (!calendar[date]) {
      calendar[date] = {
        date,
        count: 0,
        activities: []
      };
    }
    
    calendar[date].count++;
    calendar[date].activities.push({
      id: activity._id,
      action: activity.action,
      itemType: activity.itemType,
      itemName: activity.itemName,
      time: activity.createdAt
    });
  });
  
  return Object.values(calendar).sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
};

export {
  getUserActivities,
  getActivitiesByDate,
  getActivitiesByDateRange,
  getCalendarData
};