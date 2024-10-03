import styles from './AddChatCard.module.css';
import { useChatCreateMutation, useChatListQuery } from '@/app/api';
import { AssistantItem } from '@/app/api/types/chat.ts';
import Add from '@/shared/assets/icons/add.svg?react';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/shared/constants/toasts.ts';
import Button from '@/shared/ui/button';

type Props = {
  data: AssistantItem;
  onSuccessHandler?: () => void;
};

const AddChatCard = ({ data, onSuccessHandler }: Props) => {
  const { name, desc, id } = data;
  const [create, { isLoading }] = useChatCreateMutation();
  const { refetch } = useChatListQuery();

  const onCreate = () => {
    create({ assistant_id: id })
      .unwrap()
      .then((res) => {
        if (res.success) {
          TOAST_SUCCESS(`Чат "${name}" успешно добавлен!`);
          if (onSuccessHandler) {
            onSuccessHandler();
          }
          return refetch();
        } else {
          throw new Error(res.msg);
        }
      })
      .catch((err) => TOAST_ERROR(err?.data?.msg || 'Ошибка добавления чата, обратитесь в поддержку!'));
  };

  return (
    <div className={styles.card}>
      <header>
        <div>
          <small>Робот</small>
          <h6>{name}</h6>
        </div>
        <Button size="sm" onClick={onCreate} isLoading={isLoading}>
          <Add />
          Добавить
        </Button>
      </header>
      <p>{desc}</p>
    </div>
  );
};

export default AddChatCard;
