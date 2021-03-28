import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, Text, RefreshControl } from 'react-native';
import ActionBarImage from '../components/ActionBarImage';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import defaultStyles from '../config/styles';
import Menu from '../screen/menu';
import GLOBAL from './global';

const birthday = ({ Items, caption, ...rest }) => (
	<View style={{ marginTop: 10, backgroundColor: 'white' }}>
		{Items.map((item, index) => (
			<View key={index}>
				<View
					style={{
						marginTop: 4,
						marginStart: 15,
						marginBottom: 0,
						borderRadius: 20,
						borderWidth: 0,
						//backgroundColor: '#8BBEE8FF',
						alignSelf: 'flex-start'

						// shadowColor: '#8BBEE8FF',
						// shadowOffset: {
						// 	width: 3,
						// 	height: 3
						// },
						// shadowOpacity: 0.37,
						// shadowRadius: 2.49,
						// elevation: 3
					}}
				>
					<Text
						style={{
							alignSelf: 'flex-start',
							padding: 7,
							color: '#1693A5',
							borderWidth: 0,
							fontFamily: 'iransans',
							textAlign: 'left',
							paddingLeft: 10
						}}
					>
						{item.caption}
					</Text>
				</View>
				<FlatList
					showsHorizontalScrollIndicator={false}
					persistentScrollbar={false}
					keyExtractor={(item) => item.studentcode.toString()}
					//keyExtractor={(item, index) => String(index)}
					data={item.list}
					style={{ marginLeft: 10 }}
					horizontal
					// keyExtractor={(item) => {
					// 	return item.id;
					// }}
					renderItem={({ item, index }) => {
						return (
							<View
								key={index}
								style={[
									defaultStyles.shadow1,
									{
										justifyContent: 'center',
										alignItems: 'center',
										marginLight: 10,
										borderRadius: 15,
										backgroundColor: 'white'
									}
								]}
							>
								<View
									style={[
										{
											borderWidth: 0.3,
											borderColor: '#ADD8C7',
											marginRight: 25,
											borderRadius: 15,
											backgroundColor: 'white'
										}
									]}
								>
									<Image
										style={[
											styles.imageavatar,

											{
												margin: 1
											}
										]}
										source={{ uri: getHttpAdress() + 'child/' + item.studentcode + '.jpg' }}
									/>
								</View>

								<Text
									numberOfLines={1}
									style={[
										{
											marginRight: 15,

											//borderWidth: 1,
											width: 80,
											textAlign: 'center',
											fontFamily: 'iransans',
											fontSize: 11,
											color: 'gray',
											paddingTop: 9
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
		))}
	</View>
);

const styles = StyleSheet.create({
	imageavatar: {
		width: 70,
		height: 86,
		borderRadius: 15,
		borderWidth: 0,
		borderColor: '#ccc'
	}
});
export default birthday;
