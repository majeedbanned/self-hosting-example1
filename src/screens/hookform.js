import React, { Component } from 'react';
import {  TextInput, Text, Button, Alert, View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { compose } from 'recompose';
import { handleTextInput, withPickerValues, Formik } from 'formik';
import FormInput from '../component/FormInput';
//import AppPickerInput from '../component/picker';

import FormButton from '../component/FormButton';
import { TextField, FilledTextField, OutlinedTextField } from '@softmedialab/react-native-material-textfield';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import ErrorMessage from '../component/ErrorMessage';
//import { TextField } from "react-native-material-textfield";
// const MyPicker = compose(
//     handleTextInput,
//     withPickerValues
//   )(TextField);

export default class Appaa extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSubmitting: false,
			selectedItems: [ 'a0s0a8ssbsd', '16hbajsabsd', 'nahs75a5sg' ]
		};
	}

	onSelectedItemsChange = (selectedItems) => {
		this.setState({ selectedItems });
		console.log(selectedItems);
	};
	render() {
		const { selectedItems } = this.state;
		const newitems = [
			{
				id: '92iijs7yta',
				name: 'Ondo'
			},
			{
				id: 'a0s0a8ssbsd',
				name: 'Ogun'
			},
			{
				id: '16hbajsabsd',
				name: 'Calabar'
			},
			{
				id: 'nahs75a5sg',
				name: 'Lagos'
			},
			{
				id: '667atsas',
				name: 'Maiduguri'
			},
			{
				id: 'hsyasajs',
				name: 'Anambra'
			},
			{
				id: 'djsjudksjd',
				name: 'Benue'
			},
			{
				id: 'sdhyaysdj',
				name: 'Kaduna'
			},
			{
				id: 'suudydjsjd',
				name: 'Abuja'
			}
		];
		const sports = [
			{
				label: 'Football',
				value: 'football'
			},
			{
				label: 'Baseball',
				value: 'baseball'
			},
			{
				label: 'Hockey',
				value: 'hockey'
			}
		];
		const gender = [ { label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' } ];
		const inputStyle = {
			borderWidth: 1,
			borderColor: '#bbb',
			padding: 12,
			direction: 'rtl',
			fontSize: 18,
			textAlign: 'center',
			borderRadius: 10,
			marginTop: 10
		};

		return (
			<Formik
				initialValues={{
					name: 's',
					email: 'dd',
					password: '',
					lastname: 'zcv',
					class: 'a',
					gender: '',
					sport: 'baseball',
					sport1: 'baseball',
					multi: this.state.selectedItems
				}}
				onSubmit={(values) => {
					this.setState({ isSubmitting: true });
					setTimeout(() => {
						this.setState({ isSubmitting: false });

						Alert.alert(JSON.stringify(values));
					}, 3000);
				}}
				validationSchema={yup.object().shape({
					name: yup.string().required('Please, provide your name!'),
					class: yup.string().required('Please, provide your class!'),

					lastname: yup.string().required('Please, provide your lastname!')
				})}
			>
				{({
					formikProps,
					values,
					handleChange,
					isSubmitting,
					errors,
					setFieldTouched,
					touched,
					isValid,
					handleSubmit
				}) => (
					<View style={styles.formContainer}>
						<MultiSelect
							hideTags={true}
							items={newitems}
							uniqueKey="id"
							ref={(component) => {
								this.multiSelect = component;
							}}
							onSelectedItemsChange={this.onSelectedItemsChange}
							selectedItems={selectedItems}
							selectText="Pick Items"
							searchInputPlaceholderText="Search Items..."
							onChangeInput={(text) => console.log(text)}
							//altFontFamily="ProximaNova-Light"
							tagRemoveIconColor="#CCC"
							tagBorderColor="#CCC"
							tagTextColor="#CCC"
							selectedItemTextColor="#CCC"
							selectedItemIconColor="#CCC"
							itemTextColor="#000"
							displayKey="name"
							searchInputStyle={{ color: '#CCC' }}
							submitButtonColor="#CCC"
							submitButtonText="Submit"
						/>

						<FormInput
							name="email"
							value={values.lastname}
							placeholder="Enter email"
							autoCapitalize="none"
							onChangeText={handleChange('lastname')}
							iconName="ios-mail"
							iconColor="#2C384A"
						/>
						<ErrorMessage errorValue={errors.lastname} />
						<OutlinedTextField
							value={values.class}
							label="تام کاربری"
							keyboardType="phone-pad"
							formatText={this.formatText}
							onChangeText={handleChange('class')}
							//onSubmitEditing={this.onSubmit}
							style={{ marginTop: 10 }}
							ref={this.fieldRef}
						/>
						<ErrorMessage errorValue={errors.class} />

						<TextInput
							value={values.name}
							style={inputStyle}
							onChangeText={handleChange('name')}
							onBlur={() => setFieldTouched('name')}
							placeholder="Name"
						/>
						<ErrorMessage errorValue={errors.name} />
						{/* {touched.name && errors.name &&
              <Text style={{alignSelf: 'flex', fontSize: 18, color: '#FF0D10' }}>{errors.name}</Text>
            }             */}

						<RNPickerSelect
							value={values.sport}
							//onChangeText={handleChange('sport')}

							onValueChange={handleChange('sport')}
							items={sports}
						/>

						{/* <Picker
							value={values.sport1}
							style={styles.picker}
							itemStyle={styles.pickerItem}
							selectedValue={values.sport1}
							onValueChange={handleChange('sport1')}
						>
							{sports.map((item) => <Picker.Item label={item.label} value={item.value} />)}

							{}
						</Picker> */}

						<Button
							color="#3740FE"
							title="Submit"
							disabled={!isValid || isSubmitting}
							onPress={handleSubmit}
						/>

						<FormButton
							buttonType="outline"
							onPress={handleSubmit}
							disabled={!isValid || isSubmitting}
							loading={this.state.isSubmitting}
							title="LOGIN"
							buttonColor="#039BE5"
						/>
					</View>
				)}
			</Formik>
		);
	}
}

const styles = StyleSheet.create({
	formContainer: {
		padding: 50
	}
});

//console.disableYellowBox = true;
