import styles from './CompanySearchItem.module.css';
import { useLazyOneOrganizationQuery } from '@/app/api';
import { OrganizationItem, OrganizationSuggestItem } from '@/app/api/types/organizations.ts';
import Added from '@/shared/assets/icons/added.svg?react';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import Button from '@/shared/ui/button';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setValue: Dispatch<SetStateAction<string>>;
  data: OrganizationSuggestItem;
  isActive: boolean;
  setSelected: (value: OrganizationItem) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CompanySearchItem = ({ data, isActive, setSelected, setValue, setIsOpen }: Props) => {
  const { tax_number, name, head_name } = data;

  const [select, { isLoading }] = useLazyOneOrganizationQuery();

  const onSelect = () => {
    select({ tax_number })
      .unwrap()
      .then((res) => {
        if (res.success) {
          setSelected(res.data);
          setValue('');
          setIsOpen(false);
        } else {
          throw new Error(res?.msg);
        }
      })
      .catch((err) => TOAST_ERROR(err?.message || 'Ошибка выбора компании! Попробуйте еще раз'));
  };

  return (
    <li key={tax_number} className={styles.wrapper}>
      <div>
        <h6>
          {name}
          <span>(ИНН {tax_number})</span>
        </h6>
        <small>{head_name || 'ФИО руководителя не найдены'}</small>
      </div>

      <Button
        className={styles.button}
        size="sm"
        variant={isActive ? 'text' : 'outlined'}
        style={{
          padding: '.5em 1.25em',
          color: isActive ? 'var(--primary)' : 'var(--white)',
          borderColor: isActive ? undefined : 'var(--primary)',
        }}
        disabled={isActive || isLoading}
        onClick={onSelect}
        isLoading={isLoading}
      >
        {isActive && <Added />}
        {isActive ? 'Выбрано' : 'Выбрать компанию'}
      </Button>
    </li>
  );
};

export default CompanySearchItem;
