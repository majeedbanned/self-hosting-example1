import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars-persian';
 
export default class PersianCalendarPickerExample extends React.Component {
  constructor(props) {
        super(props);
 
    this.state = {
      selectedStartDate: null,
    };
 
        this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date) {
    this.setState({ selectedStartDate: date });
  }
 
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
 
         <PersianCalendarPicker
          onDateChange={this.onDateChange}
                /> 
 
        <View>
          <Text>SELECTED DATE:{ startDate }</Text>

          
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
  },
});