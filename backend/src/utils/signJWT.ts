import jwt from 'jsonwebtoken';

export const signJWT = (userId: string) => jwt.sign(userId, 'secret_jwt');
