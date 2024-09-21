import styles from './ChatsList.module.css';
import { useChatListQuery } from '@/app/api';
import ChatButton from '@/features/chat-button';

const ChatsList = () => {
  const { data } = useChatListQuery();

  return <nav className={styles.wrapper}>{data?.data?.map((chat) => <ChatButton key={chat.id} chat={chat} />)}</nav>;
};

export default ChatsList;
