import { useChatListQuery } from '@/app/api';
import { ELinks } from '@/app/router/types';
import ErrorAlert from '@/shared/ui/error-alert';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, error } = useChatListQuery();

  useEffect(() => {
    if (!data?.data?.length) return;
    navigate(ELinks.DASHBOARD + ELinks.CHAT + '/' + data.data[0].id);
  }, [data]);

  if (error && !data) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ErrorAlert text="При загрузке списка помощников произошла ошибка, если перезагрузка страницы не решит эту проблему, обратитесь в поддержку и наши специалисты помогут вам в ближайшее время" />
      </div>
    );
  }

  return <SuspenseLoader />;
};

export default Dashboard;
