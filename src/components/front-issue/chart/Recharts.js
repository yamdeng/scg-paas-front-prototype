import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { BarChart, Bar, Cell } from 'recharts';

const data = [
  {
    name: 'Group A',
    value: 400
  },
  {
    name: 'Group B',
    value: 300
  },
  {
    name: 'Group C',
    value: 500
  },
  {
    name: 'Group D',
    value: 200
  },
  {
    name: 'Group E',
    value: 278
  },
  {
    name: 'Group F',
    value: 189
  }
];

@withRouter
@inject('appStore')
@observer
class Recharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('Recharts');
  }

  render() {
    return (
      <div>
        <BarChart width={730} height={250} data={data}>
          <Bar dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                stroke={'red'}
                fill={'blue'}
                strokeWidth={index === 2 ? 4 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default Recharts;
