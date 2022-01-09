import type { ReactNode } from 'react';

export type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keyword?: string;
};

export interface LayoutProps extends MetaProps {
  className?: string;
  additionalHeader?: ReactNode;
  children: ReactNode;
}
