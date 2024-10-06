import styles from './ChatsList.module.css';
import { useChatListQuery } from '@/app/api';
import ChatButton from '@/features/chat-button';
import ErrorAlert from '@/shared/ui/error-alert';
import { useParams } from 'react-router-dom';

type Props = {
  isActiveChatOnly?: boolean;
};

const ChatsList = ({ isActiveChatOnly }: Props) => {
  const { data, error } = useChatListQuery();
  const { chatId } = useParams();

  if (isActiveChatOnly && data) {
    const activeId = chatId ? +chatId : null;
    const activeChat = data?.data?.find((elem) => elem.id === activeId);
    return activeChat ? <ChatButton chat={activeChat} isMobStyles /> : null;
  }

  if (error && !data) return <ErrorAlert text={'Ошибка загрузки помощников.'} hideReload />;

  return <nav className={styles.wrapper}>{data?.data?.map((chat) => <ChatButton key={chat.id} chat={chat} />)}</nav>;
};

export default ChatsList;
