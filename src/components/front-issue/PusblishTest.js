import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import DogImage from '../../image/1.JPG';

@withRouter
@inject('appStore')
@observer
class PusblishTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('PusblishTest');
  }

  render() {
    /*

      process.env.PUBLIC_URL
       -develoment 환경에서는 / 상대경로
       -production 환경에서는 package.json의 homepage 값을 기준으로 사용

    */
    return (
      <div>
        <img src={DogImage} alt="" />
        <img src={process.env.PUBLIC_URL + '/picture/2.JPG'} alt="" />;
        <img src="/picture/3.JPG" alt="" />;
      </div>
    );
  }
}

export default PusblishTest;
