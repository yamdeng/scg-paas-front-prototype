import Home from '../components/Home';
import AccordionB from '../components/front-issue/AccordionB';
import AccordionM from '../components/front-issue/AccordionM';
import DomainTestList from '../components/front-issue/DomainTestList.js';
import DomainTestDetail from '../components/front-issue/DomainTestDetail';
import ApiTestList from '../components/front-issue/ApiTestList';
import ApiTestDetail from '../components/front-issue/ApiTestDetail';

let Routes = [
  { path: '/', component: Home },
  { path: '/accordion-b', component: AccordionB },
  { path: '/accordion-m', component: AccordionM },
  { path: '/domain-list', component: DomainTestList },
  { path: '/domain-detail', component: DomainTestDetail },
  { path: '/api-list', component: ApiTestList },
  { path: '/api-detail/:id', component: ApiTestDetail }
];

export default Routes;
