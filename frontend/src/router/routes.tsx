import React from 'react';
import Transactions from '../pages/Transactions';
import Chart from '../pages/Chart/Chart';

export const routes = [
  { path: '/', component: <Chart /> },
  { path: '/table', component: <Transactions /> },
];
