
import 'reflect-metadata'

import { App } from './app/application';

export async function bootstrap() {
  const app = new App()
  await app.setup()
  
}

bootstrap()





