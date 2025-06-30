import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  role?: string;
  username?: string;
  name?: string;
  exp: number;
  [key: string]: any; // Add this to allow any extra fields
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
