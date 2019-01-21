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
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
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

const menuMappingInfos = [
  { title: '아코디언 부트스트랩', linkUrl: '/accordion-b', success: true },
  {
    title: '아코디언 메트리얼',
    linkUrl: '/accordion-m?aa=aa&bb=bb',
    success: true
  },
  { title: '탭 부트스트랩', linkUrl: '/tab-b', success: true },
  { title: '탭 메트리얼', linkUrl: '/tab-m', success: true },
  { title: '디바이스', linkUrl: '/device-basic', success: true },
  { title: '하단영역 선택', linkUrl: '/footer-select', success: true },
  { title: '라디오 스위치', linkUrl: '/checkbox-switch', success: true },
  { title: '탭 스크롤', linkUrl: '/tab-scroll', success: true },
  { title: '네이티브 인터페이스', linkUrl: '/native-interface', success: true },
  { title: '모달 테스트1', linkUrl: '/modal-test-1' },
  { title: 'sass', linkUrl: '/sass', success: true },
  { title: '환경변수', linkUrl: '/environment', success: true },
  { title: 'CodeSplit', linkUrl: '/code-split' },
  { title: '에러테스트', linkUrl: '/error-test', success: true },
  { title: '클라이언트 에러', linkUrl: '/error-client', success: true },
  { title: '서버 에러', linkUrl: '/error-server', success: true },
  { title: '권한 에러', linkUrl: '/error-auth', success: true },
  { title: '상담톡 목록', linkUrl: '/talk-list', success: true },
  { title: '상담톡 애니메이션', linkUrl: '/talk-anmation' },
  { title: '푸쉬 테스트1', linkUrl: '/pushcase-1' },
  { title: 'Analytics', linkUrl: '/analytics' },
  { title: '폼 테스트', linkUrl: '/form-test' },
  { title: '차트 테스트1', linkUrl: '/chartcase-1' },
  {
    title: '테이블 페이징 스크롤',
    linkUrl: '/table-page-scroll',
    success: true
  },
  {
    title: '이미지 페이징 스크롤',
    linkUrl: '/image-page-scroll',
    success: true
  },
  { title: '리액트 에러 테스트', linkUrl: '/react-error-test', success: true },
  { title: '퍼블리싱 테스트', linkUrl: '/publish-test', success: true },
  {
    title: '불변 자료구조 테스트',
    linkUrl: '/immutability-test',
    success: true
  },
  {
    title: '불변 자료구조 테스트2',
    linkUrl: '/immutability-test2',
    success: true
  },
  {
    title: '저장소 테스트',
    linkUrl: '/store-test',
    success: true
  },
  {
    title: '저장소 테스트2',
    linkUrl: '/store-test2',
    success: true
  },
  {
    title: '도메인 테스트(list)',
    linkUrl: '/domain-list',
    success: true
  },
  {
    title: '도메인 테스트(detail)',
    linkUrl: '/domain-detail?id=1',
    success: true
  },
  {
    title: 'Api 테스트(list)',
    linkUrl: '/api-list',
    success: true
  },
  {
    title: 'Api 테스트(detail)',
    linkUrl: '/api-detail?id=1',
    success: true
  }
];

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
    // Promise.resolve().then(() => {
    //   this.props.history.push('/tab-b');
    // });
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
            {this.props.appStore.loginInfo
              ? this.props.appStore.loginInfo.name
              : ''}
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuMappingInfos.map(info => {
              return (
                <Link
                  className="nav-link"
                  to={info.linkUrl}
                  onClick={this.clickMenu}
                  key={info.title}
                >
                  <ListItem
                    button
                    key={info.title}
                    style={{ backgroundColor: info.success ? '#28a745' : '' }}
                  >
                    <ListItemText primary={info.title} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(FrontIssueNavigation);
