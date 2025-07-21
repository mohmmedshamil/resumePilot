import { Schema, model } from 'mongoose';

const ResumeSchema = new Schema({
  user: {
    type: Object,
    required: true,
  },
  originalText: {
    type: String,
  },
  extractedData: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Resume', ResumeSchema);
