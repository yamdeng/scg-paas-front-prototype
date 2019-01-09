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
  constructor(props) {
    super(props);
    this.state = { expanded: null };
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('아코디언 메트리얼');
  }

  render() {
    // eslint-disable-next-line
    console.log('AccordionM render call');
    let classes = this.props.classes;
    const handleChange = panel => (event, isExpanded) => {
      this.setState({ expanded: isExpanded ? panel : false });
    };
    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={this.state.expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>사용자 정보</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <InnerTextComponent text="사용자 정보 상세" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.state.expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>청구 정보</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <InnerTextComponent text="청구 정보 상세" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={this.state.expanded === 'panel3'}
          onChange={handleChange('panel3')}
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
