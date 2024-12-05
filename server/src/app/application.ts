import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "../config/di-container";
import connectToDB from '../config/db';
import { AppError } from '../utils/error.util';
import cookieParser from 'cookie-parser'

export class App {
  async setup() {
    console.clear()
    dotenv.config()
    connectToDB()
    const PORT = process.env.PORT || 5000;
    const server = new InversifyExpressServer(container, null, { rootPath: "/api" })


    server.setConfig((app) => {
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json());
      app.use(cookieParser());

    })

    server.setErrorConfig((app) => {
      app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.log('inside global error')
        console.error(err.stack);
        console.error(err.message);
        // Check for custom AppError
        if (err instanceof AppError) {
          res.status(err.status).json({
            message: err.message,
          });
          return
        }
        // Default to 500 Internal Server Error for unknown errors
        res.status(500).json({
          message: 'Internal Server Error',
        });
      });
    });

    let app = server.build()

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  }
}