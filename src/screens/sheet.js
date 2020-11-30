import React from 'react';
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

const NUM_COLS = 2;
const NUM_ROWS_STEP = 2;
const CELL_WIDTH = 100;
const CELL_HEIGHT = 60;

const black = '#000';
const white = '#fff';

const datas = [
	{
		name: 'majid',
		age: '38',
		father: 'yosef'
	},
	{
		name: 'hasan',
		age: '30',
		father: 'ahmad'
	},
	{
		name: 'zhale',
		age: '40',
		father: 'akbar'
	}
];
const styles = StyleSheet.create({
	container: { backgroundColor: white, marginVertical: 40, marginBottom: 80 },
	header: { flexDirection: 'row', borderTopWidth: 1, borderColor: black },
	identity: { position: 'absolute', width: CELL_WIDTH },
	body: { marginLeft: CELL_WIDTH },
	cell: {
		width: CELL_WIDTH,
		height: CELL_HEIGHT,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: black
	},
	column: { flexDirection: 'column' }
});

class Sheet extends React.Component {
	constructor(props: {}) {
		super(props);

		this.headerScrollView = null;
		this.scrollPosition = new Animated.Value(0);
		this.scrollEvent = Animated.event([ { nativeEvent: { contentOffset: { x: this.scrollPosition } } } ], {
			useNativeDriver: false
		});

		this.state = { count: NUM_ROWS_STEP, loading: true };
	}

	handleScroll = (e) => {
		if (this.headerScrollView) {
			let scrollX = e.nativeEvent.contentOffset.x;
			this.headerScrollView.scrollTo({ x: scrollX, animated: false });
		}
	};

	scrollLoad = () => this.setState({ loading: false, count: this.state.count + NUM_ROWS_STEP });

	handleScrollEndReached = () => {
		if (!this.state.loading) {
			this.setState({ loading: true }, () => setTimeout(this.scrollLoad, 500));
		}
	};

	formatCell(value) {
		console.log(value.split('-')[0]);
		return (
			<View key={value} style={styles.cell}>
				<Text>{Object.values(datas[0])[2]}</Text>
			</View>
		);
	}

	formatColumn = (section) => {
		let { item } = section;
		let cells = [];

		for (let i = 0; i < this.state.count; i++) {
			cells.push(this.formatCell(`${i}-${item.key}`));
			// console.log(Object.values(datas[1])[2]);
			// console.log(datas[1]);
			//
			// cells.push(this.formatCell(Object.values(datas[1])[2]));
		}

		return <View style={styles.column}>{cells}</View>;
	};

	formatHeader() {
		let cols = [];
		for (let i = 0; i < NUM_COLS; i++) {
			cols.push(this.formatCell(`frozen-row-${i}`));
		}

		return (
			<View style={styles.header}>
				{this.formatCell('frozen-row')}
				<ScrollView
					ref={(ref) => (this.headerScrollView = ref)}
					horizontal={true}
					scrollEnabled={false}
					scrollEventThrottle={16}
				>
					{cols}
				</ScrollView>
			</View>
		);
	}

	formatIdentityColumn() {
		let cells = [];
		for (let i = 0; i < this.state.count; i++) {
			cells.push(this.formatCell(`frozen-col-${i}`));
		}

		return <View style={styles.identity}>{cells}</View>;
	}

	formatBody() {
		let data = [];
		for (let i = 0; i < NUM_COLS; i++) {
			data.push({ key: `${i}` });
		}
		//	console.log(data);
		return (
			<View>
				{this.formatIdentityColumn()}
				<FlatList
					style={styles.body}
					horizontal={true}
					data={data}
					renderItem={this.formatColumn}
					stickyHeaderIndices={[ 0 ]}
					onScroll={this.scrollEvent}
					scrollEventThrottle={16}
					extraData={this.state}
				/>
			</View>
		);
	}

	formatRowForSheet = (section) => {
		let { item } = section;

		return item.render;
	};

	componentDidMount() {
		this.listener = this.scrollPosition.addListener((position) => {
			this.headerScrollView.scrollTo({ x: position.value, animated: false });
		});
	}

	render() {
		let body = this.formatBody();

		let data = [ { key: 'body', render: body } ];

		return (
			<View style={styles.container}>
				{this.formatHeader()}
				<FlatList
					data={data}
					renderItem={this.formatRowForSheet}
					onEndReached={this.handleScrollEndReached}
					onEndReachedThreshold={0.005}
				/>
				{this.state.loading && <ActivityIndicator />}
			</View>
		);
	}
}

export default Sheet;
