import { lazy } from 'react';

const Order = lazy(() => import('./order' /* webpackChunkName: "channels" */));

export default Order;
