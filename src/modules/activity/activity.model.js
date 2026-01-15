import mongoose from 'mongoose';
import { ACTIVITY_ACTIONS, ITEM_TYPES } from '../../utils/constants.js';

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: Object.values(ACTIVITY_ACTIONS),
    },
    itemType: {
      type: String,
      required: true,
      enum: Object.values(ITEM_TYPES),
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ createdAt: -1 });

export default mongoose.model("Activity", activitySchema);
