import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => {
  return <div>로딩중...</div>;
};

export default Loadable({
  loader: () => import('./LoadbleTestComponent'),
  loading: Loading
});
