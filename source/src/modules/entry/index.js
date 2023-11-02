import routes from '@routes';
import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    return <Navigate to={routes.userListPage.path} />;
};

export default Dashboard;
