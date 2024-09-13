import styles from './AdviceAnalysis.module.css';
import Blobs from '@/shared/assets/images/blobs.svg?react';
import Coffee from '@/shared/assets/images/coffee.svg?react';
import Stats from '@/shared/assets/images/stats.svg?react';

const AdviceAnalysis = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div>
          <h6>Совет дня</h6>
          <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur adipiscing elit.</small>
        </div>
        <Stats />
        <div className={styles.blobs}>
          <Blobs />
        </div>
      </div>

      <div className={styles.block}>
        <div>
          <h6>Анализ отзывов</h6>
          <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
        </div>
        <Coffee />
        <div className={styles.blobs}>
          <Blobs />
        </div>
      </div>
    </div>
  );
};

export default AdviceAnalysis;
