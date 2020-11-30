import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, I18nManager } from 'react-native';

import t from 'tcomb-form-native';

//import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../translations/en';
import fa from '../translations/fa';
var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.color = 'red';
stylesheet.textbox.normal.textAlign = 'center';
stylesheet.textbox.error.textAlign = 'center';
stylesheet.textbox.normal.height = 45;
stylesheet.textbox.error.height = 45;

stylesheet.controlLabel.normal.textAlign = 'left';
stylesheet.controlLabel.error.textAlign = 'left';
stylesheet.controlLabel.error.textAlign = 'left';
stylesheet.controlLabel.normal.textAlign = 'left';
stylesheet.helpBlock.normal.textAlign = 'left';

I18nManager.forceRTL(true);
i18n.forceRTL = true;
i18n.translations = {
	en,
	fa
};
// Set the locale once at the beginning of your app.
i18n.locale = 'fa';
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

const Form = t.form.Form;

const User = t.struct({
	username: t.String,
	password: t.String,
	schoolcode: t.String,
	url: t.String,
	
});

const formStyles = {
	...Form.stylesheet,
	formGroup: {
		normal: {
			marginBottom: 10
		}
	},
	controlLabel: {
		normal: {
			color: 'blue',
			fontSize: 18,
			marginBottom: 7,
			fontWeight: '600'
		},
		// the style applied when a validation error occours
		error: {
			color: 'red',
			fontSize: 18,
			marginBottom: 7,
			fontWeight: '600'
		}
	}
};

const options = {
	auto: 'placeholders',
	fields: {
		username: {
			placeholder: 'نام کاربری ',
			stylesheet: stylesheet,
			label: i18n.t('username'),
			error: i18n.t('usernameErr')
		},
		password: {
      label: i18n.t('password'),
      stylesheet: stylesheet,
      error: i18n.t('passwordErr')
		},
		terms: {
			label: 'Agree to Terms1s'
		}
	},
	stylesheet: formStyles
};
export default class App extends Component {
	handleSubmit = () => {
		const value = this._form.getValue();
		console.log('value: ', value);
	};

	render() {
		return (
			<View style={styles.container}>
				<Form ref={(c) => (this._form = c)} type={User} options={options} />
				<Button title="Sign Up!" onPress={this.handleSubmit} />
				<Text> {i18n.t('welcome')}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		//textAlign: 'right', writingDirection: 'rtl',
		marginTop: 0,
		flex: 1,
		flexDirection: 'column',
		//direction:'rtl',
		padding: 20,
		backgroundColor: '#ffffff'
	}
});
