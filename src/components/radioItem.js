import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Lightbox from 'react-native-lightbox';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import HTML from 'react-native-render-html';
import { TouchableOpacity } from 'react-native-gesture-handler';
const radioItem = ({ value, html, direction, axg, border, Speed, enabled, onimgclick }) => {
	return (
		<View>
			{html != '' && (
				<View
					style={[
						styles.gozine,
						{
							borderRadius: 15,

							borderWidth: border,
							borderColor: border == 1 ? 'white' : '#b6facd',
							backgroundColor: border == 1 ? '#ebfaf0' : 'white',
							padding: 5,
							flexDirection: direction == 'ltr' ? 'row-reverse' : 'row',
							alignItems: direction == 'rtl' ? 'flex-start' : 'flex-start'
						}
					]}
				>
					<View style={{ flexDirection: 'column', flex: 1 }}>
						<View style={{ flexDirection: direction == 'ltr' ? 'row-reverse' : 'row' }}>
							<View
								style={{
									marginEnd: 15,
									borderColor: '#1f9efd',
									borderWidth: Platform.OS === 'android' ? 0 : 2,
									borderRadius: 35,
									height: 35,
									width: 35
								}}
							>
								<RadioButton
									disabled={enabled == 'start' || enabled == 'test' ? false : true}
									value={value}
								/>
							</View>
							{/* <HTML html={html} /> */}
							{(direction == 'rtl' || direction == '') &&
							Speed != 'pdf' && (
								<HTML
									html={
										'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
										html +
										'</span>'
									}
								/>
							)}
							{(direction == 'rtl' || direction == '') &&
							Speed == 'pdf' && (
								<HTML
									html={
										'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
										'گزینه  ' +
										toFarsi(value) +
										'</span>'
									}
								/>
							)}

							{direction == 'ltr' &&
							Speed != 'pdf' && (
								<HTML
									html={
										'<span style="text-align:left;direction:ltr;font-family:iransans;font-size:15;line-height:35px" >' +
										html +
										'</span>'
									}
								/>
							)}

							{direction == 'ltr' &&
							Speed == 'pdf' && (
								<HTML
									html={
										'<span style="text-align:left;direction:ltr;font-family:iransansbold;font-size:15;line-height:35px" >' +
										value +
										'</span>'
									}
								/>
							)}
						</View>
						<View style={{ borderWidth: 0, flex: 1 }}>
							{axg != '' && (
								//<Lightbox useNativeDriver={true} underlayColor="white">
								<TouchableOpacity
									style={{
										borderRadius: 15,
										width: '100%',
										paddingBottom: 5,
										paddingTop: 5,
										borderWidth: 0,
										alignSelf: 'center'
									}}
									onPress={onimgclick}
								>
									<Image
										//borderRadius={15}
										//seNativeDriver="true"
										style={[
											styles.contain,
											{
												paddingTop: 5,
												flex: 1,
												//borderRadius: 15,
												borderWidth: 0,
												//borderColor: '#ccc',
												shadowOffset: {
													width: 1,
													height: 2
												},
												width: '100%',
												shadowOpacity: 0.57,
												shadowRadius: 2.49
												//	elevation: 3
											}
										]}
										resizeMode="contain"
										source={{ uri: getHttpAdress() + 'azmoon/' + axg + '' }}
									/>
								</TouchableOpacity>
								//</Lightbox>
							)}
						</View>
					</View>
				</View>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	contain: {
		flex: 1,
		width: '100%',
		height: 150
		//borderWidth: 1,
		//borderColor: 'red'
	},
	gozine: {
		borderWidth: 0,
		flexDirection: 'row',
		//alignItems: this.props.direction == 'rtl' ? 'flex-start' : 'flex-end',
		margin: 15
	}
});
export default radioItem;
