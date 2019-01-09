import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

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
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TabContainer>Item One</TabContainer>}
        {this.state.value === 1 && <TabContainer>Item Two</TabContainer>}
        {this.state.value === 2 && <TabContainer>Item Three</TabContainer>}
        {this.state.value === 3 && <TabContainer>Item Four</TabContainer>}
        {this.state.value === 4 && <TabContainer>Item Five</TabContainer>}
        {this.state.value === 5 && <TabContainer>Item Six</TabContainer>}
        {this.state.value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}

export default withStyles(styles)(TabM);
