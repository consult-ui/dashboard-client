import styles from './PopularQuestions.module.css';
import Button from '@/shared/ui/button';

const data = [
  'Есть ли смысл в продажах?',
  'Как провести опрос?',
  'Как рассчитать маржу?',
  'Сколько сейчас времени?',
  'Сколько у нас сотрудников?',
  'Как поднять выручку?',
  'Нужен список поставщиков',
];

const PopularQuestions = () => {
  return (
    <nav className={styles.wrapper}>
      {data.map((elem) => (
        <Button color="dark" key={elem} style={{ whiteSpace: 'nowrap', color: 'var(--primary)' }}>
          {elem}
        </Button>
      ))}
    </nav>
  );
};

export default PopularQuestions;
