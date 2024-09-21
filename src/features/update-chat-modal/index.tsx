import styles from './UpdateChatModal.module.css';
import { useChatListQuery, useChatUpdateMutation } from '@/app/api';
import { ChatItem } from '@/app/api/types/chat.ts';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import Button from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ModalGeneral } from '@/shared/ui/modal-general';
import { FormEvent, useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  chat: ChatItem;
};

const UpdateChatModal = ({ isOpen, onClose, chat }: Props) => {
  const [update, { isLoading }] = useChatUpdateMutation();
  const [name, setName] = useState(chat.name);
  const [color, setColor] = useState<null | string>(chat.color);
  const { refetch } = useChatListQuery();

  const onUpdate = (e: FormEvent) => {
    e.preventDefault();
    update({ color, name, chat_id: chat.id })
      .unwrap()
      .then((res) => {
        if (res.success) {
          return refetch();
        } else {
          throw new Error(res?.msg);
        }
      })
      .then(onClose)
      .catch((err) => TOAST_ERROR(err?.message || 'Ошибка редактирования чата, обратитесь в поддержку'));
  };

  useEffect(() => {
    setName(chat.name);
    setColor(chat.color);
  }, [chat]);

  return (
    <ModalGeneral open={isOpen} onClose={onClose} title="Редактирование чата">
      <form className={styles.form} onSubmit={onUpdate}>
        <Input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Название чата"
          placeholder="Название чата"
        />

        <Input
          style={{ height: 50, maxHeight: 50, padding: '5px 1.5em' }}
          type="color"
          value={color || undefined}
          onChange={(e) => setColor(e.target.value)}
          label="Цвет чата"
        />

        <Button type="submit" isLoading={isLoading}>
          Сохранить
        </Button>
      </form>
    </ModalGeneral>
  );
};

export default UpdateChatModal;
