import styles from './CompanySearch.module.css';
import { useDebounce } from '@/shared/hooks/useDebounce.ts';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

const data = [
  {
    name: 'ООО Тмыв денег',
    inn: 9412789941,
    fio: 'Дубасов Кирилл Сергеевич',
  },
  {
    name: 'ООО Хомяки',
    inn: 7198247114,
    fio: 'Лохов Лох Ебланович',
  },
  {
    name: 'ООО Лутаем бабос',
    inn: 7645923052,
    fio: 'Иванов Иван Иванович',
  },
];

const CompanySearch = () => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 1000);

  return (
    <div className={styles.wrapper}>
      <Input
        placeholder="Название или ИНН"
        label={'Поиск организации'}
        type="search"
        tooltip={
          'Выберите свою компанию, введя её ИНН или название. Если компания не состоит на учете или ее нет в списке, пропустите этот блок'
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {debouncedValue && (
        <ul className={styles.dropdown}>
          {data.map(({ name, inn, fio }) => (
            <li key={name}>
              <div className={styles.orgItem}>
                <h6>{name}</h6>
                <div>
                  <span>ИНН {inn}</span>
                  <small>{fio}</small>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanySearch;
