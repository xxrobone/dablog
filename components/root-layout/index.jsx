import styles from './root-layout.module.scss';
import Sidebar from '../sidebar';
import Logo from '@components/logo/Logo';
import Socials from '@components/socials/Socials';
import classNames from 'classnames';
import ThemeSelector from '@styles/themes/themeSelector';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <main className={`${classNames(styles.container, inter.className)} light`}>
      <Logo />
      <ThemeSelector />
      <Socials />
      <Sidebar />
      {children}
    </main>
  );
}
