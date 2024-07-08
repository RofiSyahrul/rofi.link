import { Prisma } from '@prisma/client';

import { client } from '../client';

export const withSoftDelete = Prisma.defineExtension({
  name: 'withSoftDelete',
  model: {
    account: {
      async softDelete(id: string, email = id, gaId = id) {
        const res = await client.account.update({
          data: {
            deletedAt: new Date(),
            email: `DELETED_${email}`,
            googleAccountId: `DELETED_${gaId}`,
          },
          where: { id },
          select: { id: true, name: true },
        });
        return res;
      },
    },

    url: {
      async softDelete(id: string, slug = id) {
        const res = await client.url.update({
          data: {
            deletedAt: new Date(),
            slug: `DELETED_${slug}`,
          },
          where: { id },
          select: { id: true, actualURL: true },
        });
        return res;
      },
    },
  },

  query: {
    $allModels: {
      async aggregate({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return await query(args);
      },
      async count({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return await query(args);
      },
      async groupBy({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return await query(args);
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return await query(args);
      },
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return await query(args);
      },
      async findUnique({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return await query(args);
      },
      delete() {
        return Promise.resolve({});
      },
    },
  },
});
