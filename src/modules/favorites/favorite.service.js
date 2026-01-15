import Favorite from './favorite.model.js';
import File from '../files/file.model.js';
import Folder from '../folders/folder.model.js';
import Activity from '../activity/activity.model.js';
import { ITEM_TYPES, ACTIVITY_ACTIONS } from '../../utils/constants.js';

const addToFavorites = async (userId, itemType, itemId) => {
  // Check if already favorited
  const existing = await Favorite.findOne({ user: userId, itemType, itemId });
  
  if (existing) {
    throw new Error('Item is already in favorites');
  }
  
  // Verify item exists
  const Model = itemType === ITEM_TYPES.FILE ? File : Folder;
  const item = await Model.findOne({ _id: itemId, owner: userId });
  
  if (!item) {
    throw new Error('Item not found');
  }
  
  const favorite = await Favorite.create({
    user: userId,
    itemType,
    itemId
  });
  
  await Activity.create({
    user: userId,
    action: ACTIVITY_ACTIONS.FAVORITE,
    itemType,
    itemId,
    itemName: item.name
  });
  
  return favorite;
};

const removeFromFavorites = async (userId, itemType, itemId) => {
  const favorite = await Favorite.findOneAndDelete({
    user: userId,
    itemType,
    itemId
  });
  
  if (!favorite) {
    throw new Error('Item is not in favorites');
  }
  
  // Get item name for activity log
  const Model = itemType === ITEM_TYPES.FILE ? File : Folder;
  const item = await Model.findById(itemId);
  
  await Activity.create({
    user: userId,
    action: ACTIVITY_ACTIONS.UNFAVORITE,
    itemType,
    itemId,
    itemName: item ? item.name : 'Unknown'
  });
  
  return favorite;
};

const getUserFavorites = async (userId) => {
  const favorites = await Favorite.find({ user: userId }).sort({ createdAt: -1 });
  
  const files = [];
  const folders = [];
  
  for (const fav of favorites) {
    if (fav.itemType === ITEM_TYPES.FILE) {
      const file = await File.findById(fav.itemId);
      if (file) {
        files.push({ ...file.toObject(), favoritedAt: fav.createdAt });
      }
    } else {
      const folder = await Folder.findById(fav.itemId);
      if (folder) {
        folders.push({ ...folder.toObject(), favoritedAt: fav.createdAt });
      }
    }
  }
  
  return { files, folders };
};

export {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites
};