import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  location?: string;
  salary?: string;
  companyName?: string;
  employerId: mongoose.Types.ObjectId; // Reference to the Employer model
  applicants: {
    jobSeekerId: mongoose.Types.ObjectId;
    appliedAt: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    salary: { type: String },
    companyName: { type: String },
    employerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Employer', 
      required: true 
    }, // Reference to the employer
    applicants: [
      {
        jobSeekerId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' },
        appliedAt: { type: Date, default: Date.now },
      },
    ], // List of applicants for this job
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const Job = mongoose.model<IJob>('Job', JobSchema);
export default Job;
