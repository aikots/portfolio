import { Fragment } from 'react';
import { classes } from '~/utils/style';
import styles from './heading.module.css';

export const Heading = ({
  children,
  level = 1,
  as,
  align = 'auto',
  weight = 'bold',
  className,
  ...rest
}) => {
  const clampedLevel = Math.min(Math.max(level, 0), 5);
  const Component = as || `h${Math.max(clampedLevel, 1)}`;

  return (
    <Fragment>
      <Component
        className={classes(styles.heading, className)}
        data-align={align}
        data-weight={weight}
        data-level={clampedLevel}
        style={{
          fontFamily: 'Oswald, sans-serif',
          fontWeight: '700'
        }}
        {...rest}
      >
        {children}
      </Component>
    </Fragment>
  );
};
