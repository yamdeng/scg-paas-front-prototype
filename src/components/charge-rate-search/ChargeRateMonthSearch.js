import React from 'react';
import Api from '../../utils/Api';

class ChargeRateMonthSearch extends React.Component {
  constructor(props) {
    super(props);
    console.log('ChargeRateMonthSearch constructor call');
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log('ChargeRateMonthSearch componentDidMount call');
    // Api.get('tariff/' + this.props.match.params.gasId).then(result => {
    //   this.setState({ data: result.data });
    // });
  }

  render() {
    console.log('ChargeRateMonthSearch render call');
    return <div>월간조회 : ChargeRateMonthSearch</div>;
  }
}

export default ChargeRateMonthSearch;
