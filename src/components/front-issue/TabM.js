import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InnerTextComponent from './help/InnerTextComponent';
import InnerTextComponent2 from './help/InnerTextComponent2';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

@withRouter
@inject('appStore')
@observer
class TabM extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('탭 메트리얼');
  }

  render() {
    const classes = this.props.classes;

    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="사용자 정보" />
            <Tab label="청구 정보" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && (
          <InnerTextComponent text="사용자 정보 상세" />
        )}
        {this.state.value === 1 && (
          <InnerTextComponent2 text="청구 정보 상세" />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TabM);
