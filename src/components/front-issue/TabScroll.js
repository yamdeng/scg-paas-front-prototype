import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Logger from '../../utils/Logger';

@withRouter
@inject('appStore')
@observer
class TabScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.getClassName = this.getClassName.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('TabScroll');
  }

  getClassName(index) {
    return this.state.activeIndex === index ? 'active' : '';
  }

  handlerClick(index, event) {
    let findDom = document.getElementById('tabScroll');
    Logger.info('document.body.clientWidth : ' + document.body.clientWidth);
    Logger.info('findDom.scrollWidth : ' + findDom.scrollWidth);
    Logger.info('findDom.scrollLeft : ' + findDom.scrollLeft);
    Logger.info('event.target.offsetLeft : ' + event.target.offsetLeft);
    Logger.info('event.target.clientWidth : ' + event.target.clientWidth);
    this.setState({ activeIndex: index });
    findDom.scrollTo(
      findDom.scrollWidth -
        (findDom.scrollWidth - event.target.offsetLeft + 70),
      0
    );
  }

  render() {
    return (
      <div class="scrollmenu" id="tabScroll">
        <a
          href="javascript:void(0);"
          className={this.getClassName(0)}
          onClick={event => this.handlerClick(0, event)}
        >
          Home
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(1)}
          onClick={event => this.handlerClick(1, event)}
        >
          News
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(2)}
          onClick={event => this.handlerClick(2, event)}
        >
          Contact
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(3)}
          onClick={event => this.handlerClick(3, event)}
        >
          About
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(4)}
          onClick={event => this.handlerClick(4, event)}
        >
          Support
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(5)}
          onClick={event => this.handlerClick(5, event)}
        >
          Blog
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(6)}
          onClick={event => this.handlerClick(6, event)}
        >
          Tools
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(7)}
          onClick={event => this.handlerClick(7, event)}
        >
          Base
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(8)}
          onClick={event => this.handlerClick(8, event)}
        >
          Custom
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(9)}
          onClick={event => this.handlerClick(9, event)}
        >
          More
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(10)}
          onClick={event => this.handlerClick(10, event)}
        >
          Logo
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(11)}
          onClick={event => this.handlerClick(11, event)}
        >
          Friends
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(12)}
          onClick={event => this.handlerClick(12, event)}
        >
          Partners
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(13)}
          onClick={event => this.handlerClick(13, event)}
        >
          People
        </a>
        <a
          href="javascript:void(0);"
          className={this.getClassName(14)}
          onClick={event => this.handlerClick(14, event)}
        >
          Work
        </a>
      </div>
    );
  }
}

export default TabScroll;
