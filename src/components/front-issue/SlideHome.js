import React from 'react';
import Slider from 'react-slick';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@inject('appStore')
@observer
class SlideHome extends React.Component {
  componentDidMount() {
    this.props.appStore.changeHeadTitle('HomeStoreTest');
  }

  render() {
    // const settings = {
    //   className: 'center',
    //   centerMode: true,
    //   infinite: true,
    //   centerPadding: '60px',
    //   slidesToShow: 3,
    //   speed: 500
    // };
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>react-slick</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

export default SlideHome;
