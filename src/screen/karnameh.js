import React, { Component, useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
class karnameh extends Component {
	state = {};
	render() {
		return <WebView source={{ uri: 'https://expo.io' }} style={{ marginTop: 0 }} />;
	}
}
//import { from } from 'rxjs/observable/from';

export default karnameh;
