import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import shortid from 'shortid';
import Api from '../../utils/Api';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: '100%'
  }
});

@withRouter
@inject('appStore')
@observer
class ImageScrollPage extends React.Component {
  pageSize = 10;
  page = 1;
  enableDataLoad = true;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalCount: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if (window.scrollY + window.innerHeight + 50 > document.body.clientHeight) {
      if (
        this.enableDataLoad &&
        this.state.data.length < this.state.totalCount
      ) {
        this.enableDataLoad = false;
        Api.get('imageScroll', {
          params: {
            page: this.page,
            pageSize: this.pageSize
          }
        }).then(result => {
          this.page = this.page + 1;
          this.setState({
            data: this.state.data.concat(result.data.data),
            totalCount: result.data.totalCount
          });
          this.enableDataLoad = true;
        });
      }
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('ImageScrollPage');
    Api.get('imageScroll', {
      params: {
        page: this.page,
        pageSize: this.pageSize
      }
    }).then(result => {
      this.setState({
        data: result.data.data,
        totalCount: result.data.totalCount
      });
    });
    this.page = this.page + 1;
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    let classes = this.props.classes;
    let prefixImageSrc =
      'http://ec2-54-180-120-228.ap-northeast-2.compute.amazonaws.com:3000/image/';
    return (
      <div style={{ marginTop: 70, padding: 10 }} className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {this.state.data.map(info => (
            <GridListTile key={shortid.generate()} cols={3}>
              <img src={prefixImageSrc + info.id + '.JPG'} alt={info.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(ImageScrollPage);
