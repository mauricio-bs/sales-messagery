import { compareSync, hashSync } from 'bcryptjs';

export function compareHash(password: string, hash: string): boolean {
  return compareSync(password, hash);
}

export function generateHash(password: string): string {
  return hashSync(password, Math.round(Math.random() * 10));
}
