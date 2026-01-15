import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Folder name is required'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parent: {
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

folderSchema.pre(/^find/, function(next) {
  this.where({ isDeleted: false });
  next();
});

folderSchema.index({ owner: 1, isDeleted: 1 });
folderSchema.index({ parent: 1, isDeleted: 1 });

export default mongoose.model('Folder', folderSchema);