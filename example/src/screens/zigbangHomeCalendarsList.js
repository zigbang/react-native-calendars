import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {CalendarList} from '@zigbang/react-native-calendars';
import {ZigbangColor} from '../lib/Color';

const testIDs = require('../testIDs');

const current = new Date();
const calendarPadding = 18;
const calendarWidth = Dimensions.get('window').width - calendarPadding * 2;

const ZigbangHomeCalendarsList = () => {
  const [markedDates, setMarkedDates] = useState({
    '2021-01-08': {startingDay: true, selected: true},
    '2021-01-09': {selected: true},
    '2021-01-10': {selected: true},
    '2021-01-11': {endingDay: true, selected: true}
  });

  const handleDayPress = selectedDay => {
    const {dateString} = selectedDay;
    const markedDatesArray = Object.keys(markedDates).map(dateKey => {
      return {
        ...markedDates[dateKey],
        dateString: dateKey
      };
    });
    const startingDay = markedDatesArray.filter(markedDate => markedDate.startingDay);
    const endingDay = markedDatesArray.filter(markedDate => markedDate.endingDay);
    const shouldInitialize =
      startingDay.length > 0 && endingDay.length > 0 && startingDay[0].dateString !== endingDay[0].dateString;
    let nextMarkedDates = {
      ...markedDates
    };
    if (shouldInitialize) {
      nextMarkedDates = {};
      nextMarkedDates[dateString] = {
        selected: true,
        startingDay: true,
        endingDay: true
      };
    } else {
      let diffDays = 0;
      const betweenDates = [];
      if (startingDay.length > 0) {
        if (endingDay.length > 0) {
          diffDays = (new Date(dateString) - new Date(startingDay[0].dateString)) / (1000 * 60 * 60 * 24);
        }
        const startingDate = new Date(startingDay[0].dateString);
        Array.from({length: Math.abs(diffDays) - 1}).forEach(() => {
          const targetDate = new Date(
            startingDate.setDate(diffDays < 0 ? startingDate.getDate() - 1 : startingDate.getDate() + 1)
          );
          betweenDates.push({
            selected: true,
            dateString: targetDate.toISOString().slice(0, 10)
          });
        });
      }
      betweenDates.forEach(date => {
        nextMarkedDates[date.dateString] = {
          selected: true
        };
      });
      nextMarkedDates[dateString] = {
        selected: true,
        endingDay: true
      };
      let nextMarkedDatesKey = Object.keys(nextMarkedDates);
      if (diffDays < 0) {
        nextMarkedDatesKey = nextMarkedDatesKey.reverse();
      }
      nextMarkedDatesKey.forEach((dateKey, index) => {
        if (nextMarkedDatesKey.length > 1) {
          if (index === 0) {
            delete nextMarkedDates[dateKey]['endingDay'];
            nextMarkedDates[dateKey]['startingDay'] = true;
          }
          if (index === Object.keys(nextMarkedDates).length - 1) {
            delete nextMarkedDates[dateKey]['startingDay'];
            nextMarkedDates[dateKey]['endingDay'] = true;
          }
        } else {
          nextMarkedDates[dateKey]['startingDay'] = true;
          nextMarkedDates[dateKey]['endingDay'] = true;
        }
      });
    }
    setMarkedDates(nextMarkedDates);
  };

  return (
    <CalendarList
      testID={testIDs.calendarList.CONTAINER}
      current={current}
      minDate={current}
      calendarWidth={calendarWidth}
      calendarHeight={300}
      monthFormat={'yyyy.MM'}
      pastScrollRange={0}
      futureScrollRange={12}
      scrollEnabled={true}
      showScrollIndicator={true}
      markedDates={markedDates}
      markingType={'zigbangHome'}
      onDayPress={handleDayPress}
      theme={{
        'stylesheet.calendar.header': calendarHeaderStyles,
        textDayFontWeight: '400',
        todayTextColor: '#222222',
        todayBackgroundColor: ZigbangColor.grey7,
        todayBorderRadius: 16,
        selectedDayBackgroundColor: ZigbangColor.yellow3
      }}
      calendarStyle={{
        paddingLeft: 0,
        paddingRight: 0
      }}
      disabledByDefault={false}
    />
  );
};

const calendarHeaderStyles = {
  week: {
    display: 'none'
  },
  monthText: {
    width: '100%',
    color: ZigbangColor.grey1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold'
  }
};

export default ZigbangHomeCalendarsList;
