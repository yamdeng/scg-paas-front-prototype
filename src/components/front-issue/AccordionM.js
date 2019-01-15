import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import InnerTextComponent from './help/InnerTextComponent';
import Logger from '../../utils/Logger';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: 15,
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: 15,
    color: 'blue'
  }
});

@withRouter
@inject('appStore')
@observer
class AccordionM extends React.Component {
  /*

    외부에서 props을 변경해서 아코디언 상세 값을 바꾸기

  */

  constructor(props) {
    super(props);
    this.state = { expanded: null, text1: '', text2: '', text3: '' };
    this.handleChange = this.handleChange.bind(this);
    // Logger.info('location.search : ' + location.search); ---> '' 값임. 적용않됨
    Logger.info('location.search : ' + this.props.location.search);
  }

  handleChange(panel, event, isExpanded) {
    Logger.info('AccordionM handleChange');
    this.setState({ expanded: isExpanded ? panel : false });
    if (panel === 'panel1' && !this.state.text1) {
      Logger.info('panel1 text change');
      this.setState({ text1: '사용자 정보' });
    } else if (panel === 'panel2' && !this.state.text2) {
      Logger.info('panel2 text change');
      this.setState({ text2: '청구 정보' });
    } else if (panel === 'panel3' && !this.state.text3) {
      Logger.info('panel3 text change');
      this.setState({ text3: '미납 정보' });
    }
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('아코디언 메트리얼');
  }

  render() {
    Logger.info('AccordionM render call');
    let classes = this.props.classes;
    // const handleChange = panel => (event, isExpanded) => {
    //   this.setState({ expanded: isExpanded ? panel : false });
    // };

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={this.state.expanded === 'panel1'}
          onChange={(event, isExpanded) =>
            this.handleChange('panel1', event, isExpanded)
          }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>사용자 정보</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <InnerTextComponent text={this.state.text1} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.state.expanded === 'panel2'}
          onChange={(event, isExpanded) =>
            this.handleChange('panel2', event, isExpanded)
          }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>청구 정보</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <InnerTextComponent text={this.state.text2} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.state.expanded === 'panel3'}
          onChange={(event, isExpanded) =>
            this.handleChange('panel3', event, isExpanded)
          }
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>미납 정보</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>미납 정보 상세</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(AccordionM);
