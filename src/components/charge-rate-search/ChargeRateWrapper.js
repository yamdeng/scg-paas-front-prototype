import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChargeRateMonthSearch from './ChargeRateMonthSearch';
import ChargeRateYearSearch from './ChargeRateYearSearch';
import PayOffHistory from './PayOffHistory';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.blue
  }
});

@withRouter
@inject('appStore')
@observer
class ChargeRateWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'one'
    };
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('청구요금 조회');
  }

  toggle(event, tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const classes = this.props.classes;
    let value = this.state.activeTab;

    return (
      <div className={classes.root}>
        <Tabs value={value} onChange={this.toggle}>
          <Tab value="one" label="월별조회" />
          <Tab value="two" label="연간조회" />
          <Tab value="three" label="미납내역조회" />
        </Tabs>
        {value === 'one' && <ChargeRateMonthSearch />}
        {value === 'two' && <ChargeRateYearSearch />}
        {value === 'three' && <PayOffHistory />}
      </div>
    );
  }
}

export default withStyles(styles)(ChargeRateWrapper);
