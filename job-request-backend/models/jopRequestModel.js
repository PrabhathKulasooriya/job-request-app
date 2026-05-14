import mongoose from 'mongoose';

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open" 
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

const JobRequestModel = mongoose.models.JobRequest || mongoose.model('JobRequest', jobRequestSchema);

export default JobRequestModel;