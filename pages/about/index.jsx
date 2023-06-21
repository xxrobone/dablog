import Head from 'next/head';
import Heading from '@components/heading';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './about.module.scss';
import AboutHeading from '../../components/pageHeadings/aboutHeading';

export default function About() {
  return (
    <div className={styles.about}>
       <Head lang='en'>
        <title>Da Blog - About me myself and I</title>
        <meta
          name='description'
          content='About developer Robert Wägar'
        />
        <meta property='og:title' content='Da blog by Rob' />
      </Head>
      <Heading>
        <AboutHeading />
      </Heading>
      <motion.article
        className={styles.content_wrapper}
        initial={{ y: 1000, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <marquee bgcolor='#ffffff' direction='left' width='65%'>
          Today best alterntive would be Keyframes, animejs or framer-motion...
        </marquee>
        <marquee>Sadly the marquee tag is deprecated...</marquee>
        <marquee direction='right' behavior='slide'>
          These animations are done with pure html
        </marquee>
        <marquee behavior='slide' direction='left'>
          that is pretty cool right?
        </marquee>
        <marquee scrollamount='10'>
          the development goes fast forward now
        </marquee>
        <marquee scrolldelay='200'>so much to learn</marquee>
        <marquee bgcolor='#000000' width='50%'>
          100% coffee & code
        </marquee>
      </motion.article>
      <div className={styles.about_hero}>
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.about_wrapper}>
        <p>My name is</p>
        <h2>Robert &apos;Rob-One&apos; Wägar</h2>
        <section>
          <p>
            I&apos;m a Dad to two beautiful boys, I&apos;m a developer &
            I&apos;m a dancer(dance teacher)
            <br />
            Yes I got two professions and both are also my hobbies. I have the
            opportunity to be creative, and learn new things while working, this
            is awesome and gives me a boost everyday. <br />
            I love both of my jobs! I found good helpful friends in both
            industries & I&apos;m greatful for this. I see myself as a tech and
            dance &quot;nerd&quot; <br />I speak Swedish, Finnish & English, I
            love great movies mostly classics & cartoons, taking long walks in
            the forest to clear my mind and breathe
          </p>
        </section>
        <section>
          <h2 className='textSplit fadeInRight stop'>My developer work</h2>
          <p>
            Is to build smart user interfaces & useful interactions and develop
            functionality of web pages with Javascript, React, Next.js with
            sass, styled-components, tailwind, framer-motion, anime.js, MERN
            stack, currently learning supabase and typescript always on the lookout for whats new in tech.<br />I have also done smaller and mid scale projects. Below you can see an example of a project I did for a customer in LA / US
            (upgrading from wordpress to nextjs, still using wp as a headless cms)
            <br />
            <a
              href='https://www.lockerlegends.org/'
              target='_blank'
              rel='noreferrer noopener'
            >
              LockerLegends website
            </a>
            ... Im also currently back on updating his webpage and working for
            lockerlegends at the moment on my free time
          </p>
        </section>
        <section>
          <h2 className='textSplit fadeInRight stop'>
            Inspiration Ideas Creativity
          </h2>
          <p>
            {' '}
            I&apos;m always looking for creative solutions in everythings life.
            Without creativity we would be standing still, to inspire others to
            find and learn new things, is one of the hightlight of my life. I
            love seeing others reach their goals and make their dreams come
            true. I&apos;m happy that I have been able to help others, inspiring
            new generations in dancing, and in the future looking forward to
            help new developers
          </p>
        </section>
        <section>
          <h2 className='textSplit fadeInRight stop'>
            Creativity art design and technology
          </h2>
          <p>
            I belive that these skills with the right mindset & in the right
            hands, is the &apos;tools&apos; to solve our future problems. We
            should always thrive to find new and better ways, and keep in mind
            that we are creative beings, if allowed to enhance and boost those
            abilities
          </p>
        </section>
        <section>
          <h2 className='textSplit fadeInRight stop'>My work as a dancer</h2>
          <p>
            I been working with artforms within the dance &quot;world&quot;,
            since 1990, performing, teaching, organizing, helping schools to
            find &quot;streetdance&quot; teachers, mentoring dancers, set
            schedules, worked with different projects, also with non-profit
            organizations and inspired the youth and kids to move their bodies.
            I&apos;ve aslo been deeply involved and interested in the artforms
            and culture of HIP-HOP & FUNK, a deep passion for the dance style &
            artform of locking
            <br />
          </p>
        </section>
        <section>
          <h2 className='textSplit fadeInRight stop'>
            Dance and code? Connection?
          </h2>
          <p>
            Working with creativity and artforms has helped me a lot in my life,
            and now when I&apos;m coding I see the similarities between the two.
            Co-work, team-work is a key to better &quot;performance&quot; and
            also communication is must to be able to work together. If there is
            a problem, analyze it and find a solution.
            <br />
            In the artform of Hip-Hop, there is a saying - ALWAYS A STUDENT, in
            otherwords always be open to learn new, so this is what I saw in
            programming, and it might not be the same vocabulary, but the same
            thought. <br />
            <br />
            Today both dancing and developing, learning new as I go and working
            with this for a few years, coding just becomes more fun for everyday
            that passes. :D
            <br />
          </p>
        </section>
      </div>
    </div>
  );
}
