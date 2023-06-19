import { getAllUsers } from '@/api/userApi';
import { DisPlayStats } from '@/components/ui/dashboard/DisplayStats';
import React from 'react';

type Props = {};

const Dashboard = async (props: Props) => {
  return (
    <div>
      <h1>{'hewo'}</h1>
      <DisPlayStats />
    </div>
  );
};

export default Dashboard;
