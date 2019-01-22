import _ from 'lodash';
import basicCompanyInfo from './basic';

let inchonCompanyInfo = {
  info1: {
    label1: 'info1-inchon1'
  },
  info2: {
    label2: 'info2-inchon2',
    'info2-1': {
      label1: 'info2(1)-inchon1'
    }
  },
  inchonLabel1: 'inchonOnly',
  inchonInfo: {
    label1: 'inchonInfo-label1',
    label2: 'inchonInfo-label2'
  }
};

export default _.defaultsDeep({}, inchonCompanyInfo, basicCompanyInfo);
