import styles from './Card.module.css';

export const Card = () => {
  return (
    <div className={styles.card}>
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
    </div>
  );
};
