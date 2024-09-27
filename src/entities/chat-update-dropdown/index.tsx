import styles from './ChatUpdateDropdown.module.css';
import { useChatDeleteMutation, useChatListQuery } from '@/app/api';
import { ChatItem } from '@/app/api/types/chat.ts';
import UpdateChatModal from '@/features/update-chat-modal';
import Delete from '@/shared/assets/icons/delete.svg?react';
import Quest from '@/shared/assets/icons/question.svg?react';
import Settings from '@/shared/assets/icons/settings.svg?react';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/shared/constants/toasts.ts';
import { useClickAway } from '@/shared/hooks/useClickAway.ts';
import ModalConfirm from '@/shared/ui/modal-confirm';
import { useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';

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

  return (
    <>
      {isOpen && (
        <ul ref={ref} className={styles.wrapper}>
          <li>
            <Tooltip id="chat-desc-tip" />
            <button title={chat.desc} data-tooltip-id="chat-desc-tip" data-tooltip-content={chat.desc}>
              <Quest />
              <span>Подобнее</span>
            </button>
          </li>
          <li>
            <button onClick={() => setIsShowUpdate(true)}>
              <Settings />
              Персонализация
            </button>
          </li>
          <li>
            <button onClick={() => setIsShowDelete(true)}>
              <Delete />
              Удалить
            </button>
          </li>
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
