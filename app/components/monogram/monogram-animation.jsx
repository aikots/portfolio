import styles from './monogram-animation.module.css';
import animation from '~/assets/Blob.mp4';
import { useEffect, useRef } from 'react';

export const LogoAnimation = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      animationRef.current?.setAttribute('data-visible', 'true');
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={animationRef} className={styles.animation}>
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={animation} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
