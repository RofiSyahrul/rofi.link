import type { DehydratedState } from 'react-query';

declare global {
  declare const APP_NAME: string;
  declare const APP_VERSION: string;
  declare const AUTHOR_NAME: string;
  declare const AUTHOR_URL: string;

  type AppPageProps<T = {}> = T & {
    dehydratedState?: DehydratedState;
    cookies?: string;
  };

  type PaginationParam<LastValue = any> = {
    limit?: number;
    lastKey?: string;
    lastValue?: LastValue;
  };
}
