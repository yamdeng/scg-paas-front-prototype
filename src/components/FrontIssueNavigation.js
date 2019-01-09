import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BuildIcon from '@material-ui/icons/Build';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import { Link } from 'react-router-dom';
import Config from '../config/Config';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

@withRouter
@inject('appStore')
@observer
class FrontIssueNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.clickMenu = this.clickMenu.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  clickMenu() {
    this.setState({ open: false });
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.props.appStore.headTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link className="nav-link" to="/home" onClick={this.clickMenu}>
              <ListItem button key={'home'}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'홈'} />
              </ListItem>
            </Link>
            <Link className="nav-link" to="/profile" onClick={this.clickMenu}>
              <ListItem button key={'profile'}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={'프로필2'} />
              </ListItem>
            </Link>
            <Link className="nav-link" to="/setting" onClick={this.clickMenu}>
              <ListItem button key={'settings'}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={'설정'} />
              </ListItem>
            </Link>
            <Link
              className="nav-link"
              to={`/safeHistory/${Config.contractNo}`}
              onClick={this.clickMenu}
            >
              <ListItem button key={'safehistory'}>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={'안전점검이력 조회'} />
              </ListItem>
            </Link>
            <Link className="nav-link" to="/tariff" onClick={this.clickMenu}>
              <ListItem button key={'gassearch'}>
                <ListItemIcon>
                  <DonutSmallIcon />
                </ListItemIcon>
                <ListItemText primary={'가스요금 조회'} />
              </ListItem>
            </Link>
            <Link
              className="nav-link"
              to={`/monthInfo/201812/${Config.contractNo}`}
              onClick={this.clickMenu}
            >
              <ListItem button key={'search'}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary={'청구요금 조회'} />
              </ListItem>
            </Link>
            <Link
              className="nav-link"
              to="setting"
              onClick={event => {
                event.preventDefault();
                this.setState({ open: false });
              }}
            >
              <ListItem button key={'appInfo'}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText
                  primary={'앱 정보 ' + this.props.appStore.appVersion}
                />
              </ListItem>
            </Link>
          </List>
          <Link className="nav-link" to="/nativetest" onClick={this.clickMenu}>
            <ListItem button key={'nativetest'}>
              <ListItemIcon>
                <DeviceUnknownIcon />
              </ListItemIcon>
              <ListItemText primary={'연동 테스트'} />
            </ListItem>
          </Link>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(FrontIssueNavigation);
