import { ELinks } from '@/app/router/types';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // TODO: add logic for query list chats and redirect to one chat page (show error if query list chats rejected here)
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ELinks.DASHBOARD + ELinks.CHAT + '/13');
  }, []);

  return <SuspenseLoader />;
};

export default Dashboard;
