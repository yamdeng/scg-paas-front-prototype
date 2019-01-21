import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => {
  return <div>로딩중...</div>;
};

export const AccordionB = Loadable({
  loader: () => import('./components/front-issue/AccordionB'),
  loading: Loading
});

export const AccordionM = Loadable({
  loader: () => import('./components/front-issue/AccordionM'),
  loading: Loading
});

export const TabB = Loadable({
  loader: () => import('./components/front-issue/TabB'),
  loading: Loading
});

export const TabM = Loadable({
  loader: () => import('./components/front-issue/TabM'),
  loading: Loading
});
