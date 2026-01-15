import Folder from './folder.model.js';
import File from '../files/file.model.js';
import Activity from '../activity/activity.model.js';
import { ACTIVITY_ACTIONS, ITEM_TYPES } from '../../utils/constants.js';

const createFolder = async (folderData) => {
  const folder = await Folder.create(folderData);
  
  await Activity.create({
    user: folderData.owner,
    action: ACTIVITY_ACTIONS.CREATE,
    itemType: ITEM_TYPES.FOLDER,
    itemId: folder._id,
    itemName: folder.name,
    details: { parentId: folder.parent }
  });
  
  return folder;
};

const getUserFolders = async (userId, parentId = null) => {
  const query = { owner: userId };
  
  if (parentId) {
    query.parent = parentId;
  } else {
    query.parent = null;
  }
  
  const folders = await Folder.find(query).populate('parent', 'name').sort({ createdAt: -1 });
  return folders;
};

const getFolderById = async (folderId, userId) => {
  const folder = await Folder.findOne({ _id: folderId, owner: userId }).populate('parent', 'name');
  return folder;
};

const getFolderContents = async (folderId, userId) => {
  const folder = await Folder.findOne({ _id: folderId, owner: userId });
  
  if (!folder) {
    return null;
  }
  
  const subfolders = await Folder.find({ parent: folderId, owner: userId });
  const files = await File.find({ folder: folderId, owner: userId });
  
  return {
    folder,
    subfolders,
    files
  };
};

const renameFolder = async (folderId, userId, newName) => {
  const folder = await Folder.findOneAndUpdate(
    { _id: folderId, owner: userId },
    { name: newName },
    { new: true }
  );
  
  if (folder) {
    await Activity.create({
      user: userId,
      action: ACTIVITY_ACTIONS.RENAME,
      itemType: ITEM_TYPES.FOLDER,
      itemId: folder._id,
      itemName: newName,
      details: { oldName: folder.name, newName }
    });
  }
  
  return folder;
};

const duplicateFolder = async (folderId, userId) => {
  const originalFolder = await Folder.findOne({ _id: folderId, owner: userId });
  
  if (!originalFolder) {
    return null;
  }
  
  const duplicatedFolder = await Folder.create({
    name: `${originalFolder.name} - Copy`,
    owner: userId,
    parent: originalFolder.parent
  });
  
  // Duplicate all files in the folder
  const files = await File.find({ folder: folderId, owner: userId });
  
  for (const file of files) {
    const duplicateData = {
      name: file.name,
      type: file.type,
      owner: userId,
      folder: duplicatedFolder._id,
      size: file.size,
      mimeType: file.mimeType
    };
    
    if (file.type === 'note') {
      duplicateData.content = file.content;
    } else {
      // For simplicity, we'll reference the same file
      // In production, you might want to copy the physical file
      duplicateData.path = file.path;
    }
    
    await File.create(duplicateData);
  }
  
  await Activity.create({
    user: userId,
    action: ACTIVITY_ACTIONS.DUPLICATE,
    itemType: ITEM_TYPES.FOLDER,
    itemId: duplicatedFolder._id,
    itemName: duplicatedFolder.name,
    details: { originalFolderId: folderId }
  });
  
  return duplicatedFolder;
};

const deleteFolder = async (folderId, userId) => {
  const folder = await Folder.findOne({ _id: folderId, owner: userId });
  
  if (!folder) {
    return null;
  }
  
  // Check if folder has contents
  const hasSubfolders = await Folder.exists({ parent: folderId });
  const hasFiles = await File.exists({ folder: folderId });
  
  if (hasSubfolders || hasFiles) {
    throw new Error('Cannot delete folder with contents');
  }
  
  // Soft delete
  folder.isDeleted = true;
  await folder.save();
  
  await Activity.create({
    user: userId,
    action: ACTIVITY_ACTIONS.DELETE,
    itemType: ITEM_TYPES.FOLDER,
    itemId: folder._id,
    itemName: folder.name
  });
  
  return folder;
};

export {
  createFolder,
  getUserFolders,
  getFolderById,
  getFolderContents,
  renameFolder,
  duplicateFolder,
  deleteFolder
};