import React, { Component } from 'react';
import{View,Text,StyleSheet,FlatList} from 'react-native';

const ListScreen =()=> {
  const friends=[{name:'majid'},
{name:'reza'},
{name:'mohamad'},
{name:'pooya'},
{name:'ayda'},
{name:'atila'}
]
    
        return ( <FlatList keyExtractor={(item)=>item.name} data={friends} renderItem={({item})=>{
        return <Text>{item.name}</Text>

        } }/> );
    
}
 
export default ListScreen;
