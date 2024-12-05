import { IEmployer } from "../models/employer.model";

export interface IEmployerRepository {
  create(employerData: Partial<IEmployer>): Promise<IEmployer>;
  findByEmail(email: string): Promise<IEmployer | null>;
}