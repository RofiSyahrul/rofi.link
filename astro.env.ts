import type { AstroUserConfig } from 'astro';
import dotenv from 'dotenv';

dotenv.config();

type Env = Required<AstroUserConfig>['experimental']['env'];

export const env: Env = {
  schema: {},
};
