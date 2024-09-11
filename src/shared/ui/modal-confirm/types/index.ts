import { Props as PropsModal } from '@/shared/ui/modal-general/types';

export interface PropsConfirm extends Omit<PropsModal, 'children' | 'className'> {
  onConfirm: () => void;
  isLoading?: boolean;
}
