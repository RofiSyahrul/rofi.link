import { Prisma } from '@prisma/client';

export const withUtils = Prisma.defineExtension({
  name: 'withUtils',
  client: {
    isUniqueConstraintFailed(
      error: any,
    ): error is Prisma.PrismaClientKnownRequestError {
      return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        /unique constraint failed/i.test(error.message)
      );
    },
  },
});
