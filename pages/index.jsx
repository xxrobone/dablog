import Head from 'next/head';
import Heading from '@components/heading';
import HomeGrid from '@components/homecontent/HomeGrid';
import HomeHeading from '@components/pageHeadings/homeHeading';
// styles

const Home = () => {
  return (
    <>
      <Head lang='en'>
        <title>Da Blog by Rob</title>
        <meta
          name='description'
          content='Blog project by Rob, assignment at cme educations, a blog using supabase and next.js amongts other libraries'
        />
        <meta property='og:title' content='Da blog by Rob' />
      </Head>
        <Heading>
          <HomeHeading />
        </Heading>
        <HomeGrid />
    </>
  );
};

export default Home;
