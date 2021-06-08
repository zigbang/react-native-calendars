import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../../style';
import {ZigbangColor} from '../../style';

const STYLESHEET_ID = 'stylesheet.day.single';

export default function styleConstructor(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    base: {
      width: 32,
      height: 32,
      alignItems: 'center'
    },
    text: {
      marginTop: Platform.OS === 'android' ? 4 : 6,
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: appStyle.textDayFontWeight,
      color: appStyle.dayTextColor,
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    alignedText: {
      marginTop: Platform.OS === 'android' ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 16
    },
    today: {
      backgroundColor: appStyle.todayBackgroundColor,
      borderRadius: 16
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    saturdayText: {
      color: appStyle.saturdayTextColor
    },
    sundayText: {
      color: appStyle.sundayTextColor
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

export const circledStyles = {
  text: {
    color: ZigbangColor.white,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    marginTop: 7
  },
  container: {
    backgroundColor: ZigbangColor.yellow1,
    height: 32
  }
};

export const highlightedStyles = {
  text: {
    color: ZigbangColor.grey1
  },
  container: {
    borderRadius: 0,
    height: 32
  }
};

export const disabledStyles = {
  text: {
    color: ZigbangColor.grey5
  },
  container: {
    backgroundColor: 'transparent'
  }
};
