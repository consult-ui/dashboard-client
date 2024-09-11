import styles from './ChatInput.module.css';
import Arrow from '@/shared/assets/icons/arrow-top.svg?react';
import Clip from '@/shared/assets/icons/clip.svg?react';
import { FormEvent } from 'react';

const ChatInput = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <button className={styles.button} type="button">
        <Clip />
      </button>
      <input required placeholder="Введите сообщение для помощника" />
      <button className={styles.button} type="submit">
        <Arrow />
      </button>
    </form>
  );
};

export default ChatInput;
