import mongoose from 'mongoose';
import { FILE_TYPES } from '../../utils/constants.js';

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'File name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'File type is required'],
    enum: Object.values(FILE_TYPES)
  },
  path: {
    type: String,
    // Required for image and pdf, not for note
    required: function() {
      return this.type !== FILE_TYPES.NOTE;
    }
  },
  content: {
    type: String,
    // Required for note, not for image and pdf
    required: function() {
      return this.type === FILE_TYPES.NOTE;
    }
  },
  size: {
    type: Number,
    default: 0
  },
  mimeType: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Exclude deleted files from queries by default
fileSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: false });
  next();
});

// Index for faster queries
fileSchema.index({ owner: 1, isDeleted: 1 });
fileSchema.index({ folder: 1, isDeleted: 1 });

export default mongoose.model('File', fileSchema);