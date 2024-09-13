import styles from './CompanyInitialForm.module.css';
import { EFormFields, IFormData } from './types';
import Button from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ModalGeneral } from '@/shared/ui/modal-general';
import { useEffect, useState } from 'react';

const initialData: IFormData = {
  [EFormFields.INN]: '',
  [EFormFields.COMPANY_NAME]: '',
  [EFormFields.DESCRIPTION]: '',
  [EFormFields.INDUSTRY]: '',
};

export const CompanyInitialForm = () => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [data, setData] = useState<IFormData>(initialData);
  const [researchInn, setResearchInn] = useState<boolean>(false);

  useEffect(() => {
    const userData = false;
    if (!userData) {
      setVisibleModal(true);
    }
  }, []);

  const toggleResearch = () => setResearchInn(!researchInn);
  // const toggleModal = () => setVisibleModal(!visibleModal);

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  const onGetInfoInn = async () => {
    toggleResearch();
  };

  return (
    <ModalGeneral
      visibleCloseButton={false}
      zIndex={10}
      styles={{ width: '764px' }}
      title={'Заполните информацию о компании'}
      onClose={() => {}}
      open={visibleModal}
    >
      <form onSubmit={submitForm} className={styles.form}>
        <div className={styles.block}>
          <Input
            label={'ИНН'}
            disabled={researchInn}
            type="text"
            id={EFormFields.INN}
            name={EFormFields.INN}
            value={data[EFormFields.INN]}
            onChange={handleChangeData}
          />
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
            <Input
              label={'Наименование компании'}
              type="text"
              id={EFormFields.COMPANY_NAME}
              name={EFormFields.COMPANY_NAME}
              value={data[EFormFields.COMPANY_NAME]}
              onChange={handleChangeData}
            />
            <div className={styles.block}>
              <label htmlFor={EFormFields.DESCRIPTION}>Описание</label>
              <textarea
                rows={5}
                id={EFormFields.DESCRIPTION}
                name={EFormFields.DESCRIPTION}
                value={data[EFormFields.DESCRIPTION]}
                onChange={handleChangeData as () => void}
              />
            </div>
            <Input
              label={'Описание'}
              type="text"
              id={EFormFields.DESCRIPTION}
              name={EFormFields.DESCRIPTION}
              value={data[EFormFields.DESCRIPTION]}
              onChange={handleChangeData}
            />
            <Input
              label={'Деятельность'}
              type="text"
              id={EFormFields.INDUSTRY}
              name={EFormFields.INDUSTRY}
              value={data[EFormFields.INDUSTRY]}
              onChange={handleChangeData}
            />
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
