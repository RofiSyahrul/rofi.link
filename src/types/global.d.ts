import { DehydratedState } from 'react-query';

declare global {
  declare const APP_VERSION: string;

  type AppPageProps<T = {}> = T & {
    dehydratedState?: DehydratedState;
  };
}
