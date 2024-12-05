import { Container } from "inversify";
import { EmployerService } from "../services/employer.service";
import { EmployerRepository } from "../repositories/employer.repository";
import { IEmployerRepository } from "../interfaces/IEmployerRepository";
import { EmployerController } from "../controllers/employer.controller";
import { TokenRepository } from "../repositories/token.repository";
import { ITokenRepository } from "../interfaces/ITokenRepository";

export const container = new Container({defaultScope: "Singleton"})

container.bind<EmployerService>('EmployerService').to(EmployerService);
container.bind<IEmployerRepository>('EmployerRepository').to(EmployerRepository);
container.bind<ITokenRepository>('TokenRepository').to(TokenRepository); 
container.bind<EmployerController>(EmployerController).toSelf();