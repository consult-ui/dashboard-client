import styles from './HomePage.module.css';
import Sidebar from '@/widgets/sidebar';

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main}></main>
    </div>
  );
};

export default HomePage;
