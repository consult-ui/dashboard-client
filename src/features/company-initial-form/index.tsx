import styles from './CompanyInitialForm.module.css';
import Button from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ModalGeneral } from '@/shared/ui/modal-general';
import { useEffect, useState } from 'react';

export const CompanyInitialForm = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [researchInn, setResearchInn] = useState<boolean>(false);

  const toggleResearch = () => setResearchInn(!researchInn);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  const onGetInfoInn = async () => {
    toggleResearch();
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
      <form onSubmit={submitForm} className={styles.form}>
        <div className={styles.block}>
          <Input label={'ИНН'} disabled={researchInn} type="text" />
          <div className={styles.actions}>
            <Button onClick={onGetInfoInn} size={'md'} disabled={researchInn} variant={'contained'} color={'primary'}>
              Проверить ИНН
            </Button>
            <Button onClick={toggleResearch} size={'md'} variant={'text'} color={'dark'}>
              {researchInn && 'Компания стоит не учёте'}
              {!researchInn && 'Компания не стоит не учёте'}
            </Button>
          </div>
        </div>
        {researchInn && (
          <>
            <Input label={'Наименование компании'} type="text" />
            <div className={styles.block}>
              <label>Описание</label>
              <textarea rows={5} />
            </div>
            <Input label={'Описание'} type="text" />
            <Input label={'Деятельность'} type="text" />
            <div className={styles.actions}>
              <Button size={'md'} variant={'contained'}>
                Сохранить информацию
              </Button>
              <Button variant={'text'}>Что необходимо знать?</Button>
            </div>
          </>
        )}
      </form>
    </ModalGeneral>
  );
};
