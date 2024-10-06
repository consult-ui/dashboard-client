import styles from './ProfileDropdown.module.css';
import { ELinks } from '@/app/router/types';
import LogoutButton from '@/features/logout-button';
import ThemeSwitcher from '@/features/theme-switcher';
import Arrow from '@/shared/assets/icons/arrow.svg?react';
import Icon from '@/shared/assets/icons/lk-icon.svg?react';
import User from '@/shared/assets/icons/user.svg?react';
import Users from '@/shared/assets/icons/users.svg?react';
import { useClickAway } from '@/shared/hooks/useClickAway.ts';
import Button from '@/shared/ui/button';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const onClose = () => setIsOpen(false);

  useClickAway(ref, isOpen, setIsOpen);

  return (
    <div className={styles.wrapper} ref={ref}>
      <Button
        variant="outlined"
        color="dark"
        onClick={() => setIsOpen((prev) => !prev)}
        data-testid="profile-dropdown-btn-desktop"
        className={styles.fullDropdown}
      >
        <div>
          <Icon />
          Личный кабинет
        </div>
        <Arrow />
      </Button>

      <Button
        data-testid="profile-dropdown-btn-mobile"
        onClick={() => setIsOpen((prev) => !prev)}
        color="dark"
        className={styles.mobDropdown}
      >
        <User />
      </Button>

      <ul className={styles.dropdown} hidden={!isOpen}>
        <li>
          <Link to={ELinks.DASHBOARD + ELinks.COMPANY} onClick={onClose}>
            <Users />
            Компания
          </Link>
        </li>
        <li>
          <Link to={ELinks.DASHBOARD + ELinks.USER} onClick={onClose}>
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
