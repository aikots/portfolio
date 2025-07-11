import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './section.module.css';

export const Section = forwardRef(
  ({ as: Component = 'div', children, className, ...rest }, ref) => (
    <Component className={classes(styles.section, className)} ref={ref} {...rest}>
      <div className={styles.sectionContent}>
        {children}
      </div>
    </Component>
  )
);
