import styles from './CompanyInitialForm.module.css';
import Button from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ModalGeneral } from '@/shared/ui/modal-general';
import CompanySearch from '@/widgets/company-search';
import { useEffect, useState } from 'react';

export const CompanyInitialForm = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  useEffect(() => {
    setVisibleModal(true);
  }, []);

  return (
    <ModalGeneral
      // TODO: set to false in future
      visibleCloseButton={true}
      zIndex={10}
      title={'Заполните информацию о компании'}
      onClose={() => setVisibleModal(false)}
      open={visibleModal}
    >
      <header className={styles.header}>
        <p>
          Информация необходима, чтобы обеспечить более точные и персонализированные ответы на ваши запросы. Ваши данные{' '}
          <b>недоступны третьим лицам</b> и не используются в коммерческих целях. Пожалуйста, заполните их{' '}
          <b>максимально подробно и честно</b>, чтобы наши модели могли составить более <b>точный портрет</b> вашей
          организации.
        </p>
      </header>

      <form onSubmit={submitForm} className={styles.form}>
        <CompanySearch />

        <div className={styles.rowWrapper}>
          <Input label={'*Наименование компании'} type="text" placeholder="ПАО Сбербанк" />
          <Input label={'*Деятельность'} type="text" placeholder="Денежное посредничество прочее" />
        </div>

        <div className={styles.rowWrapper}>
          <Input label={'*Руководитель'} type="text" placeholder="Греф Герман Оскарович" />
          <Input label={'*Юридический адрес'} type="text" placeholder="город Москва, ул. Вавилова, д.19" />
        </div>

        <div className={styles.rowWrapper}>
          <Input label={'Ежеквартальный доход (₽)'} type="number" placeholder="800000" />
          <Input label={'Ежеквартальные расходы (₽)'} type="number" placeholder="400000" />
        </div>

        <div className={styles.rowWrapper}>
          <Input label={'Средний чек (₽)'} type="number" placeholder="3000" />
          <Input label={'Количество сотрудников'} type="number" placeholder="25" />
        </div>

        <div className={styles.block}>
          <label>Описание (факты и интересная информация о вашей организации)</label>
          <textarea
            rows={5}
            placeholder="Компания является ведущим посредником денежных активов в России. Основная функция — предоставление кредитов и прием вкладов от клиентов. Большинство сотрудников работают удаленно. Есть проблемы с текучестью кадров и юридическими вопросами. Для сотрудников предусмотрены годовые премии и ДМС. Размещаем рекламу компании через Яндекс.Директ."
          />
        </div>

        <Button>Сохранить информацию</Button>
      </form>
    </ModalGeneral>
  );
};
