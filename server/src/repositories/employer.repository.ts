import { injectable } from 'inversify';
import Employer, { IEmployer } from '../models/employer.model';
import { IEmployerRepository } from '../interfaces/IEmployerRepository';

@injectable() // Add this decorator
export class EmployerRepository implements IEmployerRepository {
   async create(employerData: Partial<IEmployer>): Promise<IEmployer> {
     console.log('inside repo')
     const newEmployer = new Employer(employerData);
     return await newEmployer.save();
   }

   async findByEmail(email: string): Promise<IEmployer | null> {
     return await Employer.findOne({ email });
   }
}