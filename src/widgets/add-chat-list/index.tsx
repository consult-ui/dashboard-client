import styles from './AddChatList.module.css';
import { LIST_CHATS } from '@/entities/add-chat/data';
import AddChatCard from '@/features/add-chat-card';

const AddChatList = () => {
  return (
    <div className={styles.wrapper}>
      {LIST_CHATS.map((elem) => (
        <AddChatCard key={elem.id} data={elem} />
      ))}
    </div>
  );
};

export default AddChatList;
