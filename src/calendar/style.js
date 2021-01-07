import {StyleSheet} from 'react-native';
import * as defaultStyle from '../style';

const STYLESHEET_ID = 'stylesheet.calendar.main';

export default function getStyle(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: appStyle.calendarBackground
    },
    dayContainer: {
      flex: 1,
      alignItems: 'center'
    },
    emptyDayContainer: {
      flex: 1
    },
    monthView: {
      backgroundColor: appStyle.calendarBackground
    },
    week: {
      marginTop: 7,
      marginBottom: 7,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

export const ZigbangColor = {
  grey1: '#222222',
  grey2: '#444444',
  grey3: '#757575',
  grey4: '#a6a6a6',
  grey5: '#cccccc',
  grey6: '#e1e1e1',
  grey7: '#eeeeee',
  grey8: '#f6f6f6',
  grey9: '#fafafa',
  grey10: '#fcfcfc',
  white: '#ffffff',
  black: '#000000',
  yellow1: '#fa950b',
  yellow2: '#fa880b',
  yellow3: '#fef4e6',
  red1: '#e05a26',
  red2: '#ffeae2',
  blue1: '#2d60a3',
  blue2: '#2d95ff',
  blue3: '#3f93be',
  blue4: '#3a98fc',
  blue5: '#e6f3fe',
  blue6: '#E0ECFC',
  teal1: '#0f9d9a',
  teal2: '#1abebb',
  teal3: '#EFF6F6',
  pupple1: '#696dae',
  pupple2: '#58506f'
};
