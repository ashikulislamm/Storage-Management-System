import mongoose from 'mongoose';
import { ITEM_TYPES } from '../../utils/constants.js';

const favoriteSchema = new mongoose.Schema({
  user: {
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
  }
}, {
  timestamps: true
});

favoriteSchema.index({ user: 1, itemType: 1, itemId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);