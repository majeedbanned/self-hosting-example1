import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
//import ImagePicker from 'react-native-image-picker';

const ImageOptions = {
	title: 'select image',
	storageOptions: { skipBackup: true, path: 'images' },
	maxWidth: 150,
	maxHeight: 150,
	chooseFromLibraryButtonTitle: 'Choose from gallery'
};
export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { progress: '' };
	}
	// ImageUpload() {
	// 	console.log('UPLOADImage====');
	// 	ImagePicker.showImagePicker(ImageOptions, (response) => {
	// 		console.log('Image Response = ', response);
	// 		if (response.didCancel) {
	// 			console.log('User cancelled image picker');
	// 		} else if (response.error) {
	// 			console.log('ImagePicker Error: ', response.error);
	// 		} else if (response.customButton) {
	// 			console.log('User tapped custom button: ', response.customButton);
	// 		} else {
	// 			const source = { filename: response.fileName, type: response.type, uri: response.fileSize };
	// 			const self = this;
	// 			const userId = '';
	// 			console.log('source', source);

	// 			let formData = new FormData();
	// 			formData.append('filename', source);

	// 			// console.log('UPLOADImage====111334')
	// 			this.setState({ spinnerBool: true }, () => {
	// 				axios({
	// 					method: 'POST',
	// 					url: 'http://localhoast:8090/api/UploadProfilePic',
	// 					data: formData,
	// 					headers: {
	// 						'Content-Type': 'multipart/form-data'
	// 					}
	// 				})
	// 					.then((response) => {
	// 						console.log('response', response);
	// 						if (response.status === 200) {
	// 							console.log('status 200', response);
	// 							alert('submitted', '');
	// 						}
	// 					})
	// 					.catch((error) => {
	// 						console.log('error res', response);
	// 						self.setState({ spinnerBool: false, MyProfileResp: '' }, () => {
	// 							alert('Error,Message Not submitted');
	// 							console.log('Error', error.response);
	// 						});
	// 					});
	// 			});
	// 		}
	// 	});
	// }

	ImageUpload(url) {
		console.log('start');
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://api.farsmahd.ir/api/upload');
		xhr.onload = () => {
			//const response = JSON.parse(xhr.response);
			console.log(xhr.response);
			// ... do something with the successful response
		};
		xhr.onerror = (e) => {
			console.log(e, 'upload failed');
		};
		// 4. catch for request timeout
		xhr.ontimeout = (e) => {
			console.log(e, 'upload timeout');
		};

		const formData = new FormData();

		formData.append('file', {
			uri: url, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
			type: `image/jpg`, // example: image/jpg
			name: `upload.jpg` // example: upload.jpg
		});
		// 6. upload the request
		xhr.send(formData);
		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				console.log(uploadProgress);
				this.setState({
					progress: uploadProgress
				});
			};
		}
	}

	render() {
		let openImagePickerAsync = async () => {
			let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

			if (permissionResult.granted === false) {
				alert('Permission to access camera roll is required!');
				return;
			}

			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				base64: true,
				allowsEditing: true,
				allowsMultipleSelection: true
			});
			this.ImageUpload(pickerResult.uri);
			// this.setState((prevState) => ({
			// 	formikDefault: {
			// 		...prevState.formikDefault,
			// 		soal1: pickerResult.uri,
			// 		soal1base64: pickerResult.base64
			// 	}
			// }));
			//	console.log(pickerResult.uri);
		};

		return (
			<View style={{ flex: 1 }}>
				<TouchableOpacity style={{ marginTop: 80 }} onPress={openImagePickerAsync}>
					<Text>UplodButton</Text>
				</TouchableOpacity>

				<AnimatedProgressWheel
					size={60}
					width={4}
					color={'blue'}
					progress={this.state.progress * 100}
					backgroundColor={'#ccc'}
				/>
			</View>
		);
	}
}
