// src/auth/jwt-payload.interface.ts

export interface JwtPayload {
  sub: string;         // ID del usuario
  email: string;       // Email del usuario
  name?: string;       // Nombre completo (opcional)
  iat?: number;        // Tiempo de emisión del token
  exp?: number;        // Tiempo de expiración del token
}
