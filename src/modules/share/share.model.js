import mongoose from 'mongoose';
import { ITEM_TYPES, SHARE_PERMISSIONS } from '../../utils/constants.js';

const shareSchema = new mongoose.Schema({
  sharedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sharedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemType: {
    type: String,
    required: true,
    enum: Object.values(ITEM_TYPES)
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  permission: {
    type: String,
    required: true,
    enum: Object.values(SHARE_PERMISSIONS),
    default: SHARE_PERMISSIONS.VIEW
  }
}, {
  timestamps: true
});

shareSchema.index({ sharedWith: 1, itemType: 1, itemId: 1 });
shareSchema.index({ sharedBy: 1, itemType: 1, itemId: 1 });

export default mongoose.model('Share', shareSchema);