import styles from './AddChat.module.css';
import { LIST_CHATS } from '@/entities/add-chat/data';
import AddChatCard from '@/features/add-chat-card';
import Add from '@/shared/assets/icons/add.svg?react';
import Button from '@/shared/ui/button';
import { ModalGeneral } from '@/shared/ui/modal-general';
import { useState } from 'react';

const AddChat = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Button variant="text" className={styles.button} onClick={() => setIsShow(true)}>
        Добавить помощника
        <Add />
      </Button>

      <ModalGeneral onClose={() => setIsShow(false)} open={isShow} title="Добавьте новых помощников">
        <div className={styles.modalBody}>
          {LIST_CHATS.map((elem) => (
            <AddChatCard key={elem.id} data={elem} />
          ))}
        </div>
      </ModalGeneral>
    </>
  );
};

export default AddChat;
