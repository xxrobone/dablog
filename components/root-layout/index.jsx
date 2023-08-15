import styles from './root-layout.module.scss';
import Sidebar from '../sidebar';
import Logo from '@components/logo/Logo';
import Socials from '@components/socials/Socials';
import classNames from 'classnames';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <main className={`${classNames(styles.container, inter.className)} light`}>
      <Logo />
      <Socials />
      <Sidebar />
      {children}
    </main>
  );
}
