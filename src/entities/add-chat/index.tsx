import styles from './AddChat.module.css';
import Add from '@/shared/assets/icons/add.svg?react';
import Button from '@/shared/ui/button';
import { ModalGeneral } from '@/shared/ui/modal-general';
import AddChatList from '@/widgets/add-chat-list';
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
          <p>
            Если вам недостаточно чатов, вы можете добавить их, выбрав нужный шаблон из списка. Если вы <b>не нашли</b>{' '}
            нужный шаблон, обратитесь <b>в поддержку для его добавления</b>.
          </p>
          <AddChatList onAddedHandler={() => setIsShow(false)} />
        </div>
      </ModalGeneral>
    </>
  );
};

export default AddChat;
