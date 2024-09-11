import styles from './AdviceAnalysis.module.css';
import { useAppSelector } from '@/app/store/store.ts';
import RobotDark1 from '@/shared/assets/images/robot1-dark.png';
import Robot1 from '@/shared/assets/images/robot1-light.png';
import RobotDark2 from '@/shared/assets/images/robot2-dark.png';
import Robot2 from '@/shared/assets/images/robot2-light.png';

const AdviceAnalysis = () => {
  const theme = useAppSelector((state) => state.layout.theme);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div>
          <h6>Совет дня</h6>
          <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
        </div>
        <img src={theme === 'light' ? RobotDark2 : Robot1} alt="Совет дня" />
      </div>

      <div className={styles.block}>
        <div>
          <h6>Анализ отзывов</h6>
          <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
        </div>
        <img src={theme === 'light' ? RobotDark1 : Robot2} alt="Анализ отзывов" />
      </div>
    </div>
  );
};

export default AdviceAnalysis;
