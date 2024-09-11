import styles from './ProfileLayout.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
}
const ProfileLayout = ({ children, title }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <div className={styles.main}>{children}</div>
    </div>
  );
};
export default ProfileLayout;
