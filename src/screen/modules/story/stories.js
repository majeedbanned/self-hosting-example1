import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import recyclerViewList1 from './../../../screen/recyclerViewList1';
import Icon from 'react-native-vector-icons/Ionicons';
import { YellowBox } from 'react-native';

import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, Text, RefreshControl } from 'react-native';
import ActionBarImage from '../../../components/ActionBarImage';
import { userInfo, toFarsi, getHttpAdress } from '../../../components/DB';
import defaultStyles from '../../../config/styles';
import Menu from '../../menu';
import GLOBAL from '../../global';
import { I18nManager, AppRegistry } from 'react-native';

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested inside plain' // TODO: Remove when fixed
]);

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const stories = ({ Navigation, Items, caption, ccolor, ...rest }) => (
	<View
		style={[
			{ flexDirection: 'row', borderColor: '#eee', borderBottomWidth: 1, backgroundColor: 'white', paddingTop: 8 }
		]}
	>
		{global.ttype == 'administrator' && (
			<View>
				<View
					style={[
						{
							justifyContent: 'center',
							alignItems: 'center',
							marginRight: 0,
							borderRadius: 15,
							backgroundColor: 'white'
						}
					]}
				>
					<View
						style={[
							{
								borderWidth: 0,
								borderRadius: 45,
								marginRight: 0

								//backgroundColor: '#f76d6d'
							}
						]}
					>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => {
								//global.storyID = item.id;
								Navigation.navigate('storyList');
							}}
						>
							<View
								style={[
									styles.imageavatar,

									{
										justifyContent: 'center',
										alignItems: 'center',
										borderColor: 'black',
										borderStyle: 'dashed',
										borderWidth: 2,
										borderColor: '#aaa',
										margin: 2
										//backgroundColor: 'white'
									}
								]}
							>
								<Icon size={35} name="md-add" color="#aaa" />
							</View>
							{/* <Image
							style={[
								styles.imageavatar,

								{
									borderWidth: 2,
									borderColor: 'white',
									margin: 2
								}
							]}
							source={{ uri: getHttpAdress() + 'media/' }}
						/> */}
						</TouchableOpacity>
					</View>

					<Text
						numberOfLines={1}
						style={[
							{
								paddingTop: 4,
								paddingBottom: 3,
								width: 80,
								textAlign: 'center',
								fontFamily: 'iransans',
								fontSize: 12
							}
						]}
					>
						جدید
					</Text>
				</View>
			</View>
		)}
		<FlatList
			inverted={Platform.OS === 'ios' ? false : true}
			keyExtractor={(item, index) => String(index)}
			data={Items}
			horizontal
			// keyExtractor={(item) => {
			// 	return item.id;
			// }}
			renderItem={({ item, index }) => {
				return (
					<View
						style={[
							{
								borderWidth: 0,
								justifyContent: 'center',
								alignItems: 'center',
								marginRight: 0,
								borderRadius: 15,
								backgroundColor: 'white'
							}
						]}
					>
						<View
							style={[
								{
									borderWidth: 0,
									borderRadius: 45,
									marginRight: 0,

									backgroundColor: ccolor
								}
							]}
						>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => {
									global.storyID = item.id;
									const { navigate } = Navigation;
									if (item.image != '') navigate('recyclerViewList1', { storyID: item.id });

									//Navigation.navigate('recyclerViewList1');
								}}
							>
								<Image
									style={[
										styles.imageavatar,

										{
											borderWidth: 2,
											borderColor: 'white',
											margin: 2
										}
									]}
									source={{ uri: getHttpAdress() + 'media/' + item.image }}
								/>
							</TouchableOpacity>
						</View>

						<Text
							numberOfLines={1}
							style={[
								{
									paddingTop: 4,
									paddingBottom: 3,
									width: 80,
									textAlign: 'center',
									fontFamily: 'iransans',
									fontSize: 12
								}
							]}
						>
							{item.name}
						</Text>
					</View>
				);
			}}
		/>
	</View>
);

const styles = StyleSheet.create({
	imageavatar: {
		width: 60,
		height: 60,
		borderRadius: 60,
		borderWidth: 0,
		borderColor: '#ccc'
	}
});
export default withNavigation(stories);
