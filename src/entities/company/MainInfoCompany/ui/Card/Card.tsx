import styles from './Card.module.css';

export const Card = () => {
  return (
    <div className={styles.Card}>
      <div className={styles.item}>
        <span className={styles.title}>Наименование</span>
        <h2 className={styles.content}>FIT SERVICE (7716791437)</h2>
      </div>
      <div className={styles.item}>
        <span className={styles.title}>Ключевые слова</span>
        <p className={styles.content}>serivce, fit-service, fit, car, auto</p>
      </div>
      <div className={styles.item}>
        <span className={styles.title}>Описание</span>
        <p className={styles.content}>
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
