import Heading from '@components/heading';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
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
      <Auth
        redirectTo='http://localhost:3000/'
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={[]}
        socialLayout='horizontal'
      />
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

export default LoginPage;
