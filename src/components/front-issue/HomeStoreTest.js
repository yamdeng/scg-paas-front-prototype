import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import Home1 from './home/Home1';
import Home2 from './home/Home2';
import Home3 from './home/Home3';

// @withRouter
// @inject('appStore')
@observer
class HomeStoreTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.appStore.changeHeadTitle('HomeStoreTest');
  }

  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Home1 />
          </div>
          <div>
            <Home2 />
          </div>
          <div>
            <Home3 />
          </div>
        </Slider>
      </div>
    );
  }
}

export default HomeStoreTest;
