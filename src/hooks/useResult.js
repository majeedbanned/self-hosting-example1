import React, { useState, useEffect } from 'react';
import yelp from '../api/yelp';

export default () => {
	const [ result, setResult ] = useState([]);
	const [ errorMassage, setErrorMessage ] = useState('');


	const pApi = async (searchTerm) => {
		try {
			console.log('sd');
			let uurl="ath?p=50`123456`50`357611123qwe!@$"
		//+username+"`"+password+"`"+schoolcode+"`357611123qwe!@$";
			const resoponse = await yelp.get(uurl, {
				params: {
					limit: 40,
					term: searchTerm,
					location: 'san jose'
				}
			});
			setResult(resoponse.data.businesses);
		} catch (err) {
			setErrorMessage('some thing went wrong');
		}
	};

	const searchApi = async (searchTerm) => {
		try {
			const resoponse = await yelp.get('/search', {
				params: {
					limit: 40,
					term: searchTerm,
					location: 'san jose'
				}
			});
			setResult(resoponse.data.businesses);
		} catch (err) {
			setErrorMessage('some thing went wrong');
		}
	};
	//run one time
	useEffect(() => {
		//searchApi('pasta');
		pApi('dd');
    }, []);
    
    return [pApi,searchApi,errorMassage,result];
};
