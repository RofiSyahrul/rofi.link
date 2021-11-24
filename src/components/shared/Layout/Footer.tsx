import Image from 'next/image';

import NextJSLogo from '@/assets/nextjs.png';
import { ReactIcon, TailwindIcon, TypescriptIcon } from '@/components/icons';
import VercelIcon from '@/components/icons/VercelIcon';

import Anchor from '../Anchor';
import styles from './styles.module.css';

const tools: Array<{ name: string, href: string, icon: React.ReactNode }> = [
  {
    name: 'Next.js',
    href: 'https://nextjs.org/',
    icon: <Image src={NextJSLogo} alt='Next.js Logo' width={20} height={20} />
  },
  {
    name: 'React.js',
    href: 'https://reactjs.org/',
    icon: <ReactIcon />
  },
  {
    name: 'TypeScript',
    href: 'https://www.typescriptlang.org/',
    icon: <TypescriptIcon />
  },
  {
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com/',
    icon: <TailwindIcon />
  }
];

const totalTool = tools.length;

const toolNode = tools.map(({ name, href, icon }, index) => {
  const anchorNode = (
    <Anchor href={href} target='_blank'>
      {icon}
      {name}
    </Anchor>
  );

  if (index === totalTool - 1) {
    return (
      <span key={name}>
        dan
        &nbsp;
        {anchorNode}
      </span>
    );
  }

  return (
    <span key={name}>
      {anchorNode}
      ,&nbsp;
    </span>
  );
});

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span id='hosting-provider'>
        <em>Powered by</em>
        <Anchor href='https://vercel.com/home' target='_blank'>
          <VercelIcon />
        </Anchor>
      </span>
      <span>
        <strong>
          {APP_NAME}
        </strong>
        &nbsp;
        dibuat oleh
        &nbsp;
        <Anchor href={AUTHOR_URL} target='_blank'>
          {AUTHOR_NAME}
        </Anchor>
        &nbsp;
        menggunakan
        &nbsp;
        {toolNode}
      </span>
    </footer>
  );
}
