import styles from './CompanySearch.module.css';
import { useOrganizationsQuery } from '@/app/api';
import { OrganizationItem } from '@/app/api/types/organizations.ts';
import CompanySearchItem from '@/features/company-search-item';
import Arrow from '@/shared/assets/icons/arrow.svg?react';
import { useClickAway } from '@/shared/hooks/useClickAway.ts';
import { useDebounce } from '@/shared/hooks/useDebounce.ts';
import { Input } from '@/shared/ui/input';
import { useRef, useState } from 'react';

type Props = {
  selected: OrganizationItem | null;
  setSelected: (value: OrganizationItem) => void;
};

const CompanySearch = ({ selected, setSelected }: Props) => {
  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedValue = useDebounce<string>(value, 1000);
  const { data, isFetching, isError } = useOrganizationsQuery({ query: debouncedValue }, { skip: !debouncedValue });
  const ref = useRef<HTMLDivElement | null>(null);

  useClickAway(ref, isOpen, setIsOpen);

  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles.inputWrapper}>
        <Input
          onFocus={() => setIsOpen(true)}
          placeholder="Название или ИНН"
          label="Поиск организации"
          type="search"
          tooltip={
            'Выберите свою компанию, введя её ИНН или название. Если компания не состоит на учете или ее нет в списке, пропустите этот блок'
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Arrow className={styles.arrow} />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {isFetching && !data?.data?.length && <p>Загрузка...</p>}
          {isError && !data?.data?.length && <p>Ошибка загрузки! Попробуйте другой запрос</p>}
          {!isError && !isFetching && !data?.data?.length && (
            <p>
              {debouncedValue
                ? 'Организации по вашему запросу не найдены!'
                : 'Введите запрос, список компаний покажется здесь'}
            </p>
          )}

          {!!data?.data?.length && (
            <ul>
              {data.data.map((elem) => (
                <CompanySearchItem
                  setValue={setValue}
                  key={elem.tax_number}
                  data={elem}
                  isActive={elem.tax_number === selected?.tax_number}
                  setSelected={setSelected}
                  setIsOpen={setIsOpen}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanySearch;
