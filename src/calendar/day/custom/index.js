import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import styleConstructor from './style';
import {shouldUpdate} from '../../../component-updater';

class Day extends Component {
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
    markedDates: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.style = styleConstructor(props.theme);

    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
    this.state = {
      width: 0,
    };
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']) ||
      this.state.width !== nextState.width
    );
  }

  handleLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  };

  render() {
    let containerStyle = [this.style.base];
    let textStyle = [this.style.text];

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true,
      };
    }

    const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';

    if (marking.selected) {
      containerStyle.push(this.style.selected);
      textStyle.push(this.style.selectedText);
    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
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

    const expandableBackground = this.props.theme['stylesheet.calendar.expandable-background-color'];
    const {startingDay, endingDay, disabled} = this.props.marking;

    return (
      <View>
        {!disabled && (startingDay || endingDay) && !(startingDay && endingDay) && expandableBackground && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: startingDay ? this.state.width / 2 + 5 : 0,
              right: endingDay ? this.state.width / 2 + 5 : 0,
              bottom: 0,
              backgroundColor: expandableBackground,
            }}
          />
        )}
        <TouchableOpacity
          testID={this.props.testID}
          style={containerStyle}
          onPress={this.onDayPress}
          onLongPress={this.onDayLongPress}
          activeOpacity={marking.activeOpacity}
          disabled={marking.disableTouchEvent}
          accessibilityRole={isDisabled ? undefined : 'button'}
          accessibilityLabel={this.props.accessibilityLabel}
        >
          <Text allowFontScaling={false} style={textStyle}>
            {String(this.props.children)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Day;
