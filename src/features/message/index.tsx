import styles from './Message.module.css';
import RobotIcon from '@/shared/assets/icons/logo-msg.svg?react';
import UserIcon from '@/shared/assets/icons/user-msg.svg?react';

type Props = {
  data: {
    id: number;
    isUser: boolean;
    text: string;
    date: string;
    time: string;
  };
};

const Message = ({ data }: Props) => {
  const { text, isUser, time } = data;
  return (
    <div className={`${styles.wrapper} ${styles[isUser ? 'user' : 'robot']}`}>
      {isUser && <span className={styles.time}>{time}</span>}
      <div className={styles.message}>
        {isUser ? <UserIcon /> : <RobotIcon />}
        <p>{text}</p>
      </div>
      {!isUser && <span className={styles.time}>{time}</span>}
    </div>
  );
};

export default Message;
