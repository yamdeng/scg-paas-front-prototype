import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';

@withRouter
@inject('appStore')
@observer
class Calendar extends React.Component {
  maxDate = moment('2019-03-27', 'YYYY-MM-DD');
  minDate = moment('2018-11-27', 'YYYY-MM-DD');
  selectDate = '2019-02-01';
  selectDates = ['2019-02-04', '2019-02-05'];
  constructor(props) {
    /*

      moment('2019-01', 'YYYY-MM').subtract(1,'months').format('YYYY-MM') ---> 이전월
      moment('2018-12', 'YYYY-MM').add(1,'months').format('YYYY-MM') ---> 다음월
      moment('2018-01', 'YYYY-MM').startOf('month').format('YYYY-MM-DD hh:mm'); ---> 시작일
      moment('2018-01', 'YYYY-MM').endOf('month').format('YYYY-MM-DD hh:mm'); ---> 종료일
      moment('2019-02-17', 'YYYY-MM-DD').day(); ---> week : 0 일요일 6 토요일

    */

    super(props);
    let todayMonth = moment().format('YYYY-MMD');
    this.state = { currentMonth: todayMonth, dayInfos: [] };
    this.changeCalendar = this.changeCalendar.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  changeCalendar(changeMonth) {
    let monthStartDate = moment(changeMonth, 'YYYY-MM').startOf('month');
    let monthEndDate = moment(changeMonth, 'YYYY-MM').endOf('month');
    let monthStartWeekDay = moment(
      monthStartDate.format('YYYY-MM-DD'),
      'YYYY-MM-DD'
    ).day();
    let monthLasyDayNumber = Number(monthEndDate.format('DD'));
    let dayInfos = [];
    for (let emptyIndex = 0; emptyIndex < monthStartWeekDay; emptyIndex++) {
      dayInfos.push(null);
    }
    let firstDate = moment(
      monthStartDate.add('days', 0).format('YYYY-MM-DD'),
      'YYYY-MM-DD'
    );
    let isFirstHoliDay = false;
    let firstDateWeekDay = firstDate.day();
    if (firstDateWeekDay === 0 || firstDateWeekDay === 6) {
      isFirstHoliDay = true;
    }
    let isFirstDateDisabled = false;
    if (firstDate.diff(this.maxDate) > 0) {
      isFirstDateDisabled = true;
    }
    if (firstDate.diff(this.minDate) < 0) {
      isFirstDateDisabled = true;
    }
    dayInfos.push({
      date: firstDate,
      dateString: firstDate.format('YYYY-MM-DD'),
      isHoliDay: isFirstHoliDay,
      disabled: isFirstDateDisabled
    });
    for (let dayIndex = 1; dayIndex < monthLasyDayNumber; dayIndex++) {
      let dayUnitInfo = moment(
        monthStartDate.add('days', 1).format('YYYY-MM-DD'),
        'YYYY-MM-DD'
      );
      let isHoliDay = false;
      let dayUnitInfoWeekDay = dayUnitInfo.day();
      if (dayUnitInfoWeekDay === 0 || dayUnitInfoWeekDay === 6) {
        isHoliDay = true;
      }
      let isDateDisabled = false;
      if (dayUnitInfo.diff(this.maxDate) > 0) {
        isDateDisabled = true;
      }
      if (dayUnitInfo.diff(this.minDate) < 0) {
        isDateDisabled = true;
      }
      dayInfos.push({
        date: dayUnitInfo,
        dateString: dayUnitInfo.format('YYYY-MM-DD'),
        isHoliDay: isHoliDay,
        disabled: isDateDisabled
      });
    }
    this.setState({ currentMonth: changeMonth, dayInfos: dayInfos });
  }

  prevMonth() {
    this.changeCalendar(
      moment(this.state.currentMonth, 'YYYY-MM')
        .subtract(1, 'months')
        .format('YYYY-MM')
    );
  }

  nextMonth() {
    this.changeCalendar(
      moment(this.state.currentMonth, 'YYYY-MM')
        .add(1, 'months')
        .format('YYYY-MM')
    );
  }

  selectDate() {}

  componentDidMount() {
    this.props.appStore.changeHeadTitle('Calendar');
    let todayMonth = moment().format('YYYY-MMD');
    this.changeCalendar(todayMonth);
  }

  render() {
    return (
      <React.Fragment>
        <div class="month">
          <ul style={{ listStyleType: 'none' }}>
            <li class="prev" onClick={this.prevMonth}>
              &#10094;
            </li>
            <li class="next" onClick={this.nextMonth}>
              &#10095;
            </li>
            <li>
              {this.state.currentMonth.substr(5, 2)}
              <br />
              <span style={{ fontSize: '18px' }}>
                {this.state.currentMonth.substr(0, 4)}
              </span>
            </li>
          </ul>
        </div>
        <ul class="weekdays">
          <li>일</li>
          <li>월</li>
          <li>화</li>
          <li>수</li>
          <li>목</li>
          <li>금</li>
          <li>토</li>
        </ul>
        <ul class="days">
          {this.state.dayInfos.map(info => {
            let dayListComponent = null;
            if (info) {
              let className = '';
              className = classNames({
                active: info.isHoliDay,
                disabled: info.disabled
              });
              dayListComponent = (
                <li className={className}>{info.date.format('D')}</li>
              );
            } else {
              dayListComponent = <li />;
            }
            return dayListComponent;
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default Calendar;
