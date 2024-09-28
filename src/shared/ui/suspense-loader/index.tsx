import styles from './SuspenseLoader.module.css';

type Props = {
  text?: string;
};

const SuspenseLoader = ({ text }: Props) => {
  return (
    <div className={styles.wrapper}>
      <p>
        {text || 'Загрузка'}
        <span className={styles.dots} />
      </p>
    </div>
  );
};

export default SuspenseLoader;
