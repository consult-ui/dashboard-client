import styles from './PopularQuestions.module.css';
import { useQuestionsListQuery } from '@/app/api';
import Button from '@/shared/ui/button';

type Props = {
  chatId: string;
  onClick: (value: string) => void;
};

const PopularQuestions = ({ chatId, onClick }: Props) => {
  const { data } = useQuestionsListQuery({ chat_id: Number(chatId) });

  if (!data?.data?.length) return <div />;

  return (
    <nav className={styles.wrapper}>
      {data?.data?.map((quest) => (
        <Button
          onClick={() => onClick(quest)}
          color="dark"
          key={quest}
          style={{ whiteSpace: 'nowrap', color: 'var(--primary)' }}
        >
          {quest}
        </Button>
      ))}
    </nav>
  );
};

export default PopularQuestions;
