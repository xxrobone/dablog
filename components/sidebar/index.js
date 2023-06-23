'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './sidebar.module.scss';
import classNames from 'classnames';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const navItems = {
  '/': {
    name: 'Home',
  },
  '/about': {
    name: 'About',
  },
  '/blog': {
    name: 'Blog',
  },
  '/create-post': {
    name: 'Create post',
    requiresAuth: true,
  },
  '/login': {
    name: 'Login',
    requiresAuth: false,
  },
  '/logout': {
    name: 'Logout',
    requiresAuth: true,
    onClick: async (supabaseClient, router) => {
      await supabaseClient.auth.signOut();
      router.push('/');
    },
  },
};

export default function Navbar() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const sidebarRef = useRef();

  useEffect(() => {
   /*  if (window.innerWidth > 959) { */
      let prevScrollpos = window.pageYOffset;

      const handleScroll = () => {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
          sidebarRef.current.classList.add(`${styles.container && styles.bgorange}`);
          sidebarRef.current.classList.remove(`${styles.container && styles.hide}`);
        } else {
          sidebarRef.current.classList.add(`${styles.hide}`);
          sidebarRef.current.classList.remove(`${styles.bgorange}`);
        }
        prevScrollpos = currentScrollPos;
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    /* } */
  }, []);

  return (
    <aside className={`${styles.container} `} ref={sidebarRef}>
      <nav className={styles.navigation} id='nav'>
        <div className={styles.navigationItemWrapper}>
          {Object.entries(navItems).map(
            ([path, { name, requiresAuth, onClick }]) => {
              const isActive = path === pathname;

              if ((requiresAuth && !user) || (path === '/login' && user)) {
                return null;
              }

              if (path === '/logout') {
                return (
                  <button
                    key={name}
                    className={classNames(styles.navBtn, {
                      [styles.textNeutral]: !isActive,
                      [styles.fontBold]: isActive,
                    })}
                    onClick={() => onClick(supabaseClient, router)}
                  >
                    {name}
                  </button>
                );
              }
              return (
                <Link
                  key={name}
                  href={path}
                  className={classNames(styles.navigationItem, {
                    [styles.textNeutral]: !isActive,
                    [styles.fontBold]: isActive,
                  })}
                >
                  <span className={styles.linkName}>{name}</span>
                </Link>
              );
            }
          )}
        </div>
      </nav>
    </aside>
  );
}
