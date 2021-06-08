import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import styleConstructor, {circledStyles, highlightedStyles, disabledStyles} from './style';
import {shouldUpdate} from '../../../component-updater';

class ZigbangHomeDay extends Component {
  static displayName = 'IGNORE';

  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['selected', 'disabled', 'today', '']),
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object,
    markedDates: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.style = styleConstructor(props.theme);

    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
  }

  render() {
    let containerStyle = [this.style.base];
    let textStyle = [this.style.text];

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }

    const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';

    if (marking.selected) {
      containerStyle.push(this.style.selected);
      textStyle.push(this.style.selectedText);
      const shouldApplyCircledStyles = marking.startingDay || marking.endingDay;
      const shouldApplyHighlightedStyles = !marking.startingDay && !marking.endingDay && !marking.disabled;
      if (shouldApplyCircledStyles) {
        containerStyle.push(circledStyles.container);
        textStyle.push(circledStyles.text);
      } else if (shouldApplyHighlightedStyles) {
        containerStyle.push(highlightedStyles.container);
        textStyle.push(highlightedStyles.text);
      }
    } else if (isDisabled) {
      containerStyle.push(disabledStyles.container);
      textStyle.push(this.style.disabledText);
      textStyle.push(disabledStyles.text);
    } else if (this.props.state === 'today') {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
    } else if (this.props.state === 'saturday') {
      textStyle.push(this.style.saturdayText);
    } else if (this.props.state === 'sunday') {
      textStyle.push(this.style.sundayText);
    }

    if (marking.customStyles && typeof marking.customStyles === 'object') {
      const styles = marking.customStyles;
      if (styles.container) {
        if (styles.container.borderRadius === undefined) {
          styles.container.borderRadius = 16;
        }
        containerStyle.push(styles.container);
      }
      if (styles.text) {
        textStyle.push(styles.text);
      }
    }

    return (
      <View>
        <TouchableOpacity
          testID={this.props.testID}
          style={containerStyle}
          onPress={isDisabled ? (marking.selected ? this.onDayPress : () => {}) : this.onDayPress}
          onLongPress={isDisabled ? (marking.selected ? this.onDayLongPress : () => {}) : this.onDayLongPress}
          activeOpacity={marking.activeOpacity}
          disabled={marking.disableTouchEvent}
          accessibilityRole={isDisabled ? undefined : 'button'}
          accessibilityLabel={this.props.accessibilityLabel}
        >
          <Text allowFontScaling={false} style={textStyle}>
            {String(this.props.children)}
          </Text>
          {/* 이곳에 "오늘" 표시를 하면된다 */}
        </TouchableOpacity>
      </View>
    );
  }
}

export default ZigbangHomeDay;
