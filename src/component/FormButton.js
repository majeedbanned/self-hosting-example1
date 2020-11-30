import React from 'react';
import { Button } from 'react-native-elements';

const FormButton = ({
	fontSizeb,
	heightb,
	borderColor,
	backgroundColor,
	title,
	buttonType,
	buttonColor,
	borderRadiusb,
	widthb,
	...rest
}) => (
	<Button
		{...rest}
		type={buttonType}
		title={title}
		buttonStyle={{
			width: widthb,
			height: heightb,
			alignSelf: 'flex-end',
			backgroundColor: backgroundColor,
			borderColor: borderColor,
			borderRadius: borderRadiusb
		}}
		titleStyle={{ fontFamily: 'iransans', fontSize: fontSizeb, color: buttonColor }}
	/>
);

export default FormButton;
