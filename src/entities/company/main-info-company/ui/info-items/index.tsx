import styles from './InfoItems.module.css';
import { Card } from '@/shared/ui/card';

export const InfoItems = () => {
  return (
    <Card>
      <div className={styles.item}>
        <span>Наименование</span>
        <h2>
          FIT SERVICE <span>(7716791437)</span>
        </h2>
      </div>
      <div className={styles.item}>
        <span>Ключевые слова</span>
        <p>serivce, fit-service, fit, car, auto</p>
      </div>
      <div className={styles.item}>
        <span>Описание</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet nisi purus, eu pulvinar sapien porta
          ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet nisi purus, eu pulvinar sapien
          porta ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet nisi purus, eu pulvinar
          sapien porta ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet nisi purus, eu
          pulvinar sapien porta ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet nisi purus,
          eu pulvinar sapien porta ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet nisi
          purus, eu pulvinar sapien porta ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet
          nisi purus, eu pulvinar sapien porta ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          aliquet nisi purus, eu pulvinar sapien porta ut.
        </p>
      </div>
    </Card>
  );
};
