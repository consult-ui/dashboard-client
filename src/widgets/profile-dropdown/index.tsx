import styles from './ProfileDropdown.module.css';
import { ELinks } from '@/app/router/types';
import LogoutButton from '@/features/logout-button';
import ThemeSwitcher from '@/features/theme-switcher';
import Arrow from '@/shared/assets/icons/arrow.svg?react';
import Icon from '@/shared/assets/icons/lk-icon.svg?react';
import Users from '@/shared/assets/icons/users.svg?react';
import { useClickAway } from '@/shared/hooks/useClickAway.ts';
import Button from '@/shared/ui/button';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickAway(ref, isOpen, setIsOpen);

  return (
    <div className={styles.wrapper} ref={ref}>
      <Button
        variant="outlined"
        color="dark"
        onClick={() => setIsOpen((prev) => !prev)}
        data-testid="profile-dropdown-btn"
      >
        <div>
          <Icon />
          Личный кабинет
        </div>
        <Arrow />
      </Button>

      <ul className={styles.dropdown} hidden={!isOpen}>
        <li>
          <Link to={ELinks.DASHBOARD + ELinks.COMPANY}>
            <Users />
            Компания
          </Link>
        </li>
        <li>
          <Link to={ELinks.DASHBOARD + ELinks.USER}>
            <Users />
            Личная информация
          </Link>
        </li>
        <li>
          <ThemeSwitcher />
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
