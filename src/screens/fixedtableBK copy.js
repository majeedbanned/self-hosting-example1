import React from 'react';
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//const NUM_ROWS_STEP = 10;
const CELL_WIDTH = 90;
const CELL_HEIGHT = 90;
let majid = 0;
const black = '#000';
const white = '#fff';

const styles = StyleSheet.create({
	container: { backgroundColor: white, marginVertical: 0, marginBottom: 80 },
	header: { flexDirection: 'row', borderTopWidth: 0, borderColor: black },
	identity: { position: 'absolute', width: CELL_WIDTH },
	body: { marginLeft: CELL_WIDTH },
	cell: {
		width: CELL_WIDTH,
		height: CELL_HEIGHT,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderColor: black
	},
	column: { flexDirection: 'column' }
});
// const styles = StyleSheet.create({
// 	container: { backgroundColor: white, marginVertical: 0, marginBottom: 0 },
// 	header: { backgroundColor: 'green', flexDirection: 'row', borderTopWidth: 1, borderColor: black },
// 	identity: { backgroundColor: 'green', alignSelf: 'flex-end', position: 'absolute', width: CELL_WIDTH },
// 	body: { marginRight: CELL_WIDTH },
// 	cell: {
// 		width: CELL_WIDTH,
// 		height: CELL_HEIGHT,
// 		borderRightWidth: 0,
// 		borderBottomWidth: 0,
// 		borderColor: black
// 	},
// 	cellfix: {
// 		width: CELL_WIDTH,
// 		height: CELL_HEIGHT,
// 		borderRightWidth: 0,
// 		borderBottomWidth: 0,
// 		borderColor: black
// 	},

// 	column: {
// 		backgroundColor: 'white',
// 		flexDirection: 'column'
// 	},
// 	contentContainerStyle: {
// 		//flexDirection: 'row-reverse'
// 	}
// });

class Sheet extends React.Component {
	constructor(props: {}) {
		super(props);

		this.headerScrollView = null;
		this.scrollPosition = new Animated.Value(0);
		this.scrollEvent = Animated.event([ { nativeEvent: { contentOffset: { x: this.scrollPosition } } } ], {
			useNativeDriver: false
		});

		this.state = {
			NUM_ROWS_STEP: 10,
			count: 6,
			NUM_COLS: 8,
			maindata: [
				{
					studentcode: 2295566177,
					name: 'maijd',
					lname: 'ghasemi',
					days: [
						{
							day: '1399/02/02',
							disc: 'nice'
						},
						{
							day: '1399/02/06',
							disc: 'nice'
						},
						{
							day: '1399/02/07',
							disc: 'nice'
						},
						{
							day: '1399/02/08',
							disc: 'nice'
						}
					]
				},
				{
					studentcode: 2295566178,
					name: 'maijd',
					lname: 'ghasemi',
					days: [
						{
							day: '1399/02/02',
							disc: 'nice'
						},
						{
							day: '1399/02/06',
							disc: 'nice'
						},
						{
							day: '1399/02/07',
							disc: 'nice'
						},
						{
							day: '1399/02/08',
							disc: 'nice'
						}
					]
				},
				{
					studentcode: 2295566179,
					name: 'maijd',
					lname: 'ghasemi',
					days: [
						{
							day: '1399/02/02',
							disc: 'nice'
						},
						{
							day: '1399/02/06',
							disc: 'nice'
						},
						{
							day: '1399/02/07',
							disc: 'nice'
						},
						{
							day: '1399/02/08',
							disc: 'nice'
						}
					]
				},
				{
					studentcode: 2295566180,
					name: 'maijd',
					lname: 'ghasemi',
					days: [
						{
							day: '1399/02/02',
							disc: 'nice'
						},
						{
							day: '1399/02/06',
							disc: 'nice'
						},
						{
							day: '1399/02/07',
							disc: 'nice'
						},
						{
							day: '1399/02/08',
							disc: 'nice'
						}
					]
				}
			],

			loading: false
		};
	}

	handleScroll = (e) => {
		if (this.headerScrollView) {
			let scrollX = e.nativeEvent.contentOffset.x;
			this.headerScrollView.scrollTo({ x: scrollX, animated: false });
		}
	};

	scrollLoad = () => this.setState({ loading: false, count: this.state.count + this.state.NUM_ROWS_STEP });

	handleScrollEndReached = () => {
		if (!this.state.loading) {
			this.setState({ loading: true }, () => setTimeout(this.scrollLoad, 500));
		}
	};

