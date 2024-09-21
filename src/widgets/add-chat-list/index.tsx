import styles from './AddChatList.module.css';
import { useAssistantListQuery } from '@/app/api';
import AddChatCard from '@/features/add-chat-card';

const AddChatList = () => {
  const { data } = useAssistantListQuery();

  return <div className={styles.wrapper}>{data?.data.map((elem) => <AddChatCard key={elem.id} data={elem} />)}</div>;
};

export default AddChatList;
