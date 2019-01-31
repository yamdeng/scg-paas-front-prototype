import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  BasePicker,
  TimePickerView,
  Calendar
} from 'material-ui-pickers';
import Logger from '../../../utils/Logger';

@withRouter
@inject('appStore')
@observer
class MaterialDatePicker extends React.Component {
  state = {
    selectedDate: new Date(),
    anchorEl: null,
    currentLocale: 'fr'
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date.toDate() });
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    moment.locale(selectedLocale);
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null
    });
  };

  render() {
    const { selectedDate } = this.state;
    const locale = 'ko';

    return (
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={locale}
        moment={moment}
      >
        <div className="picker">
          <DatePicker
            keyboard
            value={selectedDate}
            onChange={this.handleDateChange}
            disablePast={false}
            disableFuture={false}
            renderDay2={(date, selectedDate, dayInCurrentMonth) => {
              // debugger;
              return <span onClick={() => console.log('kkk')}>a</span>;
            }}
            shouldDisableDate={date => {
              // 주말을 걸러낼수 있음
              Logger.info('shouldDisableDate : ' + date._d.getDay());
              return false;
            }}
            minDate="2019-01-01"
            maxDate="2020-01-01"
            InputProps2={{
              endAdornment: (
                <IconButton
                  aria-label="Select locale"
                  onClick={this.handleMenuOpen}
                  aria-owns={this.state.anchorEl ? 'locale-menu' : null}
                >
                  <MoreIcon />
                </IconButton>
              )
            }}
            showTodayButton
            todayLabel="오늘"
            okLabel="확인"
            cancelLabel="취소"
          />
        </div>
        <br />
        <BasePicker value={selectedDate} onChange={this.handleDateChange}>
          {({
            date,
            handleAccept,
            handleChange,
            handleClear,
            handleDismiss,
            handleSetTodayDate,
            handleTextFieldChange,
            pick12hOr24hFormat
          }) => (
            <div>
              <div className="picker">
                <Paper style={{ overflow: 'hidden' }}>
                  <Calendar date={date} onChange={handleChange} />
                </Paper>
              </div>

              <TimePickerView
                date={date}
                ampm={false}
                onHourChange={handleChange}
                type="hours"
              />
            </div>
          )}
        </BasePicker>
      </MuiPickersUtilsProvider>
    );
  }
}

export default MaterialDatePicker;
