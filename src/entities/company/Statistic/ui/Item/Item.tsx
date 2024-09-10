import styles from './Item.module.css';

export const Item = ({ title, content }: { title: string; content: string | number }) => {
  return (
    <div className={styles.Item}>
      <span className={styles.title}>{title}</span>
      <h2 className={styles.content}>{content}</h2>
    </div>
  );
};
