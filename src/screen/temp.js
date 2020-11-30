import {LocaleConfig,Calendar,CalendarList,Agenda} from 'react-native-calendars-persian';
import { View, ScrollView,StyleSheet, TouchableOpacity, Text, RefreshControl } from 'react-native';
import React, { Component } from 'react';
const testIDs = require('../components/testIDs');

LocaleConfig.locales['fa'] = {
  monthNames: ['far','ordi','خرداد','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['far.','ordi.','خرداد','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['یک شنبه','yekshanbe','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['یک شنبه','دوشنبه','سه شنبه','چهار شنبه','پنج شنبه','جمعه','شنبه']
};

LocaleConfig.defaultLocale = 'fa';

export default class AgendaScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        items: {}
      };
    }
    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      }
    loadItems(day) {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                this.state.items[strTime].push({
                  name: 'Item for ' + strTime + ' #' + j,
                  height: Math.max(50, Math.floor(Math.random() * 150))
                });
              }
            }
          }
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({
            items: newItems
          });
        }, 1000);
      }

      renderItem(item) {
        return (
            <Text>{item.name}</Text>
        //   <TouchableOpacity
        //     testID={testIDs.agenda.ITEM}
        //     style={[styles.item, {height: item.height}]} 
        //     onPress={() => Alert.alert(item.name)}
        //   >
        //     <Text>{item.name}</Text>
        //   </TouchableOpacity>
        );
      }

    render() {
      return (
        <Agenda
          testID={testIDs.agenda.CONTAINER}
          items={{
            '1399-03-11': [{name: 'item 1 - any js object'}],
            '1399-03-11': [{name: 'item 2 - any js object', height: 80}],
            '1399-03-11': [],
            '1399-03-12': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
          }}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          //loadItemsForMonth={this.loadItems.bind(this)}
        //  selected={'2017-05-16'}
         // renderItem={this.renderItem.bind(this)}
         // renderEmptyDate={this.renderEmptyDate.bind(this)}
         // rowHasChanged={this.rowHasChanged.bind(this)}

          jalali={true}
  firstDay={6}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#43515c'},
          //    '2017-05-09': {textColor: '#43515c'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          // hideExtraDays={false}
        />
      );
    }
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    }
  });