import { DehydratedState } from 'react-query';

declare global {
  declare const APP_VERSION: string;

  type AppPageProps<T = {}> = T & {
    dehydratedState?: DehydratedState;
  };

  type PaginationParam<LastValue = any> = {
    limit?: number;
    lastKey?: string;
    lastValue?: LastValue;
  };
}
