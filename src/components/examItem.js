import React, { Component } from 'react';
import { RadioButton } from 'react-native-paper';
import HTML from 'react-native-render-html';
import {
	StyleSheet,
	FlatList,
	ScrollView,
	Image,
	View,
	Text,
	ActivityIndicator,
	RefreshControl,
	TouchableOpacity
} from 'react-native';

export default class examItem extends React.PureComponent {
	// state = {
	// 	textInputs: []
	// };

	render() {
		const { item } = this.props.produto;
		//console.log(this.props.produto);
		return (
			<View
				style={{
					//height: 260,
					borderRadius: 13,
					margin: 15
				}}
			>
				<View style={styles.mainpanel}>
					<View
						// colors={[ '#6e80fe', '#a976fb', '#f36af9' ]}
						// start={{ x: 0, y: 1 }}
						// end={{ x: 1, y: 0 }}
						style={styles.gradient}
					>
						<View style={{ borderWidth: 0, flex: 1, flexDirection: 'row', marginStart: 0 }}>
							<View
								style={{
									flexDirection: 'column',
									borderWidth: 0,
									marginStart: 0,
									flex: 3
								}}
							>
								<View
									style={{
										flexDirection: 'column',
										borderWidth: 0,
										marginStart: 0,
										flex: 1
									}}
								>
									{/* <View style={{ justifyContent: 'center', flex: 1 }}>
                                        <Image
                                            style={styles.image}
                                            source={{
                                                uri: getHttpAdress() + 'child/' + item.useer + '.jpg'
                                            }}
                                        />
                                    </View> */}
									<View style={{ justifyContent: 'center', flex: 1 }}>
										{/* <Text style={styles.aztitle}>{item.soal}</Text> */}
										{/* <HTML html={item.soal} /> */}
									</View>

									<View style={{ justifyContent: 'center', flex: 1 }}>
										<Text style={styles.aztitle} />
										<HTML html={this.props.produto.soal} />

										<RadioButton.Group
										//onValueChange={(value) => this.setState({ value })}
										// onValueChange={(text) => {
										// 	let { textInputs } = this.state;
										// 	textInputs[this.props.iindex] = text;
										// 	this.setState({
										// 		textInputs
										// 	});
										// }}
										//	value={this.state.value}
										// value={this.state.textInputs[this.props.iindex]}
										>
											<View style={{ flexDirection: 'row' }}>
												<View
													style={{
														flexDirection: 'column-reverse',
														borderWidth: 1,
														borderColor: '#aaa',
														borderRadius: 40,
														width: 38,
														height: 38
													}}
												>
													{/* <RadioButton value={this.props.produto.id_soal + '-' + '1'} /> */}
												</View>
												<HTML html={this.props.produto.g1} />
												<Text style={styles.aztitle} />
											</View>
											<View style={{ flexDirection: 'row' }}>
												{/* <RadioButton value={this.props.produto.id_soal + '-' + '2'} /> */}
												<HTML html={this.props.produto.g2} />
												<Text style={styles.aztitle} />
											</View>
											<View style={{ flexDirection: 'row' }}>
												{/* <RadioButton value={this.props.produto.id_soal + '-' + '3'} /> */}
												<HTML html={this.props.produto.g3} />
												<Text style={styles.aztitle} />
											</View>
											<View style={{ flexDirection: 'row' }}>
												{/* <RadioButton value={this.props.produto.id_soal + '-' + '4'} /> */}
												<HTML html={this.props.produto.g4} />
												<Text style={styles.aztitle} />
											</View>
										</RadioButton.Group>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainpanel: {
		zIndex: 1,
		elevation: 2,
		shadowColor: '#ccc',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.67,
		shadowRadius: 3.49
	},
	gradient: {
		borderRadius: 13,
		left: 0,
		right: 0,
		top: 0,
		padding: 5,
		zIndex: 1,
		backgroundColor: '#ddd',
		elevation: 2,
		//height: 200,
		flexDirection: 'column'
	},
	aztitlet: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'center',
		fontSize: 13,
		borderWidth: 1,
		padding: 1,
		borderColor: 'white',
		borderRadius: 5,
		color: 'white'
	}
});
