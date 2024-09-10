import styles from './Item.module.css';

export const Item = ({ title, content }: { title: string; content: string | number }) => {
  return (
    <div className={styles.item}>
      <span>{title}</span>
      <h2>{content}</h2>
    </div>
  );
};
