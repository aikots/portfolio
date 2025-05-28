import profileImg from '/images/profile.png';
import profileImgPlaceholder from '/images/profile.png';
import profileImgLarge from '/images/profile.png';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import katakana from './katakana.svg';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={`${styles.title} ${styles.orangeText}`} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hej hej!" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Katerina Tsioutsia, a Greek-born, Sweden-based designer blending architecture brains, product sense, and a big love for UX and 3D game art. I’m currently diving deep into an MSc in Interactive Media Technology, where I craft immersive experiences that live at the intersection of design, tech, and storytelling.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      From building spaces to building games, I bring a holistic, hands-on approach to problem-solving. I geek out over sleek interfaces, atmospheric 3D worlds, and, yes—Scandinavian chairs.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Let’s create something bold, beautiful, and maybe a little unexpected. 
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  src={profileImg}
                  width={480}
                  height={640}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Mina at the Qwilr office in Sydney"
                  alt="Me smiling like a goofball at the Qwilr office in Sydney"
                />
                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                  <use href={`${katakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
