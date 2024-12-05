import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployer extends Document {
  companyName: string;
  email: string;
  password: string;
  companyWebsite?: string;
  industry?: string;
  jobsPosted: {
    jobId: mongoose.Types.ObjectId;
    postedAt: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const EmployerSchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    companyWebsite: { type: String },
    industry: { type: String },
    jobsPosted: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        postedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } 
);

const Employer = mongoose.model<IEmployer>('Employer', EmployerSchema);
export default Employer;
