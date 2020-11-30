import SegmentedControlTab from 'react-native-segmented-control-tab'
import React, { Component } from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	Dimensions,
	Alert,
  ScrollView
  
} from 'react-native';
export default class ConsumerComponent extends Component {

    constructor(){
      super()
      this.state = {
        selectedIndex: 0,
      };
    }

    handleIndexChange = (index) => {
      this.setState({
        ...this.state,
        selectedIndex: index,
      });
    }

    render() {
        return (
            <View>
               <SegmentedControlTab
  tabsContainerStyle={styles.tabsContainerStyle}
  tabStyle={styles.tabStyle}
  firstTabStyle={styles.firstTabStyle}
  lastTabStyle={styles.lastTabStyle}
  tabTextStyle={styles.tabTextStyle}
  activeTabStyle={styles.activeTabStyle}
  activeTabTextStyle={styles.activeTabTextStyle}
  selectedIndex={1}
  allowFontScaling={false}
  selectedIndex={this.state.selectedIndex}
  onTabPress={this.handleIndexChange}
  values={["First", "Second", "Third"]}
  
/>
            </View>
        );
    }




}

const styles = StyleSheet.create({
    tabsContainerStyle: {
      //custom styles
    },
    tabStyle: {
      //custom styles
    },
    firstTabStyle: {
      //custom styles
    },
    lastTabStyle: {
      //custom styles
    },
    tabTextStyle: {
      //custom styles
    },
    activeTabStyle: {
      //custom styles
    },
    activeTabTextStyle: {
      //custom styles
    },
    tabBadgeContainerStyle: {
      //custom styles
    },
    activeTabBadgeContainerStyle: {
      //custom styles
    },
    tabBadgeStyle: {
      //custom styles
    },
    activeTabBadgeStyle: {
      //custom styles
    }
  });