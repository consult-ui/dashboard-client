import styles from './CompanyInitialForm.module.css';
import { useShowOrgModal } from './hooks/useShowOrgModal.ts';
import { useCreateOrganizationMutation, useMeQuery } from '@/app/api';
import { OrganizationItem } from '@/app/api/types/organizations.ts';
import { ELinks } from '@/app/router/types';
import { initialData } from '@/entities/company/company-initial-form/constants';
import { PayloadCreateCompany } from '@/entities/company/company-initial-form/types';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/shared/constants/toasts.ts';
import Button from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ModalGeneral } from '@/shared/ui/modal-general';
import CompanySearch from '@/widgets/company-search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyInitialForm = () => {
  const { refetch, isFetching } = useMeQuery();
  const { onClose, isShow, isEmptyOrg } = useShowOrgModal();
  const [data, setData] = useState<PayloadCreateCompany>(initialData);
  const [create, { isLoading }] = useCreateOrganizationMutation();
  const navigate = useNavigate();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    create(data)
      .unwrap()
      .then((res) => {
        if (res.success) {
          return refetch();
        } else {
          throw new Error(res?.msg);
        }
      })
      .then(() => {
        TOAST_SUCCESS('Информация о компании успешно сохранена!');
        navigate(ELinks.DASHBOARD + ELinks.COMPANY);
      })
      .catch((err) => TOAST_ERROR(err?.message || 'Ошибка сохранения, попробуйте еще раз'));
  };

  if (!isShow || !isEmptyOrg) return;

  return (
    <ModalGeneral zIndex={10} title={'Заполните информацию о компании'} onClose={onClose} open={true}>
      <header className={styles.header}>
        <p>
          Информация необходима, чтобы обеспечить более точные и персонализированные ответы на ваши запросы. Ваши данные{' '}
          <b>недоступны третьим лицам</b> и не используются в коммерческих целях. Пожалуйста, заполните их{' '}
          <b>максимально подробно и честно</b>, чтобы наши модели могли составить более <b>точный портрет</b> вашей
          организации.
        </p>
      </header>

      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        onSubmit={submitForm}
        className={styles.form}
      >
        <CompanySearch
          selected={data}
          setSelected={(value: OrganizationItem) => setData((prev) => ({ ...prev, ...value }))}
        />

        <div className={styles.rowWrapper}>
          <Input
            defaultValue={data.name}
            onBlur={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
            label={'*Наименование компании'}
            type="text"
            placeholder="ПАО Сбербанк"
          />
          <Input
            defaultValue={data.activity_type}
            onBlur={(e) => setData((prev) => ({ ...prev, activity_type: e.target.value }))}
            label={'*Деятельность'}
            type="text"
            placeholder="Денежное посредничество прочее"
          />
        </div>

        <div className={styles.rowWrapper}>
          <Input
            defaultValue={data.head_name || undefined}
            onBlur={(e) => setData((prev) => ({ ...prev, head_name: e.target.value }))}
            label={'*Руководитель'}
            type="text"
            placeholder="Греф Герман Оскарович"
          />
          <Input
            defaultValue={data.address}
            onBlur={(e) => setData((prev) => ({ ...prev, address: e.target.value }))}
            label={'*Юридический адрес'}
            type="text"
            placeholder="город Москва, ул. Вавилова, д.19"
          />
        </div>

        <div className={styles.rowWrapper}>
          <Input
            defaultValue={data.quarterly_income || ''}
            onBlur={(e) => setData((prev) => ({ ...prev, quarterly_income: +e.target.value }))}
            label={'Ежеквартальный доход (₽)'}
            type="number"
            placeholder="800000"
          />
          <Input
            defaultValue={data.quarterly_expenses || ''}
            onBlur={(e) => setData((prev) => ({ ...prev, quarterly_expenses: +e.target.value }))}
            label={'Ежеквартальные расходы (₽)'}
            type="number"
            placeholder="400000"
          />
        </div>

        <div className={styles.rowWrapper}>
          <Input
            defaultValue={data.average_receipt || ''}
            onBlur={(e) => setData((prev) => ({ ...prev, average_receipt: +e.target.value }))}
            label={'Средний чек (₽)'}
            type="number"
            placeholder="3000"
          />
          <Input
            defaultValue={data.number_employees || ''}
            onBlur={(e) => setData((prev) => ({ ...prev, number_employees: +e.target.value }))}
            label={'Количество сотрудников'}
            type="number"
            placeholder="25"
          />
        </div>

        <div className={styles.block}>
          <label>Описание (факты и интересная информация о вашей организации)</label>
          <textarea
            defaultValue={data.context}
            onBlur={(e) => setData((prev) => ({ ...prev, context: e.target.value }))}
            rows={5}
            placeholder="Компания является ведущим посредником денежных активов в России. Основная функция — предоставление кредитов и прием вкладов от клиентов. Большинство сотрудников работают удаленно. Есть проблемы с текучестью кадров и юридическими вопросами. Для сотрудников предусмотрены годовые премии и ДМС. Размещаем рекламу компании через Яндекс.Директ."
          />
        </div>

        <Button
          disabled={isLoading || isFetching}
          type="submit"
          style={{ padding: '.8em' }}
          isLoading={isLoading || isFetching}
        >
          Сохранить информацию
        </Button>
      </form>
    </ModalGeneral>
  );
};

export default CompanyInitialForm;
export { useShowOrgModal };
