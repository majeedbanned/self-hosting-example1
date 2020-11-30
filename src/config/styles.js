import { Platform } from 'react-native';

import colors from './colors';

export default {
	colors,
	inputc: {
		height: 52,
		borderBottomWidth: 0,
		backgroundColor: 'white',

		borderRadius: 45
	},
	err: {
		color: 'red',
		fontFamily: 'iransans',
		textAlign: 'right'
	},
	inputStyle: {
		height: 45,
		textAlign: 'center',
		fontFamily: 'iransans',
		color: colors.primary
	},
	labelStyle: {
		textAlign: 'left',
		color: colors.medium,
		fontSize: 14,
		marginStart: 10,

		fontFamily: 'iransansbold'
	},
	leftIconContainerStyle: {
		borderWidth: 1,
		borderRadius: 45,
		width: 40,
		height: 40,
		marginLeft: 6,
		//color: '#f6fbff',
		paddingLeft: 3,
		paddingTop: 3
		//color: colors.medium
	},
	text: {
		borderWidth: 0,
		width: '100%',
		textAlign: 'center',
		color: colors.dark,
		fontSize: 16,
		fontFamily: Platform.OS === 'android' ? 'iransans' : 'iransans'
	},
	shadow: {
		elevation: 2,
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		shadowOpacity: 0.6,
		shadowRadius: 3
	},
	shadowx: {
		elevation: 2,
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 4
		},
		shadowOpacity: 0.5,
		shadowRadius: 2
	},
	viewBtn: {
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: colors.primary,
		borderRadius: 45,
		alignItems: 'center',
		//flex: 1,
		marginLeft: 12,
		marginRight: 15,

		borderWidth: 1,
		height: 45,
		backgroundColor: colors.lightblue,
		borderColor: colors.lightblue
	},
	lblformcaption: {
		marginBottom: 15,
		textAlign: 'center',
		fontFamily: 'iransansbold',
		color: colors.primary,
		fontSize: 16
	},
	lbl18: {
		fontFamily: 'iransans',
		color: colors.primary,
		fontSize: 18
	},
	lbl16: {
		fontFamily: 'iransans',
		color: colors.primary,
		fontSize: 16
	},
	// lbl14: {
	// 	fontFamily: 'iransans',
	// 	color: colors.primary,
	// 	fontSize: 12
	// },
	lbl14: {
		fontFamily: 'iransans',
		color: '#a976fb',
		fontSize: 14
	}
};
