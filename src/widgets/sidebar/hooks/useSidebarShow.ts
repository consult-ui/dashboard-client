import { setShowSidebar } from '@/app/store/slices/layoutSlice.ts';
import { useAppDispatch, useAppSelector } from '@/app/store/store.ts';

export const useSidebarShow = () => {
  const isShow = useAppSelector((state) => state.layout.isShowSidebar);
  const dispatch = useAppDispatch();

  return {
    isShow,
    setIsShow: (value: boolean) => dispatch(setShowSidebar(value)),
  };
};
