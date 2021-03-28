import React, { Component, useRef } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

class cwebview extends Component {
	state = { jsCode: '' };
	_onMessage = (event) => {
		console.log('_onMessage', JSON.parse(event.nativeEvent.data));
		const res = JSON.parse(event.nativeEvent.data);
		if (res.message === 'ok') {
			//	alert('button clicked');
		}
	};
	render() {
		//const jsCode = "window.postMessage(document.getElementById('submit__button').innerHTML)";
		let jsCode = `document.querySelector('.HeaderHero').style.backgroundColor = 'purple';
        document.querySelector('a.ActionButton').style.backgroundColor = 'green';
        document.querySelector('a.ActionButton').addEventListener("click", function() {  
        
    }); 
    true;`;
		jsCode = "window.ReactNativeWebView.postMessage(JSON.stringify({type: 'click', message : 'ok'}));";
		return (
			<View style={{ flex: 1 }}>
				<Button
					title="salam"
					onPress={() => {
						this.webview.injectJavaScript(
							'window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : aaa()}));'
						);
						//	alert();
						this.setState({
							jsCode:
								"window.ReactNativeWebView.postMessage(JSON.stringify({type: 'click', message : 'ok'}));"
						});
					}}
				/>
				<WebView
					// ref={(ref) => {
					// 	this.webview = ref;
					// }}
					ref={(view) => (this[`sectionItem${index}`] = view)}
					javaScriptEnabled={true}
					source={{ uri: 'http://192.168.1.15/editor.aspx' }}
					style={{ flex: 1, width: 400, height: 500 }}
					originWhitelist={[ '*' ]}
					javaScriptEnabledAndroid={true}
					injectedJavaScript={jsCode}
					originWhitelist={[ '*' ]}
					javaScriptEnabledAndroid={true}
					injectedJavaScript={this.state.jsCode}
					onMessage={this._onMessage}
				/>
			</View>

			// <WebView
			// 	ref={(ref) => {
			// 		this.webview = ref;
			// 	}}
			// 	source={{ uri: 'https://reactnative.dev' }}
			// 	originWhitelist={[ '*' ]}
			// 	javaScriptEnabledAndroid={true}
			// 	injectedJavaScript={jsCode}
			// 	onMessage={this._onMessage}
			// />
		);
	}
}

export default cwebview;
