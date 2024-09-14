import styles from './ChatsList.module.css';
import Chat from '@/shared/assets/icons/message.svg?react';
import Question from '@/shared/assets/icons/question.svg?react';
import Button from '@/shared/ui/button';
import Tooltip from '@/shared/ui/tooltip';
import { useState } from 'react';

const data = ['Маркетолог', 'Юрист', 'Рерайтер', 'Копирайтер'];

const ChatsList = () => {
  const [active, setActive] = useState<string>(data[0]);

  return (
    <nav className={styles.wrapper}>
      {data.map((elem) => (
        <Button
          color={'primary'}
          variant={'outlined'}
          size={'md'}
          key={elem}
          disabled={active === elem}
          onClick={() => setActive(elem)}
        >
          <div>
            <Chat />
            {elem}
          </div>
          <Tooltip content="Описание искусственные помощники очень помогут в достижении ваших целей, это точно даст успех вашей компании!">
            <div className={styles.quest}>
              <Question />
            </div>
          </Tooltip>
        </Button>
      ))}
    </nav>
  );
};

export default ChatsList;
