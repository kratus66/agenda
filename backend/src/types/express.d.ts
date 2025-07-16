import { UserFromJwt } from '../auth/jwt-payload.interface'; // definiremos esto en el siguiente paso
import 'express';

declare module 'express' {
  export interface Request {
    user?: UserFromJwt;
  }
}
