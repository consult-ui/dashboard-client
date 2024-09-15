import styles from './CompanySearch.module.css';
import { useOrganizationsQuery } from '@/app/api';
import { OrganizationItem } from '@/app/api/types/organizations.ts';
import CompanySearchItem from '@/features/company-search-item';
import Arrow from '@/shared/assets/icons/arrow.svg?react';
import { useDebounce } from '@/shared/hooks/useDebounce.ts';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

type Props = {
  selected: OrganizationItem | null;
  setSelected: (value: OrganizationItem) => void;
};

const CompanySearch = ({ selected, setSelected }: Props) => {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 1000);
  const { data, isFetching, isError } = useOrganizationsQuery({ query: debouncedValue }, { skip: !debouncedValue });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
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
        <Arrow className={styles.arrow} />
      </div>

      {debouncedValue && (
        <div className={styles.dropdown}>
          {isFetching && !data?.data?.length && <p>Загрузка...</p>}
          {isError && !data?.data?.length && <p>Ошибка загрузки! Попробуйте другой запрос</p>}
          {!isError && !isFetching && !data?.data?.length && <p>Организации по вашему запросу не найдены!</p>}

          {!!data?.data?.length && (
            <ul>
              {data.data.map((elem) => (
                <CompanySearchItem
                  setValue={setValue}
                  key={elem.tax_number}
                  data={elem}
                  isActive={elem.tax_number === selected?.tax_number}
                  setSelected={setSelected}
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
