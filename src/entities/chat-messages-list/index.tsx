import styles from './ChatMessagesList.module.css';
import { ActiveMessage, MessageListItem } from '@/app/api/types/chat.ts';
import Message from '@/features/message';

type Props = {
  messages: MessageListItem[];
  activeMessage: ActiveMessage;
};

const ChatMessagesList = ({ messages, activeMessage }: Props) => {
  return (
    <div className={styles.wrapper}>
      {messages.map((elem) => (
        <Message key={elem.id} data={elem} />
      ))}
      {(activeMessage.text || activeMessage.is_request_load) && <Message data={activeMessage} />}
    </div>
  );
};

export default ChatMessagesList;
