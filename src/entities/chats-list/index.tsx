import styles from './ChatsList.module.css';
import { useChatListQuery } from '@/app/api';
import ChatButton from '@/features/chat-button';
import ErrorAlert from '@/shared/ui/error-alert';

const ChatsList = () => {
  const { data, error } = useChatListQuery();

  if (error && !data) return <ErrorAlert text={'Ошибка загрузки помощников.'} hideReload />;

  return <nav className={styles.wrapper}>{data?.data?.map((chat) => <ChatButton key={chat.id} chat={chat} />)}</nav>;
};

export default ChatsList;
