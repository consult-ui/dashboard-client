import styles from './AddChatList.module.css';
import { useAssistantListQuery } from '@/app/api';
import AddChatCard from '@/features/add-chat-card';
import ErrorAlert from '@/shared/ui/error-alert';

const AddChatList = () => {
  const { data, error } = useAssistantListQuery();

  if (error && !data) return <ErrorAlert />;

  return <div className={styles.wrapper}>{data?.data.map((elem) => <AddChatCard key={elem.id} data={elem} />)}</div>;
};

export default AddChatList;
