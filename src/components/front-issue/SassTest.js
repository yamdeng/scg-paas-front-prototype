import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import styles from '../../css/test.module.css';

@withRouter
@inject('appStore')
@observer
class SassTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('sass test');
  }

  render() {
    return (
      <div className="sass">
        sass test
        <p className={styles.module}>module test</p>
      </div>
    );
  }
}

export default SassTest;