	formatCell(col, row, value) {
		return (
			<View key={col + '-' + row} style={styles.cell}>
				<TouchableOpacity
					onPress={() => {
						var someProperty = { ...this.state.maindata[col] };
						someProperty.days[row].disc = 'ddddd';
						this.setState({ someProperty });

						// this.setState((prevState) => ({
						// 	maindata: {
						// 		...prevState.maindata
						// 		//maindata[0].days[0].disc: '222'
						// 	}
						// 	//shoro_namayesh: toFarsi(dataJalali)
						// }));

						//	alert(col + '-' + row);
					}}
					style={styles.cell}
				>
					<View style={{ backgroundColor: 'yellow', flex: 1, borderRadius: 5, margin: 4 }}>
						<Text>{value}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	formatCellHeader(key, value) {
		return (
			<View key={value} style={styles.cell}>
				<TouchableOpacity
					style={styles.cell}
					onPress={() => {
						alert(key);
					}}
				>
					<View
						style={{
							backgroundColor: 'red',
							flex: 1,
							borderRadius: 5,
							margin: 4
							//	transform: [ { scaleX: -1 } ]
						}}
					>
						<Text>{value}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	formatColumn = (section) => {
		let { item } = section;
		let cells = [];

		for (let i = 0; i < this.state.count; i++) {
			cells.push(
				this.formatCell(
					i,
					item.key,
					//	`col-${i}-${item.key}` +
					this.state.maindata[i] == null
						? ''
						: this.state.maindata[i].days[parseInt(item.key)] == null
							? ''
							: this.state.maindata[i].days[parseInt(item.key)].disc
				)
			);
		}

		return <View style={styles.column}>{cells}</View>;
	};

	formatHeader() {
		let cols = [];
		for (let i = 0; i < this.state.NUM_COLS; i++) {
			cols.push(
				this.formatCellHeader(
					i,
					`frozen-row-${i}` +
						(this.state.maindata[0].days[i] == null ? '' : this.state.maindata[0].days[i].day)
				)
			);
		}

		return (
			<View style={styles.header}>
				{this.formatCell('frozen-row')}

				<ScrollView
					ref={(ref) => (this.headerScrollView = ref)}
					horizontal={true}
					//	style={{ transform: [ { scaleX: -1 } ] }}
					// onContentSizeChange={this.scrollListToStart.bind(this)}
					scrollEnabled={true}
					scrollEventThrottle={17}
					//	contentContainerStyle={styles.contentContainerStyle}
				>
					{cols}
				</ScrollView>

				{/* <View key="frozen-row" style={styles.cellfix}>
					<Text>frozen-row</Text>
				</View> */}
			</View>
		);
	}

	formatIdentityColumn() {
		let cells = [];
		for (let i = 0; i < this.state.count; i++) {
			cells.push(
				this.formatCell(
					i,
					'fix',
					this.state.maindata[i] == null ? 'nol' : this.state.maindata[i].studentcode,
					this.state.maindata[i] == null ? 'nol' : this.state.maindata[i].name,
					this.state.maindata[i] == null ? 'nol' : this.state.maindata[i].lname
				)
			);
		}

		return <View style={styles.identity}>{cells}</View>;
	}

	formatBody() {
		let data = [];
		for (let i = 0; i < this.state.NUM_COLS; i++) {
			data.push({ key: `${i}` });
		}
		//scrollToEnd = () => this.carousel.scrollToEnd({ animated: false });
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

		this.setState({
			count: this.state.maindata.length,
			NUM_COLS: this.state.maindata[0].days.length
		});
	}
	// scrollListToStart(contentWidth, contentHeight) {
	// 	//console.log(contentWidth)
	// 	// this.headerScrollView.scrollTo({x: contentWidth, animated: false})
	// 	this.headerScrollView.scrollTo({ x: contentWidth, animated: false });

	// 	//this.scrollView.scrollTo({x: contentWidth});
	// }

	// scrollListToStartM(contentWidth, contentHeight) {
	// 	console.log(contentWidth);
	// 	majid = contentWidth;
	// 	// this.headerScrollView.scrollTo({x: contentWidth, animated: false})
	// 	//this.headerScrollView.scrollTo({x: contentWidth, animated: false})

	// 	//this.scrollView.scrollTo({x: contentWidth});
	// }
	render() {
		let body = this.formatBody();

		let data = [ { key: 'body', render: body } ];

		return (
			<View style={styles.container}>
				{this.formatHeader()}
				<FlatList
					data={data}
					renderItem={this.formatRowForSheet}
					//onEndReached={this.handleScrollEndReached}
					onEndReachedThreshold={0.005}
				/>
				{this.state.loading && <ActivityIndicator size="small" color="#000"/>}
			</View>
		);
	}
}

export default Sheet;
