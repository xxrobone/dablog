import Heading from '@components/heading';
import HomeGrid from '@components/homecontent/HomeGrid';
import HomeHeading from '@components/pageHeadings/homeHeading';
// styles

export default function Home() {
  return (
    <>
      <Heading>
        <HomeHeading />
      </Heading>
      <HomeGrid />
    </>
  );
}
