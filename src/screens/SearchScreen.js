import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button ,ScrollView} from 'react-native';
import yelp from '../api/yelp';
import useResult from '../hooks/useResult';

import SearchBar from './../component/SearchBar';
import ResultList from '../component/resultList';

const SearchScreen = () => {
	const [ term, setTerm ] = useState('');
	const [ searchApi, errorMassage, result ] = useResult();
	const filterResultByPrise = (price) => {
		return result.filter((result) => {
			return result.price === price;
		});
	};
	if(!result.length)
	{
		return <Text>Loading...</Text>
	}			
	
	return (
		<> 
			<Text />
			<SearchBar term={term} onTermSubmit={() => searchApi(term)} onTermChange={setTerm} />
			{errorMassage ? <Text >{errorMassage}</Text> : null}

			<Text style={styles.count} >we found {result.length} restaurant</Text>
			<ScrollView>
			<ResultList results={filterResultByPrise('$')} title="cost effective" />
			<ResultList  results={filterResultByPrise('$$')} title="best price" />
			<ResultList   results={filterResultByPrise('$$$')} title="best seller" />
			<ResultList   results={filterResultByPrise('$$$$')} title="best seller" />
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
count:{
	marginLeft:15
},
	background: {
		backgroundColor: '#f0eeee'
	},
	text: {
		fontSize: 30
	}
});

export default SearchScreen;
