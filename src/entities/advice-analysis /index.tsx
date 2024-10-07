import styles from './AdviceAnalysis.module.css';
import { useAdviceQuery } from '@/app/api';
import AdviceModal from '@/entities/advice-analysis /modals/AdviceModal.tsx';
import IdeasIcon from '@/shared/assets/icons/idea.svg?react';
import Blobs from '@/shared/assets/images/blobs.svg?react';
import Stats from '@/shared/assets/images/coffe.svg?react';
import { useState } from 'react';

const AdviceAnalysis = () => {
  const [isOpenAdvice, setIsOpenAdvice] = useState(false);
  const {
    data: advice,
    isLoading: loadEdvice,
    isError: errAdvice,
  } = useAdviceQuery(undefined, { skip: !isOpenAdvice });

  return (
    <div className={styles.wrapper}>
      <button className={styles.block} onClick={() => setIsOpenAdvice(true)}>
        <div>
          <h6>
            Совет дня
            <IdeasIcon />
          </h6>
          <small>Обновляем каждые 24 часа, будет полезен вашему бизнесу</small>
        </div>
        <Stats />
        <div className={styles.blobs}>
          <Blobs />
        </div>
      </button>

      <AdviceModal
        isOpen={isOpenAdvice}
        onClose={() => setIsOpenAdvice(false)}
        data={{ data: advice?.data, isError: errAdvice, isLoading: loadEdvice }}
      />
    </div>
  );
};

export default AdviceAnalysis;
