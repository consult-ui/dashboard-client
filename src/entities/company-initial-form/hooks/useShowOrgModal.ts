import { useMeQuery } from '@/app/api';
import { setShowOrgModal } from '@/app/store/slices/layoutSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/store/store.ts';
import { useEffect } from 'react';

const ssKey = 'isOrgModalShowed';

export const useShowOrgModal = () => {
  const { data } = useMeQuery();
  const isShow = useAppSelector((state) => state.layout.isShowOrgModal);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setShowOrgModal(false));
    window.sessionStorage.setItem(ssKey, 'true');
  };

  useEffect(() => {
    if (data?.success && !data?.data?.organization_id && window.sessionStorage.getItem(ssKey) !== 'true') {
      dispatch(setShowOrgModal(true));
    }
  }, [data]);

  return {
    isEmptyOrg: data?.data?.organization_id === null,
    isShow,
    setShow: (value: boolean) => dispatch(setShowOrgModal(value)),
    onClose,
  };
};
