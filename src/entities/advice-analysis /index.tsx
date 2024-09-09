import styles from './AdviceAnalysis.module.css';
import Robot2 from '@/shared/assets/images/robot2.png';
import Robot1 from '@/shared/assets/images/robot.png';

const AdviceAnalysis = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div>
          <h6>Совет дня</h6>
          <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
        </div>
        <img src={Robot1} alt="Совет дня" />
      </div>

      <div className={styles.block}>
        <div>
          <h6>Анализ отзывов</h6>
          <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
        </div>
        <img src={Robot2} alt="Анализ отзывов" />
      </div>
    </div>
  );
};

export default AdviceAnalysis;
