import { Me } from '@/app/api/types/user.ts';
import { TOAST_INFO } from '@/shared/constants/toasts.ts';
import { formatDate } from '@/shared/utils/formatDate.ts';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

type Props = {
  user: Me['data'];
};
const cookieKey = 'user-expire-toast-showed';
const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

const ExpireToasts = ({ user }: Props) => {
  useEffect(() => {
    const userExpireTimestamp = Date.parse(user.expiration_date);
    const nowTimestamp = Date.now();

    if (userExpireTimestamp < nowTimestamp + threeDaysInMs && !Cookies.get(cookieKey)) {
      TOAST_INFO(
        `Ваша подписка закончится ${formatDate(user.expiration_date)}, обратитесь в поддержку, для ее продления`,
        15000,
      );
      // сетим куку чтобы в следующий раз тост появился минимум через 2 часа
      Cookies.set(cookieKey, 'true', { expires: 1 / 12 });
    }
  }, []);

  return null;
};

export default ExpireToasts;
