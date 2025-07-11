import { Button } from '~/components/button';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useParallax } from '~/hooks';
import { forwardRef, useRef } from 'react';
import { classes, cssProps, msToNum, numToMs } from '~/utils/style';
import { Model } from '~/components/model';
import { deviceModels } from '~/components/model/device-models';
import styles from './project.module.css';

const initDelay = 300;

export function ProjectHeader({
  title,
  description,
  linkLabel = 'View Prototype',
  url,
  roles,
  className,
  videoSrc,
}) {
  return (
    <Section className={classes(styles.header, className)} as="section" style={cssProps({
      initDelay: numToMs(initDelay),
    })}>
      <div className={styles.headerContent}>
        <div className={styles.textColumn}>
          <Heading className={styles.title} level={2} as="h1" weight="bold">
            {title}
          </Heading>
          <Text className={styles.description} size="xl" as="p">
            {description}
          </Text>
          {!!roles?.length && (
            <div className={styles.roles}>
              {roles?.map((role, index) => (
                <p
                  key={role}
                  className={styles.roleItem}
                  style={cssProps({ delay: numToMs(initDelay + 300 + index * 140) })}
                >
                  {role}
                </p>
              ))}
            </div>
          )}
          <div className={styles.buttonWrapper}>
            {!!url && (
              <Button
                secondary
                iconHoverShift
                className={styles.linkButton}
                icon="chevron-right"
                href={url}
              >
                {linkLabel}
              </Button>
            )}
          </div>
        </div>
        <div className={styles.katakanaText}>スタンプド</div>
        <div className={styles.phoneFrame} data-visible="true">
          <div className={styles.videoWrapper}>
            <div className={styles.videoColumn} data-visible="true">
              <video
                className={styles.video}
                src={videoSrc}
                loop
                muted
                playsInline
                autoPlay
                width="550"
                height="550"
                style={{
                  objectFit: 'cover',
                  overflow: 'hidden'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export const ProjectContainer = ({ className, ...rest }) => (
  <article className={classes(styles.project, className)} {...rest} />
);

export const ProjectSection = forwardRef(
  (
    {
      className,
      light,
      padding = 'both',
      fullHeight,
      backgroundOverlayOpacity = 0.9,
      backgroundElement,
      children,
      ...rest
    },
    ref
  ) => (
    <section
      className={classes(styles.section, className)}
      data-light={light}
      data-full-height={fullHeight}
      ref={ref}
      {...rest}
    >
      {!!backgroundElement && (
        <div
          className={styles.sectionBackground}
          style={cssProps({ opacity: backgroundOverlayOpacity })}
        >
          {backgroundElement}
        </div>
      )}
      <Section className={styles.sectionInner} data-padding={padding}>
        {children}
      </Section>
    </section>
  )
);

export const ProjectBackground = ({ opacity = 0.7, className, ...rest }) => {
  const imageRef = useRef();

  useParallax(0.6, value => {
    if (!imageRef.current) return;
    imageRef.current.style.setProperty('--offset', `${value}px`);
  });

  return (
    <Transition in timeout={msToNum(tokens.base.durationM)}>
      {({ visible, nodeRef }) => (
        <div
          className={classes(styles.backgroundImage, className)}
          data-visible={visible}
          ref={nodeRef}
        >
          <div className={styles.backgroundImageElement} ref={imageRef}>
            <Image cover alt="" role="presentation" {...rest} />
          </div>
          <div className={styles.backgroundScrim} style={cssProps({ opacity })} />
        </div>
      )}
    </Transition>
  );
};

export const ProjectImage = ({ className, alt, ...rest }) => (
  <div className={classes(styles.image, className)}>
    <Image reveal alt={alt} delay={300} {...rest} />
  </div>
);

export const ProjectSectionContent = ({ className, width = 'l', ...rest }) => (
  <div
    className={classes(styles.sectionContent, className)}
    data-width={width}
    {...rest}
  />
);

export const ProjectSectionHeading = ({ className, level = 3, as = 'h2', ...rest }) => (
  <Heading
    className={classes(styles.sectionHeading, className)}
    as={as}
    level={level}
    align="auto"
    {...rest}
  />
);

export const ProjectSectionText = ({ className, ...rest }) => (
  <Text className={classes(styles.sectionText, className)} size="l" as="p" {...rest} />
);

export const ProjectTextRow = ({
  center,
  stretch,
  justify = 'center',
  width = 'm',
  noMargin,
  className,
  centerMobile,
  ...rest
}) => (
  <div
    className={classes(styles.textRow, className)}
    data-center={center}
    data-stretch={stretch}
    data-center-mobile={centerMobile}
    data-no-margin={noMargin}
    data-width={width}
    data-justify={justify}
    {...rest}
  />
);

export const ProjectSectionColumns = ({ className, centered, ...rest }) => (
  <ProjectSectionContent
    className={classes(styles.sectionColumns, className)}
    data-centered={centered}
    {...rest}
  />
);
