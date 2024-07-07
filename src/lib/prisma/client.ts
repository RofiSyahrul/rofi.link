import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __PRISMA__: PrismaClient | undefined;
}

export const client = global.__PRISMA__ ?? new PrismaClient();

if (import.meta.env.DEV) {
  global.__PRISMA__ = client;
}
