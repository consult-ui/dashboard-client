import styles from './ProfileCompany.module.css';
import MainInfoCompany from '@/entities/company/MainInfoCompany';
import Statistic from '@/entities/company/statistic';

const ProfileCompany = () => {
  return (
    <div className={styles.ProfileCompany}>
      <h1>Моя компания</h1>
      <div className={styles.main}>
        <MainInfoCompany />
        <Statistic />
      </div>
    </div>
  );
};

export default ProfileCompany;
