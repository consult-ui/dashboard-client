import styles from './HomePage.module.css';
import { Button, EButtonSize, EButtonType } from '@/shared/ui/Button';
import Sidebar from '@/widgets/sidebar';

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main} style={{ marginTop: '2rem' }}>
        <Button size={EButtonSize.SMALL} variant={EButtonType.CONTAINED}>
          Бутылка когора
        </Button>
      </main>
    </div>
  );
};

export default HomePage;
