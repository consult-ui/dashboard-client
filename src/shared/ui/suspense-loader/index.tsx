import styles from './SuspenseLoader.module.css';

const SuspenseLoader = () => {
  return (
    <div className={styles.wrapper}>
      <p>
        Загрузка
        <span className={styles.dots} />
      </p>
    </div>
  );
};

export default SuspenseLoader;
