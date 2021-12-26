export type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keyword?: string;
};

export interface LayoutProps extends MetaProps {
  className?: string;
  hideUserInfo?: boolean;
  children: React.ReactNode;
}
