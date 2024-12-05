import mongoose, { Schema, Document } from 'mongoose';

export interface IJobSeeker extends Document {
  name: string;
  email: string;
  password: string;
  phone: number;
  skills: string[];
  resume?: string;
  experience?: string;
  education?: string;
  workStatus: 'experienced' | 'fresher';
  appliedJobs: {
    jobId: mongoose.Types.ObjectId;
    appliedAt: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSeekerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    skills: { type: [String], default: [] }, // List of skills
    resume: { type: String }, // URL to the uploaded resume
    experience: { type: String }, 
    education: { type: String }, 
    workStatus: { 
      type: String, 
      enum: ['experienced', 'fresher'], 
      required: true 
    },
    appliedJobs: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        appliedAt: { type: Date, default: Date.now },
      },
    ], // Track applied jobs
  },
  { timestamps: true } 
);

const JobSeeker = mongoose.model<IJobSeeker>('JobSeeker', JobSeekerSchema);
export default JobSeeker;