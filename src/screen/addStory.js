import React, { Component } from 'react';
import defaultStyles from '../config/styles';
import Dynamic from './dynamic';
import FormButton from '../component/FormButton';
import { View, Text, ScrollView } from 'react-native';
import GLOBAL from './global';

class addstory extends Component {
	state = { formstruct: [] };

	componentDidMount() {
	//	console.log('didmount');
		this.setState({
			formstruct: [
				{
					name: 'form name ',
					direction: 'rtl',
					fields: [
						{
							id: 'title',
							placeholder: 'نام را وارد کنید',
							caption: 'نام',
							type: 'textbox',
							keyboardType: 'numberic'
						},
						{
							id: 'name',
							placeholder: 'نام را وارد کنید',
							caption: 'نام',
							type: 'textbox',
							keyboardType: 'numberic'
						},
						{
							id: 'family',
							placeholder: 'فامیل را وارد کنید',
							caption: 'فامیل',
							type: 'textbox',
							keyboardType: 'numberic',
							multiline: true
						},
						{
							id: 'sex',
							placeholder: 'فامیل را وارد کنید',
							caption: 'جنسیت',
							type: 'combobox',
							keyboardType: 'numberic',
							options: [
								{ label: 'woman', value: '1' },
								{ label: 'man', value: '2' },
								{ label: 'undifined', value: '3' }
							]
						},
						// {
						// 	id: 'marrage',
						// 	placeholder: 'وضعیت ازدواج را وارد کنید',
						// 	caption: 'وضعیت تاهل',
						// 	type: 'radio',

						// 	options: [ 'woman', 'man', 'undifined' ]
						// },
						// {
						// 	id: 'aya',
						// 	placeholder: 'وضعیت ازدواج را وارد کنید',
						// 	caption: 'وضعیت تاهل',
						// 	type: 'checkbox'
						// },
						{
							mobileurl: 'image1',
							multipart: 'image1multipart',
							progress: 'image1pg',
							progressvisible: 'image1pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: ' عکس',
							type: 'image'
						}

						// {
						// 	mobileurl: 'image2',
						// 	multipart: 'image2multipart',
						// 	progress: 'image2pg',
						// 	progressvisible: 'image2pgvisible',
						// 	placeholder: 'وضعیت ازدواج را 2وارد کنید',
						// 	caption: ' 2عکس',
						// 	type: 'image'
						// },

						// {
						// 	mobileurl: 'file1',
						// 	multipart: 'file1multipart',
						// 	progress: 'file1pg',
						// 	progressvisible: 'file1pgvisible',
						// 	maxSize: 'file1maxSize',
						// 	maxSizeError: 'file1maxSizeError',
						// 	placeholder: 'وض',
						// 	caption: ' عکس',
						// 	type: 'file'
						// },

						// {
						// 	id: 'radio',
						// 	placeholder: 'رادیو را وارد کنید',
						// 	caption: 'رادیو لیست',
						// 	type: 'radiolist',

						// 	options: [
						// 		{ label: 'woman', value: '1' },
						// 		{ label: 'man', value: '2' },
						// 		{ label: 'undifined', value: '3' }
						// 	]
						// }
					]
				},
				{
					$schema: 'http://json-schema.org/draft-07/schema#',
					$id: 'http://example.com/person.schema.json',
					title: 'Person',
					description: 'A person',
					type: 'object',
					properties: {
						title: {
							description: 'Name of the person',
							type: 'string'
						}
						// family: {
						// 	description: 'family',
						// 	type: 'string'
						// },
						// sex: {
						// 	description: 'sex',
						// 	type: 'string'
						// },
						// marrage: {
						// 	description: 'sex',
						// 	type: 'string'
						// },
						// image1: {
						// 	description: 'image picker',
						// 	type: 'string'
						// },
						// image2: {
						// 	description: 'image picker',
						// 	type: 'string'
						// },
						// file1: {
						// 	description: 'file1 picker',
						// 	type: 'string'
						// },
						// radio: {
						// 	description: 'radio picker',
						// 	type: 'string'
						// },

						// email: {
						// 	type: 'string',
						// 	format: 'email'
						// },
						// fooorbar: {
						// 	type: 'string',
						// 	matches: '(foo|bar)'
						// },
						// age: {
						// 	description: 'Age of person',
						// 	type: 'number',
						// 	exclusiveMinimum: 0,
						// 	required: true
						// },
						// characterType: {
						// 	enum: [ 'good', 'bad' ],
						// 	enum_titles: [ 'Good', 'Bad' ],
						// 	type: 'string',
						// 	title: 'Type of people',
						// 	propertyOrder: 3
						// }
					},
					required: [ 'title' ]
				},
				{
					// for error messages...
					errMessages: {
						marrage: {
							required: 'marrage kon koni'
						},
						title: {
							required: 'A person must have an age'
						},
						family: {
							required: 'You must enter an email address',
							format: 'Not a valid email address'
						},
						image1: {
							required: 'select file'
						}
						// file1: {
						// 	required: 'select file'
						// }
					}
				}
			],

			formikDefault: {
				title: ''
				// family: 'wes',
				// sex: '2',
				// marrage: 2,

				// image1: 'x',
				// image1multipart: '',
				// image1pgvisible: false,
				// image1pg: 0,

				// radio: '',

				// image2: 'x',
				// image2multipart: '',
				// image2pgvisible: false,
				// image2pg: 0,

				// file1: '',
				// file1multipart: '',
				// file1pgvisible: false,
				// file1pg: 0,
				// file1maxSize: 20000,
				// file1maxSizeError: '',

				// matn: '',
				// group: '',
				// selectedClass: [],
				// img1: 'x',
				// img1base64: '',

				// img2: 'x',
				// img2base64: '',
				// img3: 'x',
				// img3base64: '',
				// img4: 'x',
				// img4base64: '',
				// //file1: 'x',
				// file1base64: '',
				// file2: 'x',
				// file2base64: ''
			},
			selectedParticipate: 'انتخاب گیرندگان',
			isSubmitting: false,
			retUser: [],
			messagegrp: [],
			isModalpikerVisible: false,
			img1pg: '',
			img1pgVisible: false,
			img2pg: '',
			img2pgVisible: false,
			img3pg: '',
			img3pgVisible: false,
			img4pg: '',
			img4pgVisible: false,

			file1pg: '',
			file1pgVisible: false,

			file2pg: '',
			file2pgVisible: false,

			fileSize: '',
			fileSizeErr: '',
			isEditing: false
		});
	}
	submitMyForm = null;
	handleSubmitMyForm = (e) => {
		if (this.submitMyForm) {
			//console.log(this);
			this.submitMyForm(e);
		}
		//console.log(JSON.stringify(GLOBAL.dynamic.state.formikDefault));
	};
	bindSubmitForm = (submitForm) => {
		this.submitMyForm = submitForm;
		//console.log(submitForm);
	};

	render() {
		if (this.state.formstruct.length == undefined || !this.state.formikDefault)
			return (
				<View>
					<Text>Loading</Text>
				</View>
			);
		//console.log(this.state.formstruct.length);
		//console.log(this.state.formikDefault);

		return (
			<View style={{ flex: 1, backgroundColor: '#f6fbff' }}>
				<ScrollView>
					<View style={{ alignContent: 'center' }}>
						<Dynamic
							bindSubmitForm={this.bindSubmitForm}
							formstruct={this.state.formstruct}
							formikDefault={this.state.formikDefault}
						/>
						<FormButton
							buttonColor="#1f9efd"
							borderColor="white"
							backgroundColor="#e3f1fc"
							buttonType="outline"
							//onPress={handleSubmit}
							onPress={this.handleSubmitMyForm}
							widthb={'100%'}
							heightb={55}
							borderRadiusb={45}
							style={{ margin: 6 }}
							containerStyle={[ defaultStyles.shadowx, { margin: 25, marginButtom: 30, marginTop: 20 } ]}
							//disabled={!isValid }
							loading={this.state.isSubmitting}
							title="ارسال پیام"
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default addstory;
