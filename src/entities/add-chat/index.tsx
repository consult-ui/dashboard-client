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
            Если вам недостаточно изначально добавленных чатов, вы можете добавить их, выбрав нужный шаблон чата из
            списка ниже. Если вы <b>не нашли подходящий чат</b> в этом списке, обратитесь в поддержку, и{' '}
            <b>модераторы добавят</b> его.
          </p>
          <AddChatList />
        </div>
      </ModalGeneral>
    </>
  );
};

export default AddChat;
