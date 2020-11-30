import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, FlatList, TouchableOpacity, Text, RefreshControl } from 'react-native';
import ActionBarImage from '../components/ActionBarImage';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import defaultStyles from '../config/styles';
import Menu from '../screen/menu';
import GLOBAL from './global';

const birthday = ({ Items, caption, ...rest }) => (
	<View style={{ marginTop: 20, backgroundColor: 'white' }}>
		{Items.map((item, index) => (
			<View key={index}>
				<View
					style={{
						marginTop: 4,
						marginStart: 15,
						marginBottom: 10,
						borderRadius: 20,
						borderWidth: 0,
						backgroundColor: '#8BBEE8FF',
						alignSelf: 'flex-start',

						shadowColor: '#8BBEE8FF',
						shadowOffset: {
							width: 3,
							height: 3
						},
						shadowOpacity: 0.37,
						shadowRadius: 2.49,
						elevation: 3
					}}
				>
					<Text
						style={{
							alignSelf: 'flex-start',
							padding: 7,
							color: 'white',
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
					horizontal
					// keyExtractor={(item) => {
					// 	return item.id;
					// }}
					renderItem={({ item, index }) => {
						return (
							<View
								key={index}
								style={[
									defaultStyles.shadow,
									{
										justifyContent: 'center',
										alignItems: 'center',
										marginRight: 10,
										borderRadius: 15,
										backgroundColor: 'white'
									}
								]}
							>
								<View
									style={[
										{
											borderWidth: 0,
											marginRight: 5,
											borderRadius: 15,
											backgroundColor: 'white'
										}
									]}
								>
									<Image
										style={[
											styles.imageavatar,

											{
												margin: 5
											}
										]}
										source={{ uri: getHttpAdress() + 'child/' + item.studentcode + '.jpg' }}
									/>
								</View>

								<Text
									numberOfLines={1}
									style={[
										{
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
