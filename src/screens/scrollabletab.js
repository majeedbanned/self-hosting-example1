import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import createReactClass from 'create-react-class';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const Child = createReactClass({
	onEnter() {
		console.log('enter: ' + this.props.i); // eslint-disable-line no-console
	},

	onLeave() {
		console.log('leave: ' + this.props.i); // eslint-disable-line no-console
	},

	render() {
		const tab = this.props.tab;
        var nameIcon = tab.cap.split(":");
        console.log(tab.cap);
       
		if (nameIcon[0] == 'message') {
			return <Text key={tab.key}>{`${tab.cap}`}</Text>;
		}
		if (nameIcon[0]== 'menu') {
			return <Text key={tab.key}>{`${tab.cap}`}</Text>;
		}

		if (nameIcon[0] == 'calendar') {
			return <Text key={tab.key}>{`${tab.cap}`}</Text>;
		}
		if (nameIcon[0] == 'event') {
			return <Text key={tab.key}>{`${tab.cap}`}</Text>;
		}
		if (nameIcon[0] == 'login') {
			return <Text key={tab.key}>{`${tab.cap}`}</Text>;
		}
	}
});

export default createReactClass({
	mixins: [ TimerMixin ],
	children: [],

	getInitialState() {
		return {
			tabs: [ { key: 1, cap: 'message' }, { key: 2, cap: 'menu' }, { key: 3, cap: 'calendar' } ]
		};
	},

	componentDidMount() {
		this.setTimeout(() => {
			this.setState({
				tabs: [
					{ key: 1, cap: 'message:1:camera-retro' },
					{ key: 2, cap: 'menu:0:microphone' },
					{ key: 3, cap: 'calendar:6:camera-retro' },
					{ key: 4, cap: 'event:2:rocket' },
					{ key: 5, cap: 'login:1:trash' }
				]
			});
		}, 100);
	},

	handleChangeTab({ i, ref, from }) {
		this.children[i].onEnter();
		this.children[from].onLeave();
	},

	renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
		//console.log(`${name}_${page}`);
        var nameIcon = name.split(":");

		return (
			<TouchableHighlight
				key={`${nameIcon[0]}_${page}`}
				onPress={() => onPressHandler(page)}
				onLayout={onLayoutHandler}
				style={{ flex: 1, width: 100, justifyContent: 'center', alignItems: 'center' }}
				underlayColor="#aaaaaa"
			>
				<View style={{justifyContent: 'center'}}>
                   { nameIcon[1]>0&& <Text style={styles.badge}> {nameIcon[1]} </Text>}
					<Icon size={30} name={nameIcon[2]} color="#aaa" />
					{/* <Text>{name}</Text> */}
				</View>
                
			</TouchableHighlight>
		);
	},

	render() {
		return (
			<ScrollableTabView
				initialPage={0}
				style={{ marginTop: 7 }}
				renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab} />}
				onChangeTab={this.handleChangeTab}
			>
				{this.state.tabs.map((tab, i) => {
					return (
						<Child
							ref={(ref) => (this.children[i] = ref)}
							tabLabel={`A${tab.cap}`}
							i={tab.key}
							tab={tab}
							key={tab.key}
						/>
					);
				})}
			</ScrollableTabView>
		);
	}
});

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		//alignItems: 'center',
		//justifyContent: 'center',
		width: 100
		//paddingBottom: 10,
	},
	tabs: {
		height: 45,
		flexDirection: 'row',
		paddingTop: 5,
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomColor: 'rgba(0,0,0,0.05)'
    }
    ,
    badge:{
        color:'#fff',
        position:'absolute',
        zIndex:10,
        top:-9,
        right:-12,
        padding:-1,
        overflow: 'hidden',
        backgroundColor:'red',
        borderRadius:4,
        borderWidth: 0,
        borderColor: '#000'
      }
});
