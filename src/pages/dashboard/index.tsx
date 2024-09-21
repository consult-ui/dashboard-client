import { useChatListQuery } from '@/app/api';
import { ELinks } from '@/app/router/types';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // TODO: (show error if query list chats rejected here)
  const navigate = useNavigate();
  const { data } = useChatListQuery();

  useEffect(() => {
    if (!data?.data?.length) return;
    navigate(ELinks.DASHBOARD + ELinks.CHAT + '/' + data.data[0].id);
  }, [data]);

  return <SuspenseLoader />;
};

export default Dashboard;
