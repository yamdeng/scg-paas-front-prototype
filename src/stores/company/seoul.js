import _ from 'lodash';
import basicCompanyInfo from './basic';

let seoulCompanyInfo = {
  label1: 'seoul',
  label2: 'seoul2',
  info1: {
    label1: 'info1-seoul1',
    label2: 'info1-seoul2'
  },
  info2: {
    label1: 'info2-seoul1',
    label2: 'info2-seoul2',
    'info2-1': {
      label1: 'info2(1)-seoul1',
      label2: 'info2(1)-seoul2'
    }
  },
  seoulLabel1: 'seoulOnly',
  seoulInfo: {
    label1: 'seoulInfo-label1',
    label2: 'seoulInfo-label2'
  }
};

export default _.defaultsDeep({}, seoulCompanyInfo, basicCompanyInfo);
