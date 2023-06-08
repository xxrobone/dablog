import styles from './root-layout.module.css';
import Sidebar from '../sidebar';
import Logo from '@components/logo/Logo';
import classNames from 'classnames';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <div className={classNames(styles.container, inter.className)}>
      <Logo />
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
