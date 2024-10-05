import styles from './AdviceAnalysis.module.css';
import AdviceModal from '@/entities/advice-analysis /modals/AdviceModal.tsx';
import Blobs from '@/shared/assets/images/blobs.svg?react';
import Coffee from '@/shared/assets/images/coffee.svg?react';
import Stats from '@/shared/assets/images/stats.svg?react';
import { useState } from 'react';

const AdviceAnalysis = () => {
  const [isOpenAdvice, setIsOpenAdvice] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.block} onClick={() => setIsOpenAdvice(true)}>
        <div>
          <h6>Совет дня</h6>
          <small>Обновляем каждые 24 часа, будет полезен вашему бизнесу</small>
        </div>
        <Stats />
        <div className={styles.blobs}>
          <Blobs />
        </div>
      </button>

      <div className={styles.block}>
        <div>
          <h6>Анализ отзывов</h6>
          <small>Следите за отзывами не выходя с платформы</small>
        </div>
        <Coffee />
        <div className={styles.blobs}>
          <Blobs />
        </div>
      </div>

      <AdviceModal isOpen={isOpenAdvice} onClose={() => setIsOpenAdvice(false)} />
    </div>
  );
};

export default AdviceAnalysis;
