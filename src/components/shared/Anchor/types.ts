import { UrlObject } from 'url';

import { BuildButtonClassNameParam } from '@/utils/class-name/types';

type HTMLAnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type BaseAnchorProps = BuildButtonClassNameParam & {
  href: string | UrlObject;
};

export type AnchorProps = HTMLAnchorProps & BaseAnchorProps;
