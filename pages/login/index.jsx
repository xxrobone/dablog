import Heading from '@components/heading';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './login.module.scss';

const Login = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const router = useRouter();
  /* const [data, setData] = useState() */

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user)
    return (
      <div className={styles.login}>
        <Auth
          redirectTo='http://localhost:3000/'
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={[]}
          socialLayout='horizontal'
        />
      </div>
    );

  return (
    <>
      <p>Loading...</p>
    </>
  );
};

export default Login;
