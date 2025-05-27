import splash2 from '~/assets/Splash 2.png';
import discovery from '~/assets/Discovery.png';
import eventDetails from '~/assets/Event Details.png';
import eventBrowsing from '~/assets/Event browsing (scrolled).png';
import homeScreen from '~/assets/Home Screen.png';
import initialScreen from '~/assets/Initial Screen.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Stamped"
        description="An app designed to foster connections between newcomers and locals in Stockholm through at-home events"
        buttonText="View project"
        buttonLink="/projects/smart-sparrow"
        model={{
          type: 'phone',
          alt: 'Event browsing interface',
          textures: [
            {
              srcSet: `${eventBrowsing} 375w, ${eventBrowsing} 750w`,
              placeholder: eventBrowsing,
            },
            {
              srcSet: `${eventDetails} 375w, ${eventDetails} 750w`,
              placeholder: eventDetails,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Shoppera"
        description="An app focusing on discounts of everyday items that provides a higher level of personalization, catering to the users' specific needs from the very first use"
        buttonText="View website"
        buttonLink="https://gamestack.hamishw.com"
        model={{
          type: 'phone',
          alt: 'App screens',
          textures: [
            {
              srcSet: `${splash2} 375w, ${splash2} 750w`,
              placeholder: splash2,
            },
            {
              srcSet: `${discovery} 375w, ${discovery} 750w`,
              placeholder: discovery,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Spotify: Music Discovery Re-design"
        description="A challenge given by Spotify to review and re-design their new music discovery process throughout the app"
        buttonText="View project"
        buttonLink="/projects/slice"
        model={{
          type: 'phone',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: `${initialScreen} 375w, ${initialScreen} 750w`,
              placeholder: initialScreen,
            },
            {
              srcSet: `${homeScreen} 375w, ${homeScreen} 750w`,
              placeholder: homeScreen,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
