import RootStore from './RootStore';

let rootStore = new RootStore();

/*

    rootStore : store 간의 통신을 도와주는 최상위 store
    appStore : 앱 전반적인 관리를 하는 store

*/

/*

    store 추가 방법
     1.store 파일을 만든다
     2.RootStore.js 파일에 새로 생성한 store를 주입시킨다
     3.stores.js store 변수의 key값으로 새로 생성한 store를 추가한다

*/

let stores = {
  rootStore: rootStore,
  appStore: rootStore.appStore
};

export default stores;
