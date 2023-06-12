import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import RootLayout from '../components/root-layout';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import { supabase } from '@/lib/supabaseClient'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
/*   const [supabaseClient] = useState(() => createPagesBrowserClient()); */

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <RootLayout>
        <Component {...pageProps} />
        <div id='root'></div>
      </RootLayout>
    </SessionContextProvider>
  );
}
