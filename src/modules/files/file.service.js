import File from './file.model.js';
import Folder from '../folders/folder.model.js';
import Activity from '../activity/activity.model.js';
import { FILE_TYPES, ACTIVITY_ACTIONS, ITEM_TYPES } from '../../utils/constants.js';
import { promises as fs } from 'fs';
import path from 'path';

const createFile = async (fileData) => {
  const file = await File.create(fileData);
  
  // Log activity
  await Activity.create({
    user: fileData.owner,
    action: fileData.type === FILE_TYPES.NOTE ? ACTIVITY_ACTIONS.CREATE : ACTIVITY_ACTIONS.UPLOAD,
    itemType: ITEM_TYPES.FILE,
    itemId: file._id,
    itemName: file.name,
    details: { fileType: file.type }
  });
  
  return file;
};

const getUserFiles = async (userId, folderId = null) => {
  const query = { owner: userId };
  
  if (folderId) {
    query.folder = folderId;
  } else {
    query.folder = null;
  }
  
  const files = await File.find(query).populate('folder', 'name').sort({ createdAt: -1 });
  return files;
};

const getFileById = async (fileId, userId) => {
  const file = await File.findOne({ _id: fileId, owner: userId }).populate('folder', 'name');
  return file;
};

const renameFile = async (fileId, userId, newName) => {
  const file = await File.findOneAndUpdate(
    { _id: fileId, owner: userId },
    { name: newName },
    { new: true }
  );
  
  if (file) {
    await Activity.create({
      user: userId,
      action: ACTIVITY_ACTIONS.RENAME,
      itemType: ITEM_TYPES.FILE,
      itemId: file._id,
      itemName: newName,
      details: { oldName: file.name, newName }
    });
  }
  
  return file;
};

const duplicateFile = async (fileId, userId) => {
  const originalFile = await File.findOne({ _id: fileId, owner: userId });
  
  if (!originalFile) {
    return null;
  }
  
  const duplicateData = {
    name: `${originalFile.name} - Copy`,
    type: originalFile.type,
    owner: userId,
    folder: originalFile.folder,
    size: originalFile.size,
    mimeType: originalFile.mimeType
  };
  
  if (originalFile.type === FILE_TYPES.NOTE) {
    duplicateData.content = originalFile.content;
  } else {
    // For files with actual files, we need to copy the file
    const oldPath = originalFile.path;
    const ext = path.extname(oldPath);
    const newFilename = `file-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    const newPath = path.join(path.dirname(oldPath), newFilename);
    
    await fs.copyFile(oldPath, newPath);
    duplicateData.path = newPath;
  }
  
  const duplicatedFile = await File.create(duplicateData);
  
  await Activity.create({
    user: userId,
    action: ACTIVITY_ACTIONS.DUPLICATE,
    itemType: ITEM_TYPES.FILE,
    itemId: duplicatedFile._id,
    itemName: duplicatedFile.name,
    details: { originalFileId: fileId }
  });
  
  return duplicatedFile;
};

const deleteFile = async (fileId, userId) => {
  const file = await File.findOne({ _id: fileId, owner: userId });
  
  if (!file) {
    return null;
  }
  
  // Soft delete
  file.isDeleted = true;
  await file.save();
  
  // Delete physical file if it exists
  if (file.path && file.type !== FILE_TYPES.NOTE) {
    try {
      await fs.unlink(file.path);
    } catch (err) {
      console.error('Error deleting physical file:', err);
    }
  }
  
  await Activity.create({
    user: userId,
    action: ACTIVITY_ACTIONS.DELETE,
    itemType: ITEM_TYPES.FILE,
    itemId: file._id,
    itemName: file.name,
    details: { fileType: file.type }
  });
  
  return file;
};

export {
  createFile,
  getUserFiles,
  getFileById,
  renameFile,
  duplicateFile,
  deleteFile
};