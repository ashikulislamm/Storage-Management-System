import Share from './share.model.js';
import User from '../users/user.model.js';
import File from '../files/file.model.js';
import Folder from '../folders/folder.model.js';
import Activity from '../activity/activity.model.js';
import { ITEM_TYPES, ACTIVITY_ACTIONS, SHARE_PERMISSIONS } from '../../utils/constants.js';

const shareItem = async (userId, itemType, itemId, sharedWithEmail, permission = SHARE_PERMISSIONS.VIEW) => {
  // Find recipient user
  const recipient = await User.findOne({ email: sharedWithEmail });
  
  if (!recipient) {
    throw new Error('Recipient user not found');
  }
  
  if (recipient._id.toString() === userId.toString()) {
    throw new Error('Cannot share with yourself');
  }
  
  // Verify item exists and user owns it
  const Model = itemType === ITEM_TYPES.FILE ? File : Folder;
  const item = await Model.findOne({ _id: itemId, owner: userId });
  
  if (!item) {
    throw new Error('Item not found or you do not have permission to share it');
  }
  
  // Check if already shared
  const existing = await Share.findOne({
    sharedBy: userId,
    sharedWith: recipient._id,
    itemType,
    itemId
  });
  
  if (existing) {
    // Update permission if already shared
    existing.permission = permission;
    await existing.save();
    return existing;
  }
  
  const share = await Share.create({
    sharedBy: userId,
    sharedWith: recipient._id,
    itemType,
    itemId,
    permission
  });
  
  await Activity.create({
    user: userId,
    action: ACTIVITY_ACTIONS.SHARE,
    itemType,
    itemId,
    itemName: item.name,
    details: { sharedWith: recipient.email, permission }
  });
  
  return share;
};

const getSharedWithMe = async (userId) => {
  const shares = await Share.find({ sharedWith: userId })
    .populate('sharedBy', 'username email')
    .sort({ createdAt: -1 });
  
  const files = [];
  const folders = [];
  
  for (const share of shares) {
    if (share.itemType === ITEM_TYPES.FILE) {
      const file = await File.findById(share.itemId);
      if (file) {
        files.push({
          ...file.toObject(),
          shareInfo: {
            id: share._id,
            sharedBy: share.sharedBy,
            permission: share.permission,
            sharedAt: share.createdAt
          }
        });
      }
    } else {
      const folder = await Folder.findById(share.itemId);
      if (folder) {
        folders.push({
          ...folder.toObject(),
          shareInfo: {
            id: share._id,
            sharedBy: share.sharedBy,
            permission: share.permission,
            sharedAt: share.createdAt
          }
        });
      }
    }
  }
  
  return { files, folders };
};

const getMyShares = async (userId) => {
  const shares = await Share.find({ sharedBy: userId })
    .populate('sharedWith', 'username email')
    .sort({ createdAt: -1 });
  
  const items = [];
  
  for (const share of shares) {
    const Model = share.itemType === ITEM_TYPES.FILE ? File : Folder;
    const item = await Model.findById(share.itemId);
    
    if (item) {
      items.push({
        shareId: share._id,
        itemType: share.itemType,
        item: item,
        sharedWith: share.sharedWith,
        permission: share.permission,
        sharedAt: share.createdAt
      });
    }
  }
  
  return items;
};

const revokeShare = async (shareId, userId) => {
  const share = await Share.findOne({ _id: shareId, sharedBy: userId });
  
  if (!share) {
    throw new Error('Share not found or you do not have permission to revoke it');
  }
  
  await share.deleteOne();
  
  return share;
};

export {
  shareItem,
  getSharedWithMe,
  getMyShares,
  revokeShare
};