import styles from './ChatUpdateDropdown.module.css';
import { useChatDeleteMutation, useChatListQuery } from '@/app/api';
import { ChatItem } from '@/app/api/types/chat.ts';
import UpdateChatModal from '@/features/update-chat-modal';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/shared/constants/toasts.ts';
import { useClickAway } from '@/shared/hooks/useClickAway.ts';
import ModalConfirm from '@/shared/ui/modal-confirm';
import Tooltip from '@/shared/ui/tooltip';
import { useRef, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  chat: ChatItem;
};

const ChatUpdateDropdown = ({ chat, onClose, isOpen }: Props) => {
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const ref = useRef<null | HTMLUListElement>(null);
  const { refetch } = useChatListQuery();
  const [remove, { isLoading }] = useChatDeleteMutation();

  const omRemove = () => {
    remove({ chat_id: chat.id })
      .unwrap()
      .then((res) => {
        if (res.success) {
          TOAST_SUCCESS(`Чат "${chat.name}" успешно удален!`);
          return refetch();
        } else {
          throw new Error(res?.msg);
        }
      })
      .catch((err) => TOAST_ERROR(err?.message || 'Ошибка удаления чата, обратитесь в поддержку'));
  };

  useClickAway(ref, isOpen, onClose);

  // TODO: add icons to list items

  return (
    <>
      {isOpen && (
        <ul ref={ref} className={styles.wrapper}>
          <li>
            <Tooltip content={chat.desc}>
              <span>Подобнее</span>
            </Tooltip>
          </li>
          <li onClick={() => setIsShowUpdate(true)}>Персонализация</li>
          <li onClick={() => setIsShowDelete(true)}>Удалить</li>
        </ul>
      )}

      <ModalConfirm
        title={`Вы хотите удалить чат "${chat.name}"?`}
        onConfirm={omRemove}
        onClose={() => setIsShowDelete(false)}
        open={isShowDelete}
        isLoading={isLoading}
      />

      <UpdateChatModal chat={chat} isOpen={isShowUpdate} onClose={() => setIsShowUpdate(false)} />
    </>
  );
};

export default ChatUpdateDropdown;
